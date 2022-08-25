---
key1: server架构
---

# TCC-TRANSACTION之server模式架构分析
如[TCC-TRANSACTION调用流程](/zh-cn/blog/tcc-transaction-invoke.html)，我们了解了微服务调用中分布式事务是如何执行的。  
本文意在说明server模式的设计初衷、实现原理。 
server模式的设计目标为，进一步降低对业务服务的侵入，同时简化1.x中的繁琐配置。归结到底主要是两大块，即**事务存储**和**事务补偿**。  
下图简单对比了1.x和2.x的业务服务的变化。  
![1x和2.x对比图](/img/tcc/1x_2x_compare.jpg)
从上图可以看出，2.x将1.x中的**事务存储**和**事务补偿**，挪到了**tcc-server**里面，原有的**本地事务存储**，改成了**远程事务存储**的方式。

- 远程事务存储，对应实现类**RemotingTransactionStorage**
- tcc-server，对应服务源码[tcc-transaction-server](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-server)


后续待完善。。。



