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
      url: '/main/sales',
      icon: 'icon-speedometer',
      children: [
        {
          name: '주문 목록',
          url: '/main/sales/list',
          icon: 'icon-puzzle',
        },
        {
          name: '주문 분석',
          url: '/main/sales/a',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '고객',
      url: '/main/customer',
      icon: 'icon-speedometer',
      children: [
        {
          name: '고객 조회',
          url: '/main/customer/list',
          icon: 'icon-puzzle',
        },
        {
          name: '고객 분석',
          url: '/main/customer/a',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '제품',
      url: '/main/product',
      icon: 'icon-speedometer',
    },
    {
      name: '공장',
      url: '/main/plant',
      icon: 'icon-speedometer',
    },
    {
      name: '재고 관리',
      url: '/main/stock/edit',
      icon: 'icon-speedometer',
    },
  ],
};
