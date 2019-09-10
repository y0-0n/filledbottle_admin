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
          url: '/404',
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
          name: '고객 목록',
          url: '/main/customer/list',
          icon: 'icon-puzzle',
        },
        {
          name: '고객 분석',
          url: '/404',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '상품',
      url: '/main/product',
      icon: 'icon-speedometer',
      children: [
        {
          name: '상품 목록',
          url: '/main/product/list',
          icon: 'icon-puzzle',
        },
        {
          name: '상품 분석',
          url: '/404',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '재고',
      url: '/main/stock',
      icon: 'icon-speedometer',
    },
  ],
};
