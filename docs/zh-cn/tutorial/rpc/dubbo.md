# dubbo
提供支持dubbo环境下的分布式事务的解决方案。  

## 添加maven依赖
```xml
        <dependency>
            <groupId>org.mengyun</groupId>
            <artifactId>tcc-transaction-dubbo</artifactId>
            <version>最新版本</version>
        </dependency>
```

## 示例工程  
[tcc-transaction-dubbo-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-dubbo-sample)    
- 采用springxml配置方式  
- 两层事务    
  
[tcc-transaction-multiple-tier-sample](https://github.com/changmingxie/tcc-transaction/tree/master-2.x/tcc-transaction-tutorial-sample/tcc-transaction-multiple-tier-sample)    
- 采用application.yaml配置方式  
- 三层事务  
