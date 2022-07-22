# remoting存储类型
连接模式为[server模式](/zh-cn/docs/tutorial/connectionmode/server.html)时就是用的这种存储类型。  
使用这种存储类型，客户端不在直接存储和任务的相关操作，简化了tcc配置同时减轻系统负担。  

## 如何使用 
### 选择注册中心 
查看[注册中心说明](/zh-cn/docs/tutorial/registry/index.html)  

### server部署

查看[server部署说明](/zh-cn/docs/ops/server/index.html)  

### 添加配置
```yaml
spring:
  tcc:
    storage:
      storage-type: remoting
    registry:
      registry-type: direct
      cluster-name: default
      direct:
        server-addresses: 127.0.0.1:2332
      zookeeper:
        connect-string: 127.0.0.1:2181
        max-retries: 4
      nacos:
        server-addr: 127.0.0.1:8848
```

