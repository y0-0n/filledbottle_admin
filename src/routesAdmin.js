import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));
const SuggestionList = React.lazy(() => import('./views/Admin/Suggestion/List'));
const SuggestionDetail = React.lazy(() => import('./views/Admin/Suggestion/Detail'));

const routes = [
	{ path: '/admin/main/home', name: '홈', component: Home},
	{ path: '/admin/suggestion/list', name: '건의사항', component: SuggestionList},
	{ path: '/admin/suggestion/detail/:id', name: '건의사항 답변', component: SuggestionDetail},

];

export default routes;
