# 快速开始
让我们从一个微服务示例开始!  

## 环境准备
- [dashboard快速部署](/zh-cn/docs/ops/dashboard/deploy-server.html)    
- [server快速部署](/zh-cn/docs/ops/tccserver/deploy-alone.html)  
## 示例
用户购买商品的业务逻辑。整个业务逻辑由3个微服务提供支持：
> 支付服务：根据采购需求创建订单，发起支付。  
> 资金服务：从用户资金帐户中扣除余额。  
> 红包服务：从用户红包账户中扣除余额。  

### 微服务部署架构图
![微服务部署架构图](../img/sample-project-deployment.png)  
    
### 涉及服务
#### 红包服务
```java
public interface RedPacketTradeOrderService {
    @EnableTcc
    public String record(RedPacketTradeOrderDto tradeOrderDto);
}
```

#### 资金服务
```java
public interface CapitalTradeOrderService {
    @EnableTcc
    public String record(CapitalTradeOrderDto tradeOrderDto);
}
```

#### 订单服务
主要业务逻辑如下：
```java
package org.mengyun.tcctransaction.sample.dubbo.order.service;
@Service
public class PaymentServiceImpl {
    @Autowired
    CapitalTradeOrderService capitalTradeOrderService;
    @Autowired
    RedPacketTradeOrderService redPacketTradeOrderService;
    @Autowired
    OrderRepository orderRepository;
    @Compensable(confirmMethod = "confirmMakePayment", cancelMethod = "cancelMakePayment", asyncConfirm = false)
    public void makePayment(@UniqueIdentity String orderNo) {
        System.out.println("order try make payment called.time seq:" + DateFormatUtils.format(Calendar.getInstance(), "yyyy-MM-dd HH:mm:ss"));
        Order order = orderRepository.findByMerchantOrderNo(orderNo);
        String result = capitalTradeOrderService.record(buildCapitalTradeOrderDto(order));
        String result2 = redPacketTradeOrderService.record(buildRedPacketTradeOrderDto(order));
    }
    public void confirmMakePayment(String orderNo) {
        System.out.println("order confirm make payment called. time seq:" + DateFormatUtils.format(Calendar.getInstance(), "yyyy-MM-dd HH:mm:ss"));
        Order foundOrder = orderRepository.findByMerchantOrderNo(orderNo);
        //check if the trade order status is PAYING, if no, means another call confirmMakePayment happened, return directly, ensure idempotency.
        if (foundOrder != null) {
            foundOrder.confirm();
            orderRepository.update(foundOrder);
        }
    }
    public void cancelMakePayment(String orderNo) {
        System.out.println("order cancel make payment called.time seq:" + DateFormatUtils.format(Calendar.getInstance(), "yyyy-MM-dd HH:mm:ss"));
        Order foundOrder = orderRepository.findByMerchantOrderNo(orderNo);
        //check if the trade order status is PAYING, if no, means another call cancelMakePayment happened, return directly, ensure idempotency.
        if (foundOrder != null) {
            foundOrder.cancelPayment();
            orderRepository.update(foundOrder);
        }
    }
}

```


### 不同RPC调用方式

#### dubbo调用
示例工程:[tcc-transaction-dubbo-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-dubbo-sample) 
> tcc-transaction-dubbo-capital(资金服务)  
> tcc-transaction-dubbo-redpacket(红包服务)  
> tcc-transaction-dubbo-order(订单服务)  

以下说明如何使用tcc-tranction

##### 第一步 pom引入
```xml
<dependency>
    <groupId>org.mengyun</groupId>
    <artifactId>tcc-transaction-dubbo</artifactId>
    <version>${tcc-transaction.version}</version>
</dependency>

<dependency>
    <groupId>org.mengyun</groupId>
    <artifactId>tcc-transaction-spring</artifactId>
    <version>${tcc-transaction.version}</version>
</dependency>
```

