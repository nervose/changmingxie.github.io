# redis-cluster存储类型

适用于服务单机、集群部署的场景。  
  
此种存储类型，采用redis-cluster，支持海量数据+高并发+高可用的场景。 
  
详见实现**JedisClusterTransactionStorage**

## 如何使用  
### 搭建redis-cluster
redis集群搭建可[参考](http://www.redis.cn/topics/cluster-tutorial.html)  
  
### 添加配置
可如下配置，查看[更多redis-cluster配置](/zh-cn/aggdocs/tutorial/configurations.html#redisclusterstoreproperties)
```yaml
spring:
  agg:
    storage:
      storage-type: redis_cluster
      redis-cluster:
        max-attempts: 5
        so-timeout: 1000
        connection-timeout: 1000
        nodes:
          - host: 127.0.0.1
            port: 6379
          - host: 127.0.0.1
            port: 6380
          - host: 127.0.0.1
            port: 6381
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


