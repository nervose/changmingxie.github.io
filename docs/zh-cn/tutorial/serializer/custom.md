# 自定义序列化
开发可以自定义按需求开发自己的事件序列化方式  
需要实现接口**TransactionSerializer**，具体可参考**JacksonTransactionSerializer**  
## Jackson序列化 
**注意**：jackson序列化方式存在循环引用问题，开发者可以通过在入参实体中添加一下相关注解来避免。  
使用如下配置:  
```properties
spring.tcc.storage.serializer-type=customized
spring.tcc.storage.transaction-serializer-class-name=org.mengyun.tcctransaction.serializer.json.JacksonTransactionSerializer
```
