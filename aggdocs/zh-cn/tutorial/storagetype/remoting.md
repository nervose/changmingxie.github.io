# remoting存储类型
连接模式为[server模式](/zh-cn/aggdocs/tutorial/connectionmode/server.html)时就是用的这种存储类型。  
使用这种存储类型，客户端不在直接负责存储和任务的相关操作，简化了agg配置同时减轻系统负担。  

## 如何使用 
### 选择注册中心 
查看[注册中心说明](/zh-cn/aggdocs/tutorial/registry/index.html)  

### server部署

查看[server部署说明](/zh-cn/aggdocs/ops/server/index.html)  

### 添加配置
```yaml
spring:
  agg:
    storage:
      storage-type: remoting
    registry:
      registry-type: direct
      cluster-name: default
      direct:
        addresses-for-client: 127.0.0.1:2332
        addresses-for-dashboard: 127.0.0.1:12332
      zookeeper:
        connect-string: 127.0.0.1:2181
        max-retries: 4
      nacos:
        server-addr: 127.0.0.1:8848
```

