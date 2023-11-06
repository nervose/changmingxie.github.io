# 自定义存储类型

为开发者自定义存储类型，提供一种扩展方式。   

## 如何使用  
### 自定义存储类型的实现
比如：自定义存储类型为yyyy
编写实现类继承AbstractTransactionStorage，可参考**JdbcTransactionStorage**   
```java
package com.yyyy;

public class YyyyTransactionStorage extends AbstractTransactionStorage{
  
}

```


### 添加配置
```yaml
spring:
  agg:
    storage:
      storage-type: custom
      transactionStorageClass: com.yyyy.YyyyTransactionStorage
      custom-storage-properties:
        key1: value1
```

