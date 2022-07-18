# server部署说明
server服务，是tcc-transaction-2.x版本新增功能，此服务实现了事件存储、补偿任务的集中管理。    
从而简化了1.x中的存储和补偿任务的复杂配置。给开发者带来一种新的选择。  
  
server部署，可以分为两种方式：
- [单机部署](/zh-cn/docs/ops/server/deploy-alone.html)  
  使用测试环境，或者开发者快速体验。
- [集群部署](/zh-cn/docs/ops/server/deploy-cluster.html)  
  适用于生产环境，需要保证高可用。
