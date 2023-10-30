# server模式
aggregate-framework-4.x版本新增此模式，此模式将事件存储及补偿的相关操作，交由一个server服务来执行，此服务实现了事件存储、补偿任务的集中管理。   
简化了先前版本中存储和补偿任务的复杂配置。给开发者带来一种新的选择。  
  
## 架构
![server模式架构图](../../img/server_mode.jpeg)    


