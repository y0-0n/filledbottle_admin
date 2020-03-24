import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));

const routes = [
	{ path: '/admin/main/home', name: '홈', component: Home},
];

export default routes;
