# 参数配置
此处参数配置，针对aggregate-framework-4.x版本。  
采用application.yaml(或properties)方式配置  
参数分为三类：  
- [client端](#client端)
- [server端](#server端)
- [dashboard](#dashboard)

## client端
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|**storage配置**|
|spring.agg.storage.domain| 事件域，用于事件隔离，[详见](/zh-cn/aggdocs/terminology.html#domain)|String | | "AGG" |
|spring.agg.storage.storageType| 事件的存储类型|枚举 | REMOTING、MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED| MEMORY |
|spring.agg.storage.transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用|String| | |
|spring.agg.storage.customStorageProperties| 自定义事件存储类的配置属性，storageType为CUSTOMIZED时用到|Map<String,Object>| | |
|spring.agg.storage.serializerType| 事件的序列化方式 |枚举| KRYO、FASTJSON、CUSTOMIZED| KRYO |
|spring.agg.storage.transactionSerializerClassName| 自定义序列化方式全类名，serializerType为CUSTOMIZED时用到|String| | |
|spring.agg.storage.kryoPoolSize| kryo实例池大小，serializerType为KRYO时用到 |int| | 512 |
|spring.agg.storage.maxTransactionSize| 事件支持的最大字节数|int| | 1MB |
|spring.agg.storage.maxAttempts| 事件操作(插入、更新)尝试次数|int| | 2，即失败一次后，再重试一次|
|spring.agg.storage.requestTimeoutMillis| 请求服务端的超时时间，storageType为REMOTING时用到|long | | 2000ms |
|spring.agg.storage.location| 事件的存储路径，storageType为ROCKSDB时用到|String| | '/tmp' |
|spring.agg.storage.tbSuffix| 事件表后缀名，storageType为JDBC时用到|String| | |
|spring.agg.storage.jdbc| jdbc配置，storageType为JDBC时用到|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.agg.storage.redis| redis配置，storageType为REDIS时用到|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.agg.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用到|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.agg.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用到|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.agg.recovery.recoveryEnabled|是否开启补偿任务，建议storageType为非REMOTING时开启，为REMOTING时关闭|boolean | | true |
|spring.agg.recovery.maxRetryCount| 最大重试次数，recoveryEnabled为true时生效 |int | | 30 |
|spring.agg.recovery.recoverDuration| 补偿间隔时间，即补偿这个时间段之前的事件，recoveryEnabled为true时生效 |int|  | 30s |
|spring.agg.recovery.cronExpression| 补偿定时执行策略|String | | "0/30 * * * * ? " |
|spring.agg.recovery.fetchPageSize|每次补偿事件数|int | | 200 |
|spring.agg.recovery.concurrentRecoveryThreadCount|事件并发补偿线程数|int | | Runtime.getRuntime().availableProcessors() * 2 |
|spring.agg.recovery.updateJobForcibly|是否强制更新Job，用于服务端|boolean | | false |
|spring.agg.recovery.quartzThreadPoolThreadCount|quartz任务执行线程数 | int| Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.agg.recovery.quartzClustered|是否采用Quartz集群模式，生产环境建议使用集群模式|boolean | | false |
|spring.agg.recovery.quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | "com.mysql.jdbc.Driver" |
|spring.agg.recovery.quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | "jdbc:mysql://localhost:3306/AGG_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|spring.agg.recovery.quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | "root" |
|spring.agg.recovery.quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | "welcome1" |
|spring.agg.recovery.quartzDataSourceValidationQuery|数据源连接验证语句，quartzClustered为true用到|String | | "select 1" |
|spring.agg.recovery.quartzDataSourceCheckoutTimeout|获取数据源连接的超时时间，quartzClustered为true用到|int | | 2000ms |
|spring.agg.recovery.quartzDataSourceInitialPoolSize|数据源连接池的初始大小，quartzClustered为true用到|int | | 1 |
|spring.agg.recovery.quartzDataSourceMinPoolSize|数据源连接池的最小连接数，quartzClustered为true用到|String | | 1 |
|spring.agg.recovery.quartzDataSourceMaxPoolSize|数据源连接池的最大连接数，quartzClustered为true用到|String | | 10 |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的全类名，quartzClustered为true用到|String | | 空，使用内置的connectionProvider |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的配置属性，quartzClustered为true用到|Map<String,String>| |  |
|**registry配置**|
|spring.agg.registry.registryRole| 注册角色类型 |枚举 | CLIENT | CLIENT|
|spring.agg.registry.clusterName| 集群名称 |String| | "default"|
|spring.agg.registry.registryType| 注册中心类型 |枚举 | direct、zookeeper、nacos、custom | direct |
|spring.agg.registry.customRegistryName| 自定义注册中心，registryType为custom时用到，便于使用方扩展|String | | |
|spring.agg.registry.direct| direct配置，registryType为direct时用到 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.agg.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.agg.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |
|**remoting配置，storageType为REMOTING时用到**|
|spring.agg.remoting.connectTimeoutMillis| 连接超时时间 |long| | 2000ms |
|spring.agg.remoting.channelMaxIdleTimeSeconds| (未发生write调用时)写检测的心跳间隔时间，需要小于server端的channelIdleTimeoutSeconds |int| | 20s |
|spring.agg.remoting.reconnectIntervalSeconds| 重连间隔时间（暂未实际使用) |int| | 5s |
|spring.agg.remoting.workerThreadSize| 执行ChannelHandler的线程数 |int| | Runtime.getRuntime().availableProcessors() * 2 |
|spring.agg.remoting.socketBacklog| 临时存放已完成三次握手的请求的队列的最大长度 |int| | 512 |
|spring.agg.remoting.socketRcvBufSize| 接受缓冲区大小 |int| | 153600 |
|spring.agg.remoting.socketSndBufSize| 发送缓冲区大小 |int| | 153600 |
|spring.agg.remoting.frameMaxLength| 请求的最大帧长度 |int| | 2MB |
|spring.agg.remoting.workSelectorThreadSize| 用于处理各种channel事件的线程数 |int| | Runtime.getRuntime().availableProcessors() |
|spring.agg.remoting.requestProcessThreadSize| 处理事件读写读写请求的线程数 |int| | Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.agg.remoting.requestProcessThreadQueueCapacity| 处理事件读写请求的等待队列长度 |int| | 1024 |
|spring.agg.remoting.channelPoolMaxTotal| channel连接池的相关配置 |int| | -1,无限制 |
|spring.agg.remoting.channelPoolMinIdlePerKey| channel连接池的相关配置 |int| | 1 |
|spring.agg.remoting.channelPoolMaxIdlePerKey| channel连接池的相关配置 |int| | 4 |
|spring.agg.remoting.channelPoolMaxTotalPerKey| channel连接池的相关配置 |int| | 4 |
|spring.agg.remoting.channelPoolMaxWaitMillis| channel连接池的相关配置 |long| | 300ms |
|spring.agg.remoting.channelPoolTimeBetweenEvictionRunsMillis| channel连接池的相关配置 |long| | 10s |
|spring.agg.remoting.channelPoolSoftMinEvictableIdleTimeMillis| channel连接池的相关配置 |long| | 30min |
|spring.agg.remoting.numTestsPerEvictionRun| channel连接池的相关配置 |int| | 2 |


## server端
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|server.port| web端口，主要服务于dashboard |int | | 12332 |
|**storage配置**|
|spring.agg.storage.storageType| 存储类型|枚举 | MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED，**不支持REMOTING**| MEMORY |
|spring.agg.storage.transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用到|String| | |
|spring.agg.storage.customStorageProperties| 自定义事件存储类的配置属性，storageType为CUSTOMIZED时用到|Map<String,Object>| | |
|spring.agg.storage.maxTransactionSize| 事件支持的最大字节数|int| | 1MB|
|spring.agg.storage.location| 事件的存储路径，storageType为ROCKSDB时用到|String| | '/tmp' |
|spring.agg.storage.tbSuffix| 事件表后缀名，storageType为JDBC时用到|String| | |
|spring.agg.storage.jdbc| jdbc配置，storageType为JDBC时用到|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.agg.storage.redis| redis配置，storageType为REDIS时用到|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.agg.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用到|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.agg.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用到|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.agg.recovery.maxRetryCount| 最大重试次数，recoveryEnabled为true时生效 |int | | 30 |
|spring.agg.recovery.recoverDuration| 补偿间隔时间，即补偿这个时间段之前的事件，recoveryEnabled为true时生效 |int|  | 30s |
|spring.agg.recovery.cronExpression| 补偿定时执行策略|String | | "0/30 * * * * ? " |
|spring.agg.recovery.fetchPageSize|每次补偿事件数|int | | 200 |
|spring.agg.recovery.concurrentRecoveryThreadCount|事件并发补偿线程数|int | | Runtime.getRuntime().availableProcessors() * 2 |
|spring.agg.recovery.updateJobForcibly|是否强制更新Job，用于服务端|boolean | | false |
|spring.agg.recovery.quartzThreadPoolThreadCount|quartz任务执行线程数 | int| Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.agg.recovery.quartzClustered|是否采用Quartz集群模式，生产环境建议使用集群模式|boolean | | false |
|spring.agg.recovery.quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | "com.mysql.jdbc.Driver" |
|spring.agg.recovery.quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | "jdbc:mysql://localhost:3306/AGG_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|spring.agg.recovery.quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | "root" |
|spring.agg.recovery.quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | "welcome1" |
|spring.agg.recovery.quartzDataSourceValidationQuery|数据源连接验证语句，quartzClustered为true用到|String | | "select 1" |
|spring.agg.recovery.quartzDataSourceCheckoutTimeout|获取数据源连接的超时时间，quartzClustered为true用到|int | | 2000ms |
|spring.agg.recovery.quartzDataSourceInitialPoolSize|数据源连接池的初始大小，quartzClustered为true用到|int | | 1 |
|spring.agg.recovery.quartzDataSourceMinPoolSize|数据源连接池的最小连接数，quartzClustered为true用到|String | | 1 |
|spring.agg.recovery.quartzDataSourceMaxPoolSize|数据源连接池的最大连接数，quartzClustered为true用到|String | | 10 |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的全类名，quartzClustered为true用到|String | | 空，使用内置的connectionProvider |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的配置属性，quartzClustered为true用到|Map<String,String>| |  |
|**registry配置**|
|spring.agg.registry.clusterName| 集群名称 |String| | "default"|
|spring.agg.registry.registryAddress| 需要注册的server地址 |string| | 空，会尝试根据网卡信息获取有效的IP地址 |
|spring.agg.registry.registryPortForDashboard| 需要注册的供dashboard使用的端口 |int| | 12332(应与server.port一致) |
|spring.agg.registry.registryType| 注册中心类型 |枚举 | direct、zookeeper、nacos、custom | direct |
|spring.agg.registry.customRegistryName| 自定义注册中心，registryType为custom时用到，便于使用方扩展|String | | |
|spring.agg.registry.direct| direct配置，registryType为direct时用到 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.agg.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.agg.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |
|**remoting配置**|
|spring.agg.remoting.listen-port| netty服务端口，主要服务于client端 |int|  |2332 |
|spring.agg.remoting.channelIdleTimeoutSeconds| 闲置channel的超时时间 |int| |60s |
|spring.agg.remoting.flowMonitorPrintIntervalMinutes| 流量监控间隔时间 |int| | 5min |
|spring.agg.remoting.workerThreadSize| 执行ChannelHandler的线程数 |int| | Runtime.getRuntime().availableProcessors() * 2 |
|spring.agg.remoting.socketBacklog| 临时存放已完成三次握手的请求的队列的最大长度 |int| | 512 |
|spring.agg.remoting.socketRcvBufSize| 接受缓冲区大小 |int| | 153600 |
|spring.agg.remoting.socketSndBufSize| 发送缓冲区大小 |int| | 153600 |
|spring.agg.remoting.frameMaxLength| 请求的最大帧长度 |int| | 2MB |
|spring.agg.remoting.workSelectorThreadSize| 用于处理各种channel事件的线程数 |int| | Runtime.getRuntime().availableProcessors() |
|spring.agg.remoting.requestProcessThreadSize| 处理事件读写读写请求的线程数 |int| | Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.agg.remoting.requestProcessThreadQueueCapacity| 处理事件读写请求的等待队列长度 |int| | 1024 |



## dashbaord
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|**dashboard配置**|
|spring.agg.dashboard.userName| dashboard用户名|String | | "admin" |
|spring.agg.dashboard.password| dashboard密码|String | | "123456" |
|spring.agg.dashboard.connectionMode| 连接模式 |枚举 | EMBEDDED，SERVER |  |
|**registry配置，connectionMode为SERVER时用到**|
|feign.path| 调用server的请求路径前缀，connectionMode为SERVER时用到 |string | | |
|spring.agg.registry.clusterName| 集群名称 |String| | "default"|
|spring.agg.registry.registryRole| 注册角色类型 |枚举 | DASHBOARD | CLIENT，**注意**请配置为DASHBOARD|
|spring.agg.registry.registryType| 注册中心类型 |枚举 | 取值：direct、zookeeper、nacos |默认为direct |
|spring.agg.registry.direct| direct配置，registryType为direct时用到，**注意**这里配置的是server端的http地址 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.agg.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.agg.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |
|**storage配置，connectionMode为EMBEDDED时用到**|
|spring.agg.storage.storageType| 存储类型|枚举 | 支持模式有：MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED | 默认为MEMORY |
|spring.agg.storage.transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用|String| | |
|spring.agg.storage.customStorageProperties| 自定义事件存储类的配置属性，storageType为CUSTOMIZED时用到|Map<String,Object>| | |
|spring.agg.storage.jdbc| jdbc配置，storageType为JDBC时用|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.agg.storage.redis| redis配置，storageType为REDIS时用|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.agg.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.agg.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.agg.recovery.recoveryEnabled|是否开启补偿任务|boolean | | true，**注意**请配置为false|
|spring.agg.recovery.quartzClustered|是否采用Quartz集群模式，如果connectionMode为SERVER时，建议使用集群模式，便于对任务管理|boolean | | 默认为false |
|spring.agg.recovery.updateJobForcibly|是否强制更新Job，用于服务端|boolean | | false |
|spring.agg.recovery.quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | "com.mysql.jdbc.Driver" |
|spring.agg.recovery.quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | "jdbc:mysql://localhost:3306/AGG_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|spring.agg.recovery.quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | "root" |
|spring.agg.recovery.quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | "welcome1" |
|spring.agg.recovery.quartzDataSourceValidationQuery|数据源连接验证语句，quartzClustered为true用到|String | | "select 1" |
|spring.agg.recovery.quartzDataSourceCheckoutTimeout|获取数据源连接的超时时间，quartzClustered为true用到|int | | 2000ms |
|spring.agg.recovery.quartzDataSourceInitialPoolSize|数据源连接池的初始大小，quartzClustered为true用到|int | | 1 |
|spring.agg.recovery.quartzDataSourceMinPoolSize|数据源连接池的最小连接数，quartzClustered为true用到|String | | 1 |
|spring.agg.recovery.quartzDataSourceMaxPoolSize|数据源连接池的最大连接数，quartzClustered为true用到|String | | 10 |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的全类名，quartzClustered为true用到|String | | 空，使用内置的connectionProvider |
|spring.agg.recovery.customConnectionProviderClassName|自定义connectionProvider的配置属性，quartzClustered为true用到|Map<String,String>| |  |

## 公共配置  

### JdbcStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|driverClass| jdbc驱动类|String | | "com.mysql.jdbc.Driver" |
|jdbcUrl| jdbc链接地址|String| | "jdbc:mysql://127.0.0.1:3306/AGG?useSSL=false&connectTimeout=1000&socketTimeout=5000"|
|username| 用户名 |String|  | "root" |
|password| 密码|String | | "welcome1" |
|initialPoolSize|初始连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 10 |
|minPoolSize| 最小连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 10 |
|maxPoolSize| 最大连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 50|
|checkoutTimeout| 获取连接的超时时间，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 2000|


### RedisStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|host| 主机名 |String | | "127.0.0.1" |
|port| 端口 |int|  |6379 |
|database| 数据库索引|int | | 0 |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |1000ms |
|connectionTimeout| 连接超时时间|int | | 1000ms |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |

### ShardRedisStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|nodes| 节点配置集合 |Set<[HostAndPort](#hostandport)> | | |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |1000ms |
|connectionTimeout| 连接超时时间|int | | 1000ms |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |

### RedisClusterStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|nodes| 节点配置集合 |Set<[HostAndPort](#hostandport)> | | |
|maxAttempts| 最大重试次数 |int | |5 |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |1000ms |
|connectionTimeout| 连接超时时间|int | | 1000ms |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |


### DirectRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|addressesForClient| 用于Client的服务地址，多个以英文逗号分割 |String| | "127.0.0.1:2332"|
|addressesForDashboard| 用于Dashboard的服务地址，多个以英文逗号分割 |String| | "127.0.0.1:12332"|

### ZookeeperRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|connectString| zookeeper连接地址 |String| | "127.0.0.1:2181"|
|sessionTimeout| session超时时间 |int| | 10s|
|connectTimeout| 连接超时时间 |int| | 2s|
|digest| 认证用户名密码 |String| | 空，不用认证|
|baseSleepTime| 两次重试等待的初始值 |int| | 500ms|
|maxRetries| 最大重试次数 |int| | 3|

### NacosRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|username| nacos用户名 |String| | "nacos"|
|password| nacos密码 |String| | "nacos"|
|serverAddr| nacos注册地址 |String| | "127.0.0.1:8848"|
|namespace| nacos命名空间 |String| | "public"|
|group| nacos组 |String| | "AGG_GROUP"|
|serviceNameForClient| 用于Client的服务名 |String| | "agg-server-for-client"|
|serviceNameForClient| 用于Dashboard的服务名 |String| | "agg-server-for-dashboard"|

### PoolConfig
这里只列出了一下常用的线程池配置
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|maxTotal| 最大实例数 |String | | |
|maxIdle| 最大空闲实例数 |int|  |300 |
|minIdle| 最小空闲实例数|int | | 1000 |
|maxWaitMillis| 最大等待时间| | | |

### HostAndPort
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|host| 主机名 |String | | |
|port| 端口 |int|  | |
|database| 数据库索引|int | | 0 |

