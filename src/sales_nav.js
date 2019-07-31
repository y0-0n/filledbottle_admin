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
      name: '주문 추가',
      url: '/sales/order',
      icon: 'icon-speedometer',
    },
    {
      name: '주문',
      url: '/sales/2',
      icon: 'icon-speedometer',
      children: [
        {
          name: '입력',
          url: '/sales/1/1',
          icon: 'icon-puzzle',
        },
        {
          name: '조회',
          url: '/sales/1/2',
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
  ],
};
