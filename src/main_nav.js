export default {
  items: [
    {
      name: '홈',
      url: '/main/home',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'It\'s Home',
      },
    },
    {
      name: '주문',
      url: '/main/sales/list',
      icon: 'icon-puzzle',
    },
    {
      name: '고객',
      url: '/main/customer/list',
      icon: 'icon-puzzle',
    },
    {
      name: '상품',
      url: '/main/product/list',
      icon: 'icon-puzzle',
    },
    {
      name: '재고',
      url: '/main/stock',
      icon: 'icon-speedometer',
    },
    {
      name: '분석',
      url: '/main/analysis',
      icon: 'icon-speedometer',
      children: [
        {
          name: '분석 1',
          url: '/main/analysis/1',
          icon: 'icon-puzzle',
        },
        {
          name: '분석 2',
          url: '/main/analysis/2',
          icon: 'icon-puzzle',
        },
      ]
    },
  ],
};
