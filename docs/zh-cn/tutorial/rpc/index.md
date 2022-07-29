# RPC框架支持说明
  
**注意**：如何没有用到分支事务，则可以跳过此部分内容。    
   
在微服务中分支事务场景，需要解决几个主要问题：  
- 1、事件上下文传递问题，即consumer端如何发送和provider端如何接收。  
- 2、分支事务的confirm和cancel如何被调用。  
  
其中问题2，tcc-transaction已实现通用逻辑，即根据上下文状态来执行相应逻辑。最后即为解决不同RPC框架事件上下文传递的问题。  
  
于我们对不同微服务框架，做了支持。 
另外，相比于1.x，2.x版本支持了对事务上下文的**隐式传递**。  

当前支持的RPC框架有：  
- [dubbo](/zh-cn/docs/tutorial/rpc/dubbo.html)  
- [openfeign](zh-cn/docs/tutorial/rpc/openfeign.html)  
- [grpc](/zh-cn/docs/tutorial/rpc/grpc.html)  
- [扩展支持](/zh-cn/docs/tutorial/rpc/support-other-rpc.html)  
