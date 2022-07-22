# rocksdb存储类型
适用于服务单机部署的场景。    
  
此种存储类型，事件被存储在本地一个目录下，应用服务切换机器可能产生事件丢失，且应用服务如果是集群的话，事件间事件是不可见的。   
   
详见实现**RocksDbTransactionStorage**

## 如何使用
### 添加配置
```properties
spring.tcc.storage.storageType=ROCKSDB
spring.tcc.storage.location=/tmp
```
### maven依赖

```xml
 <!--tcc-transaction中测试使用版本为6.4.6-->
<dependency>
    <groupId>org.rocksdb</groupId>
    <artifactId>rocksdbjni</artifactId>
    <version>${rocksdb.version}</version>
</dependency>
```

