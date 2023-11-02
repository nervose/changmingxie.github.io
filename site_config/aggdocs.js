export default {
  'en-us': {
    sidemenu: [
    ],
    barText: 'Documentation',
  },
  'zh-cn': {
    sidemenu: [
      {
        title: '概述',
        children: [
          {
            title: 'AGGREGATE-FRAMEWORK是什么',
            link: '/zh-cn/aggdocs/what-is-aggregateframework.html',
          },
          {
            title: '术语',
            link: '/zh-cn/aggdocs/terminology.html',
          },
          {
            title: 'FAQ',
            link: '/zh-cn/aggdocs/faq.html',
          }
        ],
      },
      {
        title: '用户指南',
        children: [
          {
            title: '快速开始',
            link: '/zh-cn/aggdocs/tutorial/quickstart.html',
          },
          {
            title: '参数配置',
            link: '/zh-cn/aggdocs/tutorial/configurations.html',
          },
          {
            title: 'API支持',
            link: '/zh-cn/aggdocs/tutorial/api.html',
          },
          {
            title: '事件处理器',
            link: '/zh-cn/aggdocs/tutorial/eventhandler.html',
          },
          {
            title: '连接模式',
            children: [
              {
                title: 'embedded模式',
                link: '/zh-cn/aggdocs/tutorial/connectionmode/embedded.html',
              },
              {
                title: 'server模式',
                link: '/zh-cn/aggdocs/tutorial/connectionmode/server.html',
              }
            ],
          },
          {
            title: '存储类型',
            children: [
              {
                title: 'memory',
                link: '/zh-cn/aggdocs/tutorial/storagetype/memory.html',
              },
              {
                title: 'rocksdb',
                link: '/zh-cn/aggdocs/tutorial/storagetype/rocksdb.html',
              },
              {
                title: 'jdbc',
                link: '/zh-cn/aggdocs/tutorial/storagetype/jdbc.html',
              },
              {
                title: 'redis',
                link: '/zh-cn/aggdocs/tutorial/storagetype/redis.html',
              },
              {
                title: 'shard-redis',
                link: '/zh-cn/aggdocs/tutorial/storagetype/shard-redis.html',
              },
              {
                title: 'redis-cluster',
                link: '/zh-cn/aggdocs/tutorial/storagetype/redis-cluster.html',
              },
              {
                title: 'remoting',
                link: '/zh-cn/aggdocs/tutorial/storagetype/remoting.html',
              },
              {
                title: 'custom',
                link: '/zh-cn/aggdocs/tutorial/storagetype/custom.html',
              },
            ],
          },
          {
            title: '事件序列化',
            children: [
              {
                title: '说明',
                link: '/zh-cn/aggdocs/tutorial/serializer/index.html',
              },
              {
                title: 'kryo',
                link: '/zh-cn/aggdocs/tutorial/serializer/kryo.html',
              },
              {
                title: 'fastjson',
                link: '/zh-cn/aggdocs/tutorial/serializer/fastjson.html',
              },
              {
                title: 'custom',
                link: '/zh-cn/aggdocs/tutorial/serializer/custom.html',
              }
            ],
          },
          {
            title: '注册中心支持',
            children: [
              {
                title: '说明',
                link: '/zh-cn/aggdocs/tutorial/registry/index.html',
              },
              {
                title: 'direct',
                link: '/zh-cn/aggdocs/tutorial/registry/direct.html',
              },
              {
                title: 'nacos',
                link: '/zh-cn/aggdocs/tutorial/registry/nacos.html',
              },
              {
                title: 'zookeeper',
                link: '/zh-cn/aggdocs/tutorial/registry/zookeeper.html',
              },
              {
                title: 'custom',
                link: '/zh-cn/aggdocs/tutorial/registry/custom.html',
              }
            ],
          },
        ],
      },
      {
        title: '运维指南',
        children: [
          {
            title: '版本升级指南',
            link: '/zh-cn/aggdocs/ops/upgrade.html',
          },
          {
            title: 'server部署',
            children: [
              {
                title: '部署说明',
                link: '/zh-cn/aggdocs/ops/server/index.html',
              },
              {
                title: '部署示例',
                link: '/zh-cn/aggdocs/ops/server/deploy.html',
              },
            ]
          },
          {
            title: 'dashboard部署',
            children: [
              {
                title: '部署说明',
                link: '/zh-cn/aggdocs/ops/dashboard/index.html',
              },
              {
                title: '部署示例',
                link: '/zh-cn/aggdocs/ops/dashboard/deploy.html',
              },
            ]
          },
          {
            title: 'dashboard使用手册',
            link: '/zh-cn/aggdocs/ops/dashboard/dashboard-guild.html',
          },
        ],
      },
      {
        title: '社区',
        children: [
          {
            title: '社区',
            link: '/zh-cn/aggdocs/community/community.html',
          },
          {
            title: '开发者',
            link: '/zh-cn/aggdocs/community/aggregate-framework-dev.html',
          },
        ],
      },
    ],
    barText: 'AGG文档',
  },
};
