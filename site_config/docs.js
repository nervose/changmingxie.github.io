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
            title: 'dashboard',
            link: '/zh-cn/docs/ops/upgrade.html',
          },
        ],
      },
    ],
    barText: '文档',
  },
};
