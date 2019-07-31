export default {
  items: [
    {
      name: '홈',
      url: '/home',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'It\'s Home',
      },
    },
    {
      name: '거래처',
      url: '/customer',
      icon: 'icon-speedometer',
      children: [
        {
          name: '거래처 조회',
          url: '/customer/list',
          icon: 'icon-puzzle',
        },
        {
          name: '거래처 추가하기',
          url: '/customer/create',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '제품',
      url: '/product',
      icon: 'icon-speedometer',
    },
    {
      name: '공장',
      url: '/plant',
      icon: 'icon-speedometer',
    },
  ],
};
