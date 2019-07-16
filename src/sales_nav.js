export default {
  items: [
    {
      name: '영업 홈',
      color: 'white',
      url: '/sales',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'It\'s Home',
      },
    },
    {
      name: '견적',
      url: '/sales/1',
      icon: 'icon-speedometer',
      children: [
        {
          name: '견적서 입력',
          url: '/sales/1/1',
          icon: 'icon-puzzle',
        },
        {
          name: '견적서 조회',
          url: '/sales/1/2',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '주문',
      url: '/sales/2',
      icon: 'icon-speedometer',
      children: [
        {
          name: '입력',
          url: '/sales/2/1',
          icon: 'icon-puzzle',
        },
        {
          name: '조회',
          url: '/sales/2/2',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '판매',
      url: '/sales/3',
      icon: 'icon-speedometer',
      children: [
        {
          name: '입력',
          url: '/sales/3/1',
          icon: 'icon-puzzle',
        },
        {
          name: '조회',
          url: '/sales/3/1',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '출하',
      url: '/sales/4',
      icon: 'icon-speedometer',
      children: [
        {
          name: '입력',
          url: '/sales/4/1',
          icon: 'icon-puzzle',
        },
        {
          name: '조회',
          url: '/sales/4/2',
          icon: 'icon-puzzle',
        },
      ]
    },
  ],
};
