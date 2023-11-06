# server单机部署
适用于对可用要求不高的场景，比如测试环境，开发者本地测试。  
server支持注册中心有：  
- direct(默认)  
- nacos  
- zookeeper  

server支持多种存储方式  
- memory(默认)  
- rocksdb  
- jdbc  
- redis  
- shard-redis  
- redis-cluster   

server支持对补偿任务的管理(quartz)    
- quartz缓存模式  
- quartz使用db,非集群模式  
- quartz集群模式(默认)   

以下以注册中心[direct]+存储类型[memory]+任务部署类型[quartz集群模式]这种组合为例。
## 准备阶段
### 初始化quartz数据库
这里使用mysql数据库，脚本请[查看](https://github.com/changmingxie/aggregate-framework/blob/master-4.x/aggregate-framework-server/src/main/dbscripts/db_init.sql)

### 下载最新[RELEASE](https://github.com/changmingxie/aggregate-framework/releases)版本
下载最新的安装包aggregate-framework-server-xxx.tar.gz，依次

## 安装并启动

### linux/mac环境

**创建server目录**
```shell script
makdir server 
cd  server  
```
**下载aggregate-framework-server-xxx.tar.gz**，解压到server目录  
```shell script
server % tar zxvf aggregate-framework-server-4.0.0-SNAPSHOT.tar.gz
x conf/application.yaml
x lib/aggregate-framework-server.jar
x conf/
x conf/logback.xml
x bin/
x bin/startup.sh
x bin/startup.cmd
x bin/shutdown.sh
x bin/shutdown.cmd
server % tree
.
├── aggregate-framework-server-4.0.0-SNAPSHOT.tar.gz
├── bin
│   ├── shutdown.cmd
│   ├── shutdown.sh
│   ├── startup.cmd
│   └── startup.sh
├── conf
│   ├── application.yaml
│   └── logback.xml
└── lib
    └── aggregate-framework-server.jar

3 directories, 8 files
server % 
```
conf/application.yaml[详细配置详见](/zh-cn/aggdocs/tutorial/configurations.html#server端)  
以下以注册中心[direct]+存储类型[memory]+任务部署类型[quartz集群模式]这种组合为例。application.yaml可如下配置：  
```yaml
server:
  port: 12332
  servlet:
    context-path: /${spring.application.name}
spring:
  application:
    name: aggregate-framework-server
  autoconfigure:
    exclude:
    - org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
  agg:
    storage:
      storage-type: memory
    recovery:
      quartz-clustered: true
      quartz-data-source-url: jdbc:mysql://localhost:3306/AGG_SERVER?useSSL=false&allowPublicKeyRetrieval=true
      quartz-data-source-driver: com.mysql.jdbc.Driver
      quartz-data-source-user: root
      quartz-data-source-password: welcome1
    registry:
      registry-type: direct
    remoting:
      listen-port: 2332
logging:
  level:
    root: info
```
  
**启动server**
```shell script
sh bin/startup.sh
```

**停止server**
```shell script
sh bin/shutdown.sh
```

### windows环境  
- 创建server目录。
- 下载aggregate-framework-server-xxx.zip，到server目录，并解压。
- 双击bin/startup.cmd，启动server。
- 双击bin/shutdown.cmd，停止server。 
