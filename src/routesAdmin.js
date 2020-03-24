import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));
const SuggestionList = React.lazy(() => import('./views/Admin/Suggestion/List'));
const SuggestionDetail = React.lazy(() => import('./views/Admin/Suggestion/Detail'));
const UserList = React.lazy(() => import('./views/Admin/UserList'));
const UserListDetail = React.lazy(() => import('./views/Admin/UserListDetail'));
const ProductList = React.lazy(() => import('./views/Admin/ProductList'));

const routes = [
	{ path: '/admin/main/home', name: '홈', component: Home},
	{ path: '/admin/users/list', name: '회원 목록', component: UserList},
	{ path: '/admin/users/detail', name: '회원 목록 상세', component: UserListDetail},
	{ path: '/admin/product/list', name: '품목 목록', component: ProductList},
	{ path: '/admin/suggestion/list', name: '건의사항', component: SuggestionList},
	{ path: '/admin/suggestion/detail/:id', name: '건의사항 답변', component: SuggestionDetail},

];

export default routes;
