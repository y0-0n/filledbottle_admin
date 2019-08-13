export default {
    items: [
      {
        name: '재고 홈',
        color: 'white',
        url: '/stock',
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'It\'s Home',
        },
      },
      {
        name: '재고 관리',
        url: '/stock/edit',
        icon: 'icon-speedometer',
      },
      {
        name: '재고',
        url: '/stock/2',
        icon: 'icon-speedometer',
        children: [
          {
            name: '입력',
            url: '/stock/1/1',
            icon: 'icon-puzzle',
          },
          {
            name: '조회',
            url: '/stock/1/2',
            icon: 'icon-puzzle',
          },
        ]
      },
    ],
  };
  