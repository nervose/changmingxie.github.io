---
key1: tcc-trasaction-2.x版本
---

# tcc-trasaction-2.x版本
tcc-trasaction-2.x相对于之前版本，功能更加丰富，扩展性更好。  

## 新增功能
- 支持[server模式](/zh-cn/docs/tutorial/connectionmode/server.html)，推荐使用   
- [dashboard](/zh-cn/docs/ops/dashboard/dashboard-guild.html)改版，支持登录、domain管理、事件管理、任务管理等  
- [RPC框架](/zh-cn/docs/tutorial/rpc/index.html)新增支持了openfeign、grpc，并支持了隐式传递事件上下文  
- 支持[@UniqueIdentity](/zh-cn/docs/tutorial/api.html#%40uniqueidentity)  
- [事件序列化](/zh-cn/docs/tutorial/serializer/index.html)新增支持fastjson、custom方式  
- [存储类型](/zh-cn/docs/tutorial/storagetype/remoting.html)新增支持remoting、memory、custom方式  
- [官网](https://changmingxie.github.io/)建设  
## 技术优化  
### 事件体积优化  
整体来说事件存储体积较之前至少减少了一半。
- 原有Transaction->Participant中confirmInvocationContext和cancelInvocationContext，本次重复信息进行了合并，业务参数优化了近一半体积。   
- 原有存储时会多存一个CONTENT_VIEW字段(事件的json格式)，为了方便dashboard后台查看事件详情用，本次去除了此字段。   

### redis存储模式下domain包含关系时隔离未生效问题    
比如两个domain，TCC:TRADE和TCC:TRADE-ORDER，使用redis存储补偿任务执行时，domain为TCC:TRADE的服务能查出TCC:TRADE-ORDER的数据。  


## 版本更新
### 2.0.0  
已经内测，正式发布，[快速开始](/zh-cn/docs/tutorial/quickstart.html)   

[查看最新Release版本](https://github.com/changmingxie/tcc-transaction/releases)
 
