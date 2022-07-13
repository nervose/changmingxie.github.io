export default {
  'en-us': {
    sidemenu: [
      {
        title: 'header title',
        children: [
          {
            title: 'demo1',
            link: '/en-us/docs/demo1.html',
          },
          {
            title: 'demo2',
            link: '/en-us/docs/demo2.html',
          },
          {
            title: 'dir',
            opened: true,
            children: [
              {
                title: 'demo3',
                link: '/en-us/docs/dir/demo3.html',
              },
            ],
          },
        ],
      },
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: '概述',
        children: [
          {
            title: 'TCC-TRANSACTION是什么?',
            link: '/zh-cn/docs/what-is-tcctransaction.html',
          },
          {
            title: '术语',
            link: '/zh-cn/docs/terminology.html',
          },
          {
            title: 'FAQ',
            link: '/zh-cn/docs/faq.html',
          }
        ],
      },
      {
        title: '使用手册',
        children: [
          {
            title: '快速开始',
            link: '/zh-cn/docs/tutorial/quickstart.html',
          },
          {
            title: '参数配置',
            link: '/zh-cn/docs/tutorial/configurations.html',
          },
          {
            title: 'API支持',
            link: '/zh-cn/docs/tutorial/api.html',
          },
          {
            title: '存储模式',
            children: [
              {
                title: 'remoting模式',
                link: '/zh-cn/docs/tutorial/storage/remoting.html',
              },
              {
                title: 'redis模式',
                link: '/zh-cn/docs/tutorial/storage/redis.html',
              },
              {
                title: 'redis-cluster模式',
                link: '/zh-cn/docs/tutorial/storage/redis-cluster.html',
              },
              {
                title: 'shard-redis模式',
                link: '/zh-cn/docs/tutorial/storage/shard-redis.html',
              },
              {
                title: 'jdbc模式',
                link: '/zh-cn/docs/tutorial/storage/jdbc.html',
              },
              {
                title: 'memory模式',
                link: '/zh-cn/docs/tutorial/storage/memory.html',
              },
              {
                title: 'rocksdb模式',
                link: '/zh-cn/docs/tutorial/storage/rocksdb.html',
              },
            ],
          },
          {
            title: 'RPC框架支持',
            children: [
              {
                title: '说明',
                link: '/zh-cn/docs/tutorial/rpc/index.html',
              },
              {
                title: 'dubbo',
                link: '/zh-cn/docs/tutorial/rpc/redis.html',
              },
              {
                title: 'openfeign',
                link: '/zh-cn/docs/tutorial/rpc/openfeign.html',
              },
              {
                title: 'grpc',
                link: '/zh-cn/docs/tutorial/rpc/grpc.html',
              }
            ],
          },
          {
            title: '注册中心支持',
            children: [
              {
                title: '说明',
                link: '/zh-cn/docs/tutorial/registry/index.html',
              },
              {
                title: 'direct',
                link: '/zh-cn/docs/tutorial/registry/direct.html',
              },
              {
                title: 'nacos',
                link: '/zh-cn/docs/tutorial/registry/nacos.html',
              },
              {
                title: 'zookeeper',
                link: '/zh-cn/docs/tutorial/registry/zookeeper.html',
              }
            ],
          }
        ],
      },
      {
        title: '运维指南',
        children: [
          {
            title: '版本升级指南',
            link: '/zh-cn/docs/ops/upgrade.html',
          },
          {
            title: 'server部署',
            children: [
              {
                title: '部署说明',
                link: '/zh-cn/docs/ops/tccserver/index.html',
              },
              {
                title: '单机部署',
                link: '/zh-cn/docs/ops/tccserver/deploy-alone.html',
              },
              {
                title: '集群部署',
                link: '/zh-cn/docs/ops/tccserver/deploy-cluster.html',
              },
            ]
          },
          {
            title: 'dashboad部署',
            children: [
              {
                title: '部署说明',
                link: '/zh-cn/docs/ops/dashboard/index.html',
              },
              {
                title: 'local模式部署',
                link: '/zh-cn/docs/ops/dashboard/deploy-local.html',
              },
              {
                title: 'server模式部署',
                link: '/zh-cn/docs/ops/dashboard/deploy-server.html',
              },
            ]
          },
        ],
      },
    ],
    barText: '文档',
  },
};