##### 第二步 spring xml配置
这里以tcc-transaction-dubbo-order中appcontext-service-tcc.xml为例  
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:tcc="http://www.tcctransaction.org/schema/tcc" xmlns="http://www.springframework.org/schema/beans"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.tcctransaction.org/schema/tcc http://www.tcctransaction.org/schema/tcc.xsd">

    <!--驱动TccClient-->
    <tcc:annotation-driven client-config="clientConfig"/>

    <bean class="org.mengyun.tcctransaction.ClientConfig" id="clientConfig">
        <property name="recoveryConfig" >
            <bean class="org.mengyun.tcctransaction.properties.RecoveryProperties">
                <!--服务模式关闭补偿任务-->
                <property name="recoveryEnabled" value="false"/>
            </bean>
        </property>
        <property name="storeConfig">
            <bean class="org.mengyun.tcctransaction.properties.store.StoreProperties">
                <!--对事件进行隔离-->
                <property name="domain" value="TCC:DUBBO:ORDER"/>
                <property name="storageType" value="REMOTING"/>
            </bean>
        </property>
        <!--在storageType=REMOTING需要使用-->
        <property name="registryConfig">
            <bean class="org.mengyun.tcctransaction.properties.registry.ClientRegistryProperties">
                <property name="registryType" value="direct"/>
                <property name="direct">
                    <bean class="org.mengyun.tcctransaction.discovery.registry.direct.DirectRegistryProperties">
                        <!--server ip和port-->
                        <property name="serverAddresses" value="127.0.0.1:2332"/>
                    </bean>
                </property>
            </bean>
        </property>
    </bean>
</beans>

```

##### 第三步 代码使用
###### 主事务实现
在tcc实现上方法上添加@Compensable注解，设置confirmMethod和cancelMethod方法，分别为tcc的confirm和cancel方法。    
订单服务(tcc-transaction-dubbo-order)
```java
@Service
public class PaymentServiceImpl {
    @Compensable(confirmMethod = "confirmMakePayment", cancelMethod = "cancelMakePayment", asyncConfirm = false)
    public void makePayment(@UniqueIdentity String orderNo) {
        String result = capitalTradeOrderService.record(buildCapitalTradeOrderDto(order));
        String result2 = redPacketTradeOrderService.record(buildRedPacketTradeOrderDto(order));
    }
    public void confirmMakePayment(String orderNo) {
        // do something ...
    }
    public void cancelMakePayment(String orderNo) {
        // do something ...
    }
}

```

###### 上下文传递
标有@EnableTcc注解的接口即为**tcc接口**，在RPC调用时起到上下文传递作用。  
资金服务(tcc-transaction-dubbo-capital)tcc接口
```java
public interface CapitalTradeOrderService {
    @EnableTcc
    public String record(CapitalTradeOrderDto tradeOrderDto);
}
```
红包服务(tcc-transaction-dubbo-redpacket)tcc接口
```java
public interface RedPacketTradeOrderService {
    @EnableTcc
    public String record(RedPacketTradeOrderDto tradeOrderDto);
}
```

###### 分支事务实现
在tcc实现上方法上添加@Compensable注解，设置confirmMethod和cancelMethod方法，分别为tcc的confirm和cancel方法。   
资金服务(tcc-transaction-dubbo-capital)tcc事务实现
```java
public class CapitalTradeOrderServiceImpl implements CapitalTradeOrderService {
    @Compensable(confirmMethod = "confirmRecord", cancelMethod = "cancelRecord")
    public String record(CapitalTradeOrderDto tradeOrderDto) {
        // do someting ...
        return "success";
    }

    public void confirmRecord(CapitalTradeOrderDto tradeOrderDto) {
        // do something ...
    }

    public void cancelRecord(CapitalTradeOrderDto tradeOrderDto) {
        // do something ...
    }
}

```
红包服务(tcc-transaction-dubbo-redpacket)tcc事务实现  
```java
public class RedPacketTradeOrderServiceImpl implements RedPacketTradeOrderService {
    @Compensable(confirmMethod = "confirmRecord", cancelMethod = "cancelRecord")
    public String record(RedPacketTradeOrderDto tradeOrderDto) {
        return "success";
    }
    public void confirmRecord(RedPacketTradeOrderDto tradeOrderDto) {
        // do something ...
    }
    public void cancelRecord(RedPacketTradeOrderDto tradeOrderDto) {
        // do something ...
    }
}

```

##### 第四步 服务启动并演示
tcc-transaction-dubbo-capital、tcc-transaction-dubbo-redpacket、tcc-transaction-dubbo-order依次启动  
测试页面入口：http://localhost:8081  


##### 特别注意
- TCC事务的confirm和cancel方法的声明必须和try方法入参一致。    
- 如果是作为分支事务提供给上游服务调用时，接口方法必须添加注解@EnableTcc，否则会影响事务上下文传递
  


#### feign调用



#### grpc调用
