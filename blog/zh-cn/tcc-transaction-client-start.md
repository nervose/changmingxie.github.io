---
key1: 启动流程
---

# TCC-TRANSACTION客户端启动流程
本文意说明tcc-transaction embedded模式，在微服务调用过程中的执行过程，方便开发者对源码的阅读和分析使用过程遇到的问题。
这里以示例工程:[tcc-transaction-http-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-http-sample) 为例来展开说明
**涉及服务**
> tcc-transaction-http-capital(资金服务)  
> tcc-transaction-http-redpacket(红包服务)  
> tcc-transaction-http-order(订单服务) 


