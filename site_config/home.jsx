import React from 'react';

export default {
  'zh-cn': {
    brand: {
      brandName: 'TCC-TRANSACTION',
      briefIntroduction: '是一款开源的微服务架构下的TCC型分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。',
      buttons: [
        {
          text: '立即开始',
          link: '/zh-cn/docs/what-is-tcctransaction.html',
          type: 'primary',
        },
        {
          text: '查看Github',
          link: 'https://github.com/changmingxie/tcc-transaction',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'TCC-TRANSACTION',
      desc: '是一款开源的微服务架构下的TCC型分布式事务解决方案，致力于提供高性能和简单易用的分布式事务服务。',
      img: '/img/tcc-invoke.webp',
    },
    features: {
      title: '特性一览',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: '微服务框架支持',
          content: '目前已支持dubbo、openFeign、grpc等',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: 'embedded模式',
          content: '此种模式，客户端事件及任务操作，直接访问存储，当前已支持存储类型有: memory、rocksdb、jdbc、redis、shard redis、redis-cluster',
        },
        {
          img: '/img/feature_service.png',
          title: 'server模式',
          content: '此模式，客户端通过server来进行事件和任务操作，相比之前配置更简洁',
        },
        {
          img: '/img/feature_hogh.png',
          title: 'dashboard',
          content: '支持事件和任务的可视化操作',
        },
        // {
        //   img: '/img/feature_runtime.png',
        //   title: 'server',
        //   content: '特性5的简单概括',
        // },
        // {
        //   img: '/img/feature_maintenance.png',
        //   title: '特性6',
        //   content: '特性6的简单概括',
        // },
      ],
    },
    // start: {
    //   title: '快速开始',
    //   desc: '简单描述',
    //   img: '/img/quick_start.png',
    //   button: {
    //     text: '阅读更多',
    //     link: '/zh-cn/docs/tutorial/quickstart.html',
    //   },
    // },
    users: {
      title: '用户',
      desc: <span>请在 <a rel="noopener noreferrer" target="_blank"
                        href="https://github.com/changmingxie/tcc-transaction/issues/366">谁在使用tcc-transaction</a> 上提供信息，来帮助我们做的更好。</span>,
      list: [
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
      ],
    },
  },
  'en-us': {
    brand: {
      brandName: 'brandName',
      briefIntroduction: 'some description of product',
      buttons: [
        {
          text: 'Quick Start',
          link: '/en-us/docs/demo1.html',
          type: 'primary',
        },
        {
          text: 'View on Github',
          link: '',
          type: 'normal',
        },
      ],
    },
    introduction: {
      title: 'introduction title',
      desc: 'some introduction of your product',
      img: '/img/architecture.png',
    },
    features: {
      title: 'Feature List',
      list: [
        {
          img: '/img/feature_transpart.png',
          title: 'feature1',
          content: 'feature description',
        },
        {
          img: '/img/feature_loadbalances.png',
          title: 'feature2',
          content: 'feature description',
        },
        {
          img: '/img/feature_service.png',
          title: 'feature3',
          content: 'feature description',
        },
        {
          img: '/img/feature_hogh.png',
          title: 'feature4',
          content: 'feature description',
        },
        {
          img: '/img/feature_runtime.png',
          title: 'feature5',
          content: 'feature description',
        },
        {
          img: '/img/feature_maintenance.png',
          title: 'feature6',
          content: 'feature description',
        }
      ]
    },
    start: {
      title: 'Quick start',
      desc: 'some description text',
      img: '/img/quick_start.png',
      button: {
        text: 'READ MORE',
        link: '/en-us/docs/demo1.html',
      },
    },
    users: {
      title: 'users',
      desc: <span>some description</span>,
      list: [
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
        '/img/users_alibaba.png',
      ],
    },
  },
};
