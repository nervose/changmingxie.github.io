# 自定义序列化
开发可以自定义按需求开发自己的事件序列化方式  
需要实现接口**TransactionSerializer**，具体可参考**JacksonTransactionSerializer**  
## Jackson序列化
```properties
spring.tcc.storage.serializer-type=customized
spring.tcc.storage.transaction-serializer-class-name=org.mengyun.tcctransaction.serializer.json.JacksonTransactionSerializer
```
