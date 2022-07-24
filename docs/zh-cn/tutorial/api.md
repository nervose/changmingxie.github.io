# API支持

## 核心类
### CompensableTransactionInterceptor
对注解@Compensable进行拦截，实现对主事务、分支事务的try-confirm-cancel流程。  
### ResourceCoordinatorInterceptor
对注解@Compensable或者@EnableTcc进行拦截，实现事件及参与方存储。
### TransactionContext
事件上下文

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
此注解作用于方法参数上，参数一般为订单号，可保证同一个订单并发请求是只产生一个事件。
