# server模式演示
### http-sample演示(server模式)
示例工程:[tcc-transaction-http-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-http-sample) 
> tcc-transaction-http-capital(资金服务)  
> tcc-transaction-http-redpacket(红包服务)  
> tcc-transaction-http-order(订单服务)  

以下为openfeign远程调用方式下如何使用tcc-tranction的server模式
#### 环境准备
- [dashboard快速部署](/zh-cn/docs/ops/dashboard/deploy-server.html)    
- [server快速部署](/zh-cn/docs/ops/tccserver/deploy-alone.html)  

#### 第一步 pom引入
```xml
<dependency>
    <groupId>org.mengyun</groupId>
    <artifactId>tcc-transaction-http</artifactId>
    <version>${tcc-transaction.version}</version>
</dependency>

<dependency>
    <groupId>org.mengyun</groupId>
    <artifactId>tcc-transaction-spring-boot-starter</artifactId>
    <version>${tcc-transaction.version}</version>
</dependency>
```

#### 第二步 application.yaml配置
这里以tcc-transaction-http-order中application.yaml为例  
```yaml
spring:
  application:
    name: tcc-transaction-http-order
  tcc:
    recovery:
      # 集群模式下，关闭客户端补偿任务
      recovery-enabled: false
    storage:
      # 开启server模式
      storage-type: remoting
      domain: "TCC:FEIGN:ORDER:"
    #      location: /tmp/${spring.tcc.storage.domain}
    #      serializer-type: customized
    #      transaction-serializer-class-name: org.mengyun.tcctransaction.serializer.json.JacksonTransactionSerializer
    #      max-transaction-size: 100000
    #      storage-mode: central
    registry:
      # 直连tcc-server
      registry-type: direct
      cluster-name: default
      direct:
        server-addresses: 127.0.0.1:2332
#      zookeeper:
#        connect-string: 127.0.0.1:2181
#        max-retries: 4
#      nacos:
#        server-addr: 127.0.0.1:8848
server:
  port: 8081
```

#### 第三步 代码使用
参考[dubbo-sample演示](#dubbo-sample-code-use)

#### 第四步 服务启动并演示
##### 本地idea启动
分别启动tcc-transaction-http-capital、tcc-transaction-http-redpacket、tcc-transaction-http-order
 
##### 页面演示
测试页面入口：http://localhost:8081 
![下单商品页](../img/page_tcc_sample_order.jpg)  
选择购买商品
![支付](../img/page_dubbo_sample_pay.jpg)
点击支付按钮
![支付结果页](../img/page_dubbo_sample_pay_result.jpg)
##### 日志显示
try阶段
```text
1、order try make payment called.time seq:2022-07-13 17:46:04
2、capital try record called. time seq:2022-07-13 17:46:06
3、red packet try record called. time seq:2022-07-13 17:46:07
```
confirm阶段
```text
1、order confirm make payment called. time seq:2022-07-13 17:46:08
2、capital confirm record called. time seq:2022-07-13 17:46:09
3、red packet confirm record called. time seq:2022-07-13 17:46:10
```

##### dashboard效果

恭喜你，顺序正确说明http-sample项目运行成功。



### 注意事项
- TCC事务的confirm和cancel方法的声明必须和try方法入参一致。    
- 如果是作为分支事务提供给上游服务调用时，接口方法必须添加注解@EnableTcc，否则会影响事务上下文传递
- 客户端如果选择server模式，务必先把tcc-server服务启动起来
