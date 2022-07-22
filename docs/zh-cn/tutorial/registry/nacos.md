# nacos注册中心
此种注册方式，采用nacos为注册中心，获取server地址列表，**注意**相应的server部署也要使用nacos为注册中心并上报server地址。      
相关配置可如下，查看[更多nacos配置](/zh-cn/docs/tutorial/configurations.html#nacosregistryproperties)  
```properties
spring.tcc.registry.registryType=nacos	
spring.tcc.registry.nacos.serverAddr=127.0.0.1:8848	
spring.tcc.registry.nacos.username=nacos	
spring.tcc.registry.nacos.password=nacos	
```


## maven依赖
需要引入相关依赖
```xml
 <!--tcc-transaction中测试使用版本为1.4.1-->
<dependency>
    <groupId>com.alibaba.nacos</groupId>
    <artifactId>nacos-client</artifactId>
   
    <version>${nacos-client.version}</version>
</dependency>
```
