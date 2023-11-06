# redis存储类型
适用于服务单机、集群部署的场景。  
  
此种存储类型，支持单redis配置，redis通过主从或者哨兵模式，来保证高可用。 
  
详见实现**RedisTransactionStorage**

## 如何使用  

### 添加配置
可如下配置，查看[更多redis配置](/zh-cn/aggdocs/tutorial/configurations.html#redisstoreproperties)
```properties
spring.agg.storage.storageType=redis
spring.agg.storage.redis.host=127.0.0.1
spring.agg.storage.redis.port=6379
spring.agg.storage.redis.database=0
```

### maven依赖
默认已集成了jedis包，开发者可按需调整。  
```xml
 <!--aggregate-framework中测试使用版本为3.1.0-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>${jedis.version}</version>
</dependency>
```


