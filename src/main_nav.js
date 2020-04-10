export default {
  items: [
    {
      name: '홈 화면',
      url: '/main/home',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '달력',
      },
    },
    {
      name: '주문 관리',
      url: '/main/sales/list',
      icon: 'icon-puzzle',
    },
    {
      name: '품목 관리',
      url: '/main/product/list',
      icon: 'icon-puzzle',
    },
    {
      name: '고객 관리',
      url: '/main/customer/list',
      icon: 'icon-puzzle',
    },
		{
      name: '재고 관리',
      url: '/main/stock',
      icon: 'icon-speedometer',
    },
		{
      name: '영농 일지',
      url: '/main/produce',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '1차',
      },
    },
    {
      name: '식품 가공',
      url: '/main/manufacture',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '2차',
      },
		},
    /*{
      name: '체험 관광',
      url: '/main/activity',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '3차',
      },
    },*/
    /*{
      name: '분석',
      url: '/main/analysis',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: '준비중',
      },
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
		},*/
		{
      name: '경영 관리',
      url: '/main/manage',
      icon: 'icon-speedometer',
      children: [
        {
          name: '재고',
          url: '/main/manage/stock',
          icon: 'icon-puzzle',
        },
      ]
    },
    {
      name: '건의사항',
      url: '/main/suggestions',
      icon: 'icon-speedometer',
    },
    {
      name: '설문조사',
      url: '/main/survey',
      icon: 'icon-speedometer',
    },
  ],
};
