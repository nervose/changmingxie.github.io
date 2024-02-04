# 常见问题

- [Q1.如何避免tcc try阶段业务并发重复调用](#1)    
- [Q2.是否支持防悬挂控制](#2)  


<h4 id="1">Q1.如何避免tcc try阶段业务并发重复调用</h4>  

可以在 tcc事务发起者方法（try方法）添加一个业务主建，并使用@uniqueidentity 标示，  
如示例项目tcc-transaction-dubbo-order的PaymentServiceImpl.makePayment方法（如下）：  
public void makePayment(@uniqueidentity String orderNo) ；  
tcc框架将使用@uniqueidentity 注解标示的参数作为tcc的主事务xid，如果tcc事务发起者方法同时执行多次，其tcc的主事务xid都是一样的，  
这样仅有一个请求的tcc事务保存成功，其他的调用则失败。  
[详见issues](https://github.com/changmingxie/tcc-transaction/issues/327)

<h4 id="2">Q2.是否支持防悬挂控制</h4>  

悬挂的意思是：在分支事务执行情况下，Cancel 比 Try 接口先执行，出现的原因是 Try 由于网络拥堵而超时，事务管理器生成回滚，触发 Cancel 接口，而最终又收到了 Try 接口调用，但是 Cancel 比 Try 先到。
框架是允许空回滚的逻辑，如果分支事务没有（有可能try还没有开始执行，或者事务已经回滚过，事务删除了）回滚会返回成功，事务管理器认为事务已回滚成功，整个事务回滚结束。而如果try方法最终到达，
开始执行，分支事务创建，由于主事务已经回滚结束了，该分支事务不会因主事务回滚而被触发回滚了。这种情况下，定时恢复任务会扫描该分支事务，检查其主事务的状态，发现没有主事务，则回滚该分支事务。  
[详见issues](https://github.com/changmingxie/tcc-transaction/issues/328)





