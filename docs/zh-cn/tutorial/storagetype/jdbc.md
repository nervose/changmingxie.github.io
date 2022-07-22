# jdbc存储类型
适用于服务单机、集群部署的场景。  
  
此种存储类型，适用于符合jdbc规范的数据库。 
  
详见实现**JdbcTransactionStorage**

## 如何使用
这里以mysql为例。  

### 创建数据
这里默认使用数据库名为TCC，开发者可以自行修改。  
最新脚本请[查看](https://github.com/changmingxie/tcc-transaction/blob/master-2.x/tcc-transaction-core/src/main/dbscripts/db.sql)
```sql
CREATE DATABASE IF NOT EXISTS `TCC` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';

USE `TCC`;

CREATE TABLE IF NOT EXISTS `TCC_TRANSACTION` (
  `TRANSACTION_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DOMAIN` varchar(100) DEFAULT NULL,
  `ROOT_DOMAIN` varchar(100) DEFAULT NULL,
  `ROOT_XID` varchar(64) NOT NULL,
  `XID` varchar(64) NOT NULL,
  `CONTENT` varbinary(8000) DEFAULT NULL,
  `STATUS` int(11) DEFAULT NULL,
  `TRANSACTION_TYPE` int(11) DEFAULT NULL,
  `RETRIED_COUNT` int(11) DEFAULT NULL,
  `IS_DELETE` tinyint(1) DEFAULT 0 NOT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `LAST_UPDATE_TIME` datetime DEFAULT NULL,
  `VERSION` int(11) DEFAULT NULL,
  PRIMARY KEY (`TRANSACTION_ID`),
  UNIQUE KEY `UX_XID` (`XID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `TCC_DOMAIN` (
  `ID` bigint NOT NULL AUTO_INCREMENT,
  `DOMAIN` varchar(100) NOT NULL,
  `PHONE_NUMBERS` varchar(250),
  `ALERT_TYPE` varchar(10),
  `THRESHOLD` integer DEFAULT 0,
  `INTERVAL_MINUTES` integer DEFAULT 0,
  `LAST_ALERT_TIME` datetime DEFAULT NULL,
  `DING_ROBOT_URL` varchar(250) DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT NULL,
  `LAST_UPDATE_TIME` datetime DEFAULT NULL,
  `VERSION` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `UX_DOMAIN` (`DOMAIN`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```
### 添加配置
可如下配置，查看[更多jdbc配置](/zh-cn/docs/tutorial/configurations.html#jdbcstoreproperties)
```properties
spring.tcc.storage.storageType=jdbc
spring.tcc.storage.jdbc.driverClass=com.mysql.jdbc.Driver
spring.tcc.storage.jdbc.jdbcUrl=jdbc:mysql://127.0.0.1:3306/TCC?useSSL=false&connectTimeout=1000&socketTimeout=5000
spring.tcc.storage.jdbc.username=root
spring.tcc.storage.jdbc.password=welcome1
```

### maven依赖

```xml
 <!--tcc-transaction中测试使用版本为5.1.48-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>${mysql.version}</version>
</dependency>
```


