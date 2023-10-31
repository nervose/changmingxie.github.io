# embedded模式
该模式下，事件存储、恢复任务等功能被嵌入在业务系统中，由业务系统自行管理。  
当前支持的存储方式有：  
- memory  
- rocksdb  
- jdbc  
- redis  
- shard_redis  
- redis_cluster  

## 架构
![embedded模式架构图](../../img/embedded_mode.jpeg)
