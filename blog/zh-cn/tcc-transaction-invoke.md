---
key1: 调用流程
---

# TCC-TRANSACTION调用流程
本文意说明tcc-transaction在微服务调用过程中的执行过程，方便开发者对源码的阅读和分析使用过程遇到的问题。

假设A,B,C三个微服务对应。A服务发起tcc调用，B、C服务提供分支事务接口。调用流程图如下:  
![整体调用流程](/img/tcc/tcc-invoke-all.jpg)  

源码调试时，可以使用[tcc-transaction-http-sample示例](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-http-sample)  
> tcc-transaction-http-order(订单服务)，看作A服务    
> tcc-transaction-http-capital(资金服务)，看作B服务   
> tcc-transaction-http-redpacket(红包服务)，看作C服务  

  

**相关名词说明**  
- 事务拦截器，即[CompensableTransactionInterceptor](/zh-cn/docs/tutorial/api.html#compensabletransactioninterceptor)  
- 资源协调拦截器，即[ResourceCoordinatorInterceptor](/zh-cn/docs/tutorial/api.html#resourcecoordinatorinterceptor)     
- 事务管理器，即TransactionManager    


下面对try-confirm-cancel各个阶段进行详细分析。  
tcc调用方法是以@Compensable来标识的，spring bean方式调用时，会被**事件拦截器**和**资源协调拦截器**拦截。  
**事件拦截器**会控制整个try-confirm-cancel流程，以下对这三个流程进行详细说明。 
## try流程  
![try流程](/img/tcc/tcc-invoke-try.jpg)    
**注意:** 为避免画图的复杂性，相比于confirm和cancel流程图，try流程中省略了**事务管理器**。  
### 在A服务中try阶段 
源码可查看：  
CompensableTransactionInterceptor.rootMethodProceed方法(控制主事务流程)  
ResourceCoordinatorInterceptor.interceptTransactionContextMethod方法(添加参与方)  
#### A1 开启主事务。  
事件上下文为空，走主事务流程，开启主事务，即创建主事件和缓存主事件。    
#### A2 创建参与方A。  
详见[事件参与方](/zh-cn/docs/tutorial/api.html#participant)  

#### A3 保存事件A及参与方A(持久化)。  
**注意**:参与方A是作为事件A的组成部分存储的，因此一次存储操作即可
#### A4 执行本地try方法   
本地try方法，里面可能包含其他逻辑，这里只关注分支事务的远程调用。  
##### A4.1 调用B服务try方法  

- A4.1.1 添加参与方B     
- A4.1.2 保存参与方B(持久化)      
- A4.1.3 RPC调用B服务+事件上下文状态：TRYING，执行[服务B上分支事务try阶段](#在b服务中try阶段)    

> 这里涉及到事件上下文，在微服务中传递，传递方式与具体微服务类型有关，感兴趣可[查看](/zh-cn/docs/tutorial/rpc/index.html)  

- A4.1.4 更新参与方状态为TRY_SUCCESS   

调用一个B服务的rpc-clientB的try方法，此方法被@EnableTcc修饰，从而被**资源协调拦截器**拦截。  
如**CapitalFeignClient**中写法
```java
@FeignClient(name = "capital", url = "http://localhost:8082/tcc-transaction-http-capital/")
public interface CapitalFeignClient {
    @EnableTcc
    @RequestMapping(value = "/tradeOrder/record", method = RequestMethod.POST)
    @ResponseBody
    String record(@RequestBody CapitalTradeOrderDto tradeOrderDto);
}

```
 
##### A4.2 调用C服务try方法

- A4.2.1 添加参与方C    
- A4.2.2 保存参与方C(持久化)    
- A4.2.3 RPC调用C服务+事件上下文状态：TRYING，执行[服务C上分支事务try阶段](#在c服务中try阶段)     
- A4.2.4 更新参与方状态为TRY_SUCCESS  

调用一个C服务的rpc-clientC的try方法，此方法被@EnableTcc修饰，从而被**资源协调拦截器**拦截。  
如**RedPacketFeignClient**中写法
```java
@FeignClient(name = "redPacket", url = "http://localhost:8083/tcc-transaction-http-redpacket/")
public interface RedPacketFeignClient {
    @EnableTcc
    @RequestMapping(value = "/tradeOrder/record", method = RequestMethod.POST)
    @ResponseBody
    String record(@RequestBody RedPacketTradeOrderDto tradeOrderDto);
}

```

#### A5 更新参与方A状态为TRY_SUCCESS  


#### A6 执行confirm/cancel流程。
- try正常，则执行[confirm流程](#confirm流程)  
- try异常，则执行[cancel流程](#cancel流程)


### 在B服务中try阶段 
源码可查看：  
CompensableTransactionInterceptor.providerMethodProceed(try逻辑)  
ResourceCoordinatorInterceptor.interceptTransactionContextMethod方法(添加参与方)  
### B1 开启分支事务  
事件上下文非空，走分支事务流程，开启分支主事务，即构建分支事件。 
### B2 添加参与方B
### B3 保存化事件B和参与方B(持久化)
**注意**:参与方B是作为事件B的组成部分存储的，因此一次存储操作即可
### B4 执行本地try方法
### B5 更新参与方状态为TRY_SUCCESS
### B6 更新事件状态为TRY_SUCCESS
### B7 更新事件B(持久化)

### 在C服务中try阶段
源码可查看：  
CompensableTransactionInterceptor.providerMethodProceed(try逻辑)  
ResourceCoordinatorInterceptor.interceptTransactionContextMethod方法(添加参与方)  
### C1 开启分支事务  
事件上下文非空，走分支事务流程，开启分支主事务，即构建分支事件。 
### C2 添加参与方C
### C3 保存化事件C和参与方C(持久化)
**注意**:参与方C是作为事件B的组成部分存储的，因此一次存储操作即可
### C4 执行本地try方法
### C5 更新参与方状态为TRY_SUCCESS
### C6 更新事件状态为TRY_SUCCESS
### C7 更新事件C(持久化)   


## confirm流程
![confirm流程](/img/tcc/tcc-invoke-confirm.jpg)
主事务中，try流程正常时，会进入confirm流程。

### 在A服务中confirm阶段 
详见源码: TransactionManager.commit方法。  
#### A1 设置事件A状态为CONFIRMING
#### A2 更新事件A(持久化) 
#### A3 执行事件A commit
按顺序对所有非**CONFIRM_SUCCESS状态**的参与方，执行commit操作，异常则中断流程。  
##### A3.1 执行参与方A commit
通过java反射方式，调用本地confirm方法。
##### A3.2 执行参与方B commit
通过java反射方式，调用远程服务B(rpc-clientB)的try方法，RPC调用时会隐式传递事件上下文(状态：CONFIRMING)，请求到服务B会执行对应的commit逻辑。  
##### A3.3 执行参与方C commit  
通过java反射方式，调用远程服务B(rpc-clientC)的try方法，RPC调用时会隐式传递事件上下文(状态：CONFIRMING)，请求到服务C会执行对应的commit逻辑。  
#### A4 删除事件A(持久化)
删除事件A(包含其下所有参与方[A、B、C])，服务A的主事务的confirm阶段完成！  

### 在B服务中confirm阶段 
识别事件上下文中状态为CONFIRMING, 执行confirm操作。  
详见源码: CompensableTransactionInterceptor.providerMethodProceed方法(confirm逻辑)。  

#### B1 设置事件B状态为CONFIRMING
#### B2 更新事件B(持久化)
#### B3 执行事件B commit
##### B3.1 执行参与方B commit
#### B4 删除事件B(持久化)
删除事件B(包含其下所有参与方[B])，服务B的分支事务的confirm阶段完成！  

### 在C服务中confirm阶段 
识别事件上下文中状态为CONFIRMING, 执行confirm操作。  
详见源码: CompensableTransactionInterceptor.providerMethodProceed方法(confirm逻辑)。  

#### C1 设置事件C状态为CONFIRMING
#### C2 更新事件C(持久化)
#### C3 执行事件C commit
##### C3.1 执行参与方C commit
#### C4 删除事件C(持久化)
删除事件C(包含其下所有参与方[C])，服务C的分支事务的confirm阶段完成！  

## cancel流程 
![cancel流程](/img/tcc/tcc-invoke-cancel.jpg)
主事务中，try流程异常时，会进入cancel流程。
### 在A服务中cancel阶段
详见源码: CompensableTransactionInterceptor.rootMethodProceed方法(cancel逻辑)。  
#### A1 设置事件A状态为CANCELLING
#### A2 更新事件A(持久化)
#### A3 执行事A rollback
按顺序对所有非**CANCEL_SUCCESS状态**的参与方，执行rollback操作，异常则中断流程。  
##### A3.1 执行参与A rollback  
通过java反射方式，调用本地cancel方法。
##### A3.2 执行参与方B rollback  
通过java反射方式，调用远程服务B(rpc-clientB)的try方法，RPC调用时会隐式传递事件上下文(状态：CANCELLING)，请求到服务B会执行对应的rollback逻辑。  
##### A3.3 执行参与方C rollback  
通过java反射方式，调用远程服务B(rpc-clientC)的try方法，RPC调用时会隐式传递事件上下文(状态：CANCELLING)，请求到服务C会执行对应的rollback逻辑。  
#### A4 删除事件A(持久化)
删除事件A(包含其下所有参与方[A、B、C])，服务A主事务的cancel阶段完成！  

### 在B服务中cancel阶段
识别事件上下文中状态为CANCELLING, 执行cancel操作。  
详见源码: CompensableTransactionInterceptor.providerMethodProceed方法(cancel逻辑)。  
#### B1 设置事件B状态为CANCELLING
#### B2 更新事件B(持久化)
#### B3 执行事B rollback
##### B3.1 执行参与方B rollback
通过java反射方式，调用本地cancel方法。
#### B4 删除事件B(持久化)  
删除事件B(包含其下所有参与方[B])，服务B分支事务的cancel阶段完成！  

### 在C服务中cancel阶段
识别事件上下文中状态为CANCELLING, 执行cancel操作。  
详见源码: CompensableTransactionInterceptor.providerMethodProceed方法(cancel逻辑)。  
#### C1 设置事件C状态为CANCELLING
#### C2 更新事件C(持久化)
#### C3 执行事件C rollback
##### C3.1 执行参与方C rollback
通过java反射方式，调用本地cancel方法。
#### B4 删除事件C(持久化)  
删除事件C(包含其下所有参与方[C])，服务C分支事务的cancel阶段完成！ 

## 总结
待完善  
