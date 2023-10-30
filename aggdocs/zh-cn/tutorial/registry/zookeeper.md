# zookeeper注册中心

此种注册方式，采用zookeeper为注册中心，获取server地址列表，**注意**相应的server部署也要使用zookeeper为注册中心并上报server地址。      
相关配置可如下，查看[更多zookeeper配置](/zh-cn/aggdocs/tutorial/configurations.html#zookeeperregistryproperties)  
```properties
spring.agg.registry.registryType=zookeeper
spring.agg.registry.zookeeper.connectString=127.0.0.1:2181

```


## maven依赖
需要引入相关依赖
```xml
<!--aggregate-framework中测试使用版本为2.11.1-->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-framework</artifactId>
    <version>${curator.version}</version>
</dependency>
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>${curator.version}</version>
</dependency>
```
