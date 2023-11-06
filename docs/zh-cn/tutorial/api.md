# API支持

## 核心类
### ConfigurableTransactionAspect
分布式事务切面，用于对方法注解@Compensable的拦截，具体拦截逻辑见**CompensableTransactionInterceptor**  

### ConfigurableCoordinatorAspect
事务协调切面，用于对方法注解@Compensable和@EnableTcc的拦截，具体拦截逻辑见**ResourceCoordinatorInterceptor**  
**注意**：当遇到@Compensable时，切面执行顺序为ConfigurableTransactionAspect>ConfigurableCoordinatorAspect  

### CompensableTransactionInterceptor
对注解@Compensable进行拦截，实现对主事务、分支事务的try-confirm-cancel流程。  

### ResourceCoordinatorInterceptor
对注解@Compensable或者@EnableTcc进行拦截，实现事件及参与方存储。  

### TransactionContext
事件上下文，分支事务场景用到。    
```java
public class TransactionContext implements Serializable {
    private static final long serialVersionUID = -8199390103169700387L;
    // 取自上一级事件参与方的事务ID，作为当前分支事件ID
    private Xid xid;
    // 主事件ID
    private Xid rootXid;
    // 主事件Domain
    private String rootDomain;
    // 事件状态
    private TransactionStatus status = TransactionStatus.TRYING;
    // 参与方状态
    private ParticipantStatus participantStatus = ParticipantStatus.TRYING;
    // 扩展字段
    private Map<String, String> attachments = new ConcurrentHashMap<String, String>();

}

```

### Transaction
事件，每个事务都会产生一个事件。  
```java
public class Transaction implements Serializable {
    // 参与方列表
    private List<Participant> participants = new ArrayList<Participant>();
    // 预留字段
    private Map<String, Object> attachments = new ConcurrentHashMap<String, Object>();
    // 事件ID
    private Xid xid;
    // 主事件ID，当前事件为主事件时，xid = rootId
    private Xid rootXid;
    // 主domain
    private String rootDomain;
    // 事件类型，主事件-ROOT(1)，分支事件-BRANCH(2)
    private TransactionType transactionType;
    // 事件状态，TRYING(1), CONFIRMING(2), CANCELLING(3), TRY_SUCCESS(11), TRY_FAILED(12);
    private TransactionStatus status;
    // 事件创建时间
    private Date createTime = new Date();
    // 事件更新时间
    private Date lastUpdateTime = new Date();
    // 事件重试次数，记录事件补偿的次数
    private volatile int retriedCount = 0;
    // 版本号
    private long version = 0L;
    
    // 添加参与方
    public void enlistParticipant(Participant participant) {
        participants.add(participant);
    }
    // 执行事件commit操作
    public void commit() {
        for (Participant participant : participants) {
            if (!participant.getStatus().equals(ParticipantStatus.CONFIRM_SUCCESS)) {
                participant.commit();
                participant.setStatus(ParticipantStatus.CONFIRM_SUCCESS);
            }
        }
    }

    // 执行事件rollback操作
    public void rollback() {
        for (Participant participant : participants) {
            if (!participant.getStatus().equals(ParticipantStatus.CANCEL_SUCCESS)) {
                participant.rollback();
                participant.setStatus(ParticipantStatus.CANCEL_SUCCESS);
            }
        }
    }

}

```
### Participant
参与方，一个事件有多个参与方。  

```java
public class Participant implements Serializable {
    private static final long serialVersionUID = 4127729421281425247L;
    // 主事件ID
    private Xid rootXid; 
    // 主事件Domain
    private String rootDomain; 
    // 参与方事件ID，分支事务时，作为目标分支事务的事件ID
    private Xid xid; 
    // 方法调用上下文，执行confirm或cancel时用到
    private InvocationContext invocationContext; 
    // TRYING(1), CONFIRMING(2), CANCELLING(3), TRY_SUCCESS(11), TRY_FAILED(12), CONFIRM_SUCCESS(21), CANCEL_SUCCESS(31);
    private ParticipantStatus status = ParticipantStatus.TRYING; 

    // rollback操作，执行参与方cancel流程
    public void rollback() {
        Terminator.invoke(new TransactionContext(rootDomain, rootXid, xid, TransactionStatus.CANCELLING, status), new Invocation(invocationContext.getCancelMethodName(), invocationContext), transactionContextEditorClass);
    }
    // commit操作，执行参与方confirm流程
    public void commit() {
        Terminator.invoke(new TransactionContext(rootDomain, rootXid, xid, TransactionStatus.CONFIRMING, status), new Invocation(invocationContext.getConfirmMethodName(), invocationContext), transactionContextEditorClass);
    }

}

```

```java
// 执行confirm或cancel时反射调用时用到
public class InvocationContext implements Serializable {
    private static final long serialVersionUID = -7969140711432461165L;
    private Class targetClass;          // 事务调用的目标类
    private String confirmMethodName;   // confirm方法名
    private String cancelMethodName;    // cancel方法名
    private Class[] parameterTypes;     // 参数类型列表
    private Object[] args;              // 参数列表
}
```

## 核心注解

### @Compensable
此注解放在try方法上，用于定义tcc的执行逻辑，即try-confirm-cancel三阶段的实现，**特别注意**：confirm和cancel方法参数要与try保持一致  
**属性说明**
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|propagation| 传播方式，预留字段，暂时没用到 |String | | |
|confirmMethod| confirm方法名 |String|  | |
|cancelMethod| cancel方法名 |String|  | |
|asyncConfirm| 异步confirm|boolean | | 默认为false |
|asyncCancel| 异步cancel|boolean | | 默认为false |

### @EnableTcc
此注解用于声明tcc接口，用于远程调用时传递事件上下文(TransactionContext)

### @UniqueIdentity
此注解作用于方法参数上，参数一般为订单号，可保证同一个订单并发请求是只产生一个事件，第二个请求时会报异常。    
使用可参考如下：    
```java
    @Compensable(confirmMethod = "confirmMakePayment", cancelMethod = "cancelMakePayment", asyncConfirm = false)
    public void makePayment(@UniqueIdentity String orderNo) {
        System.out.println("order try make payment called.time seq:" + DateFormatUtils.format(Calendar.getInstance(), "yyyy-MM-dd HH:mm:ss"));

        Order order = orderRepository.findByMerchantOrderNo(orderNo);

        String result = capitalTradeOrderService.record(buildCapitalTradeOrderDto(order));
        String result2 = redPacketTradeOrderService.record(buildRedPacketTradeOrderDto(order));
    }
```
