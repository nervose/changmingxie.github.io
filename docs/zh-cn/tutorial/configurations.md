# 参数配置
此处参数配置，针对tcc-transaction-2.x版本。  
参数分为三类：  
- [client端](#client端)
- [server端](#server端)
- [dashboard](#dashboard)

## client端
采用application.yaml(或properties)方式配置
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|**storage配置**|
|spring.tcc.storage.domain| 事件域，用于事件隔离，[详见](/zh-cn/docs/terminology.html#domain)|String | | 默认为"TCC" |
|spring.tcc.storage.storageMode| 存储模式，仅用于客户端，当取值为CENTRAL，分支事务补偿时会对TRY_SUCCESS状态的事件，进行处理 |枚举| 取值：ALONE、CENTRAL| 默认为ALONE |
|spring.tcc.storage.storageType| 存储类型|枚举 | 当前支持模式有：REMOTING、MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED| 默认为MEMORY |
|spring.tcc.storage.transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用|String| | |
|spring.tcc.storage.serializerType| 序列化方式，仅用于客户端 |枚举| 取值：KRYO、FASTJSON、CUSTOMIZED| 默认为KRYO |
|spring.tcc.storage.kryoPoolSize| 序列化方式为KRYO时用到，仅用于客户端 |int| 取值：KRYO、CUSTOMIZED| 默认为KRYO |
|spring.tcc.storage.transactionSerializerClassName| 自定义事件序列化类，序列化方式为CUSTOMIZED时用到，仅用于客户端 |String| | |
|spring.tcc.storage.maxTransactionSize| 事件支持最大字节数|int| | 默认为1*1024*1024(1M)|
|spring.tcc.storage.maxAttempts| 事件操作尝试次数|int| | 默认为2，即失败一次后，再重试一次|
|spring.tcc.storage.requestTimeoutMillis| 请求超时时间，storageType为REMOTING时用|long| | 默认为2000，单位为ms|
|spring.tcc.storage.location| 存储路径，storageType为ROCKSDB时用|String| | 默认为'/tmp'|
|spring.tcc.storage.tbSuffix| 事件表名后缀，storageType为JDBC时用|String| | 相关表有TCC_TRANSACTION，TCC_DOMAIN|
|spring.tcc.storage.jdbc| jdbc配置，storageType为JDBC时用|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.tcc.storage.redis| redis配置，storageType为REDIS时用|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.tcc.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.tcc.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.tcc.recovery.recoveryEnabled|是否开启补偿任务，用于客户端，建议storageType为非REMOTING时开启，为REMOTING时关闭|boolean | | 默认为true |
|spring.tcc.recovery.maxRetryCount| 最大重试次数，recoveryEnabled为true时生效 |int | | 默认为30|
|spring.tcc.recovery.recoverDuration| 补偿间隔时间，即补偿这个时间段之前的事件，recoveryEnabled为true时生效 |int|  | 默认为30，单位为秒|
|spring.tcc.recovery.maxTimeTreatTryingAsFailed| 当事件处于trying状态达到一定时间后，系统自动置为失败，进而执行rollback操作。此参数当大于0时才生效，支持版本[2.0.1](https://github.com/changmingxie/tcc-transaction/releases/tag/2.0.1)|int|  | 默认为0，单位为秒|
|spring.tcc.recovery.cronExpression| 补偿定时执行策略|String | | 默认为"0/30 * * * * ? " |
|spring.tcc.recovery.fetchPageSize|每次补偿事件数|int | | 默认为200 |
|spring.tcc.recovery.concurrentRecoveryThreadCount|事件并发补偿线程数|int | | 默认为Runtime.getRuntime().availableProcessors() * 2 |
|**registry配置**|
|spring.tcc.registry.clusterName| 集群名称 |String| | 默认值为"default"|
|spring.tcc.registry.registryType| 注册中心类型 |枚举 | 取值：direct、zookeeper、nacos、custom |默认为direct |
|spring.tcc.registry.customRegistryName| 自定义注册中心，registryType为custom时用到，便于使用方扩展|String | | |
|spring.tcc.registry.direct| direct配置，registryType为direct时用到 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.tcc.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.tcc.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |


## server端
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|server.port| web端口，主要服务于dashboard |int | |默认为12332 |
|spring.tcc.remoting.listen-port| netty服务端口，主要服务于tcc-client |int|  |默认为2332 |
|**storage配置**|
|spring.tcc.storage.storageType| 存储类型|枚举 | 支持存储类型有：MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED，**不支持REMOTING**| 默认为MEMORY |
|spring.tcc.storage.transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用|String| | |
|spring.tcc.storage.maxTransactionSize| 事件支持最大字节数|int| | 默认为1*1024*1024(1M)|
|spring.tcc.storage.maxAttempts| 事件操作尝试次数|int| | 默认为2，即失败一次后，再重试一次|
|spring.tcc.storage.location| 存储路径，storageType为ROCKSDB时用|String| | 默认为'/tmp'|
|spring.tcc.storage.tbSuffix| 事件表名后缀，storageType为JDBC时用|String| | 默认为空，相关表有TCC_TRANSACTION，TCC_DOMAIN|
|spring.tcc.storage.jdbc| jdbc配置，storageType为JDBC时用|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.tcc.storage.redis| redis配置，storageType为REDIS时用|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.tcc.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.tcc.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.tcc.recovery.maxRetryCount| 最大重试次数 |int | | 默认为30|
|spring.tcc.recovery.recoverDuration| 补偿间隔时间，即补偿这个时间段之前的事件 |int|  | 默认为30，单位为秒|
|spring.tcc.recovery.maxTimeTreatTryingAsFailed| 当事件处于trying状态达到一定时间后，系统自动置为失败，进而执行rollback操作。此参数当大于0时才生效，支持版本[2.0.1](https://github.com/changmingxie/tcc-transaction/releases/tag/2.0.1)|int|  | 默认为0，单位为秒|
|spring.tcc.recovery.cronExpression| 补偿定时执行策略|String | | 默认为"0/30 * * * * ? " |
|spring.tcc.recovery.fetchPageSize|每次补偿事件数|int | | 默认为200 |
|spring.tcc.recovery.concurrentRecoveryThreadCount|事件并发补偿线程数|int | | 默认为Runtime.getRuntime().availableProcessors() * 2 |
|spring.tcc.recovery.updateJobForcibly|是否强制更新Job，用于服务端|boolean | | 默认为false |
|spring.tcc.recovery.quartzClustered|是否采用Quartz集群模式，用于服务端，生产环境建议使用集群模式|boolean | | 默认为false |
|spring.tcc.recovery.quartzThreadPoolThreadCount|quartz任务执行线程数 | int| 默认为Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.tcc.recovery.quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | 默认为"com.mysql.jdbc.Driver" |
|spring.tcc.recovery.quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | 默认为"jdbc:mysql://localhost:3306/TCC_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|spring.tcc.recovery.quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | 默认为"root" |
|spring.tcc.recovery.quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | 默认为"welcome1" |
|**registry配置**|
|spring.tcc.registry.clusterName| 集群名称 |String| | 默认值为"default"|
|spring.tcc.registry.registryType| 注册中心类型 |枚举 | 取值：direct、zookeeper、nacos、custom |默认为direct |
|spring.tcc.registry.customRegistryName| 自定义注册中心，registryType为custom时用到，便于使用方扩展|String | | |
|spring.tcc.registry.direct| direct配置，registryType为direct时用到 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.tcc.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.tcc.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |



## dashbaord
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|**dashboard配置**|
|spring.tcc.dashboard.userName| dashboard用户名|String | | 默认为"admin" |
|spring.tcc.dashboard.password| dashboard密码|String | | 默认为"123456" |
|spring.tcc.dashboard.connectionMode| 连接模式 |枚举 | 取值：EMBEDDED，SERVER |  |
|spring.tcc.dashboard.registry.clusterName| 集群名称，connectionMode为SERVER时用到 |String| | 默认值为"default"|
|spring.tcc.dashboard.registry.registryType| 注册中心类型，connectionMode为SERVER时用到  |枚举 | 取值：direct、zookeeper、nacos |默认为direct |
|spring.tcc.dashboard.registry.direct| direct配置，registryType为direct时用到，**注意**这里配置的是server端的http地址 |[DirectRegistryProperties](#directregistryproperties)|  | |
|spring.tcc.dashboard.registry.zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|spring.tcc.dashboard.registry.nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |
|**storage配置**|
|spring.tcc.storage.storageType| 存储类型|枚举 | 支持模式有：MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER| 默认为MEMORY |
|spring.tcc.storage.jdbc| jdbc配置，storageType为JDBC时用|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|spring.tcc.storage.redis| redis配置，storageType为REDIS时用|[RedisStoreProperties](#redisstoreproperties)| | |
|spring.tcc.storage.shardRedis| shardRedis配置，storageType为SHARD_REDIS时用|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|spring.tcc.storage.redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |
|**recovery配置**|
|spring.tcc.recovery.quartzClustered|是否采用Quartz集群模式，如果connectionMode为SERVER时，建议使用集群模式，便于对任务管理|boolean | | 默认为false |
|spring.tcc.recovery.quartzThreadPoolThreadCount|quartz任务执行线程数，quartzClustered为true用到 | int| 默认为Runtime.getRuntime().availableProcessors() * 2 + 1 |
|spring.tcc.recovery.quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | 默认为"com.mysql.jdbc.Driver" |
|spring.tcc.recovery.quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | 默认为"jdbc:mysql://localhost:3306/TCC_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|spring.tcc.recovery.quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | 默认为"root" |
|spring.tcc.recovery.quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | 默认为"welcome1" |

## 公共配置  

### StoreProperties
存储类公共配置  
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|domain| 事件域，用于事件隔离，[详见](/zh-cn/docs/terminology.html#domain)|String | | 默认为"TCC" |
|storageMode| 存储模式，仅用于客户端，当取值为CENTRAL，分支事务补偿时会对TRY_SUCCESS状态的事件，进行处理 |枚举| 取值：ALONE、CENTRAL| 默认为ALONE |
|storageType| 存储类型|枚举 | 当前支持模式有：REMOTING、MEMORY、ROCKSDB、JDBC、REDIS、SHARD_REDIS、REDIS_CLUSTER、CUSTOMIZED| 默认为MEMORY |
|transactionStorageClass| 自定义事件存储类，storageType为CUSTOMIZED时用|String| | |
|serializerType| 序列化方式，仅用于客户端 |枚举| 取值：KRYO、FASTJSON、CUSTOMIZED| 默认为KRYO |
|kryoPoolSize| 序列化方式为KRYO时用到，仅用于客户端 |int| 取值：KRYO、CUSTOMIZED| 默认为KRYO |
|transactionSerializerClassName| 自定义事件序列化类，序列化方式为CUSTOMIZED时用到，仅用于客户端 |String| | |
|maxTransactionSize| 事件支持最大字节数|int| | 默认为1*1024*1024(1M)|
|maxAttempts| 事件操作尝试次数|int| | 默认为2，即失败一次后，再重试一次|
|requestTimeoutMillis| 请求超时时间，storageType为REMOTING时用|long| | 默认为2000，单位为ms|
|location| 存储路径，storageType为ROCKSDB时用|String| | 默认为'/tmp'|
|tbSuffix| 事件表名后缀，storageType为JDBC时用|String| | 相关表有TCC_TRANSACTION，TCC_DOMAIN|
|jdbc| jdbc配置，storageType为JDBC时用|[JdbcStoreProperties](#jdbcstoreproperties)| | |
|redis| redis配置，storageType为REDIS时用|[RedisStoreProperties](#redisstoreproperties)| | |
|shardRedis| shardRedis配置，storageType为SHARD_REDIS时用|[ShardRedisStoreProperties](#shardredisstoreproperties)| | |
|redisCluster| redisCluster配置，storageType为REDIS_CLUSTER时用|[RedisClusterStoreProperties](#redisclusterstoreproperties)| | |

### RegistryProperties
注册中心公共配置  
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|clusterName| 集群名称 |String| | 默认值为"default"|
|registryType| 注册中心类型 |枚举 | 取值：direct、zookeeper、nacos、custom |默认为direct |
|customRegistryName| 自定义注册中心，registryType为custom时用到，便于使用方扩展|String | | |
|direct| direct配置，registryType为direct时用到 |[DirectRegistryProperties](#directregistryproperties)|  | |
|zookeeper| zookeeper配置，registryType为zookeeper时用到 |[ZookeeperRegistryProperties](#zookeeperregistryproperties)|  | |
|nacos| nacos配置，registryType为nacos时用到 |[NacosRegistryProperties](#nacosregistryproperties)|  | |


### RecoveryProperties
补偿任务相关配置  
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|maxRetryCount| 最大重试次数 |int | | 默认为30|
|recoverDuration| 补偿间隔时间，即补偿这个时间段之前的事件 |int|  | 默认为30，单位为秒|
|cronExpression| 补偿定时执行策略|String | | 默认为"0/30 * * * * ? " |
|fetchPageSize|每次补偿事件数|int | | 默认为200 |
|concurrentRecoveryThreadCount|事件并发补偿线程数|int | | 默认为Runtime.getRuntime().availableProcessors() * 2 |
|isRecoveryEnabled|是否开启补偿任务，用于客户端|boolean | | 默认为true |
|updateJobForcibly|是否强制更新Job，用于服务端|boolean | | 默认为false |
|quartzClustered|是否采用Quartz集群模式，用于服务端|boolean | | 默认为false |
|quartzThreadPoolThreadCount|quartz任务执行线程数 | int| 默认为Runtime.getRuntime().availableProcessors() * 2 + 1 |
|quartzDataSourceDriver|数据源驱动类，quartzClustered为true用到|String | | 默认为"com.mysql.jdbc.Driver" |
|quartzDataSourceUrl|数据源地址，quartzClustered为true用到|String | | 默认为"jdbc:mysql://localhost:3306/TCC_SERVER?useSSL=false&allowPublicKeyRetrieval=true&connectTimeout=1000&socketTimeout=5000" |
|quartzDataSourceUser|数据源用户名，quartzClustered为true用到|String | | 默认为"root" |
|quartzDataSourcePassword|数据源用户密码，quartzClustered为true用到|String | | 默认为"welcome1" |

### JdbcStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|driverClass| jdbc驱动类|String | | 默认为"com.mysql.jdbc.Driver" |
|jdbcUrl| jdbc链接地址|String| | 默认为"jdbc:mysql://127.0.0.1:3306/TCC?useSSL=false&connectTimeout=1000&socketTimeout=5000"|
|username| 用户名 |String|  |默认为"root" |
|password| 密码|String | | 默认为"welcome1" |
|initialPoolSize|初始连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 默认为10 |
|minPoolSize| 最小连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 默认为10 |
|maxPoolSize| 最大连接池数，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 默认为50|
|checkoutTimeout| 获取连接的超时时间，详见[c3p0](https://www.mchange.com/projects/c3p0) |int| | 默认为2000|


### RedisStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|host| 主机名 |String | | 默认为"127.0.0.1" |
|port| 端口 |int|  |默认为6379 |
|database| 数据库索引|int | | 默认为0 |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |默认为300 |
|connectionTimeout| 连接超时时间|int | | 默认为1000 |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |

### ShardRedisStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|nodes| 节点配置集合 |Set<[HostAndPort](#hostandport)> | | |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |默认为300 |
|connectionTimeout| 连接超时时间|int | | 默认为1000 |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |

### RedisClusterStoreProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|nodes| 节点配置集合 |Set<[HostAndPort](#hostandport)> | | |
|maxAttempts| 最大重试次数 |int | |默认为5 |
|password| 密码 |String | | |
|soTimeout| 数据响应时间 |int|  |默认为300 |
|connectionTimeout| 连接超时时间|int | | 默认为1000 |
|poolConfig| 线程池配置|[PoolConfig](#poolconfig) | | |


### DirectRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|serverAddresses| 服务地址，多个以英文逗号分割 |String| | 默认值为"127.0.0.1:2332"|

### ZookeeperRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|connectString| zookeeper连接地址 |String| | 默认值为"127.0.0.1:2181"|
|sessionTimeout| session超时时间 |int| | 默认值为10 * 1000，单位为毫秒|
|connectTimeout| 连接超时时间 |int| | 默认值为2 * 1000，单位为毫秒|
|digest| 认证用户名密码 |String| | 默认值为为空，不用认证|
|baseSleepTime| 两次重试等待的初始值 |int| | 默认值为500，单位为毫秒|
|maxRetries| 最大重试次数 |int| | 默认值为3|

### NacosRegistryProperties
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|username| nacos用户名 |String| | 默认值为"nacos"|
|password| nacos密码 |String| | 默认值为"nacos"|
|serverAddr| nacos注册地址 |String| | 默认值为"127.0.0.1:8848"|
|namespace| nacos命名空间 |String| | 默认值为"public"|
|group| nacos组 |String| | 默认值为"TCC_GROUP"|
|serviceName| nacos服务名 |String| | 默认值为"tcc-server"|

### poolConfig
这里只列出了一下常用的线程池配置
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|:-------|
|maxTotal| 最大实例数 |String | | |
|maxIdle| 最大空闲实例数 |int|  |默认为300 |
|minIdle| 最小空闲实例数|int | | 默认为1000 |
|maxWaitMillis| 最大等待时间| | | |

### HostAndPort
|<div style="width:50px">参数名</div> |<div style="width:200px">含义</div>|类型|可选值|默认值|
|:------|:------|:------|:-----------|:-----------------|
|host| 主机名 |String | | |
|port| 端口 |int|  | |
|database| 数据库索引|int | | 默认为0 |

