# 自定义注册中心
此种方式，为方便开发者按实际需求来开发使用其他注册中心，比如Consul、Eureka等

## 如何自定义注册中心
这里利用了java的spi机制。  
  
### 步骤1、实现RegistryProvider
对应实现类上添加注解，比如@LoadInfo(name = "xxxx")  
实现逻辑可参考**NacosRegistryServiceProvider**  
```java
package com.xxxx;
public class XxxxRegistryProvider implements RegistryProvider{
}
```
### 步骤2、创建RegistryProvider文件
在项目classpath根目录下创建文件夹META-INF/services，  
新建文件org.mengyun.tcctransaction.discovery.registry.RegistryProvider,  
并在文件内添加实现类的全路径，即com.xxxx.XxxxRegistryProvider。    

### 步骤3、配置实现
让自定义的xxxx注册中心，添加如下配置即可生效。   
```properties
spring.tcc.registry.registryType=custom	
spring.tcc.registry.customRegistryName=xxxx
```
