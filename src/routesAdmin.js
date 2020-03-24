import React from 'react';

const Home = React.lazy(() => import('./views/Admin/Home/Home'));
const SuggestionList = React.lazy(() => import('./views/Admin/Suggestion/List'));
const SuggestionDetail = React.lazy(() => import('./views/Admin/Suggestion/Detail'));
const UserList = React.lazy(() => import('./views/Admin/Users/List'));
const UserListDetail = React.lazy(() => import('./views/Admin/Users/Detail'));
const ProductList = React.lazy(() => import('./views/Admin/Products/List'));

const routes = [
	{ path: '/admin/home', name: '홈', component: Home},
	{ path: '/admin/users/list', name: '회원 목록', component: UserList},
	{ path: '/admin/users/detail/:id', name: '회원 목록 상세', component: UserListDetail},
	{ path: '/admin/product/list', name: '품목 목록', component: ProductList},
	{ path: '/admin/suggestion/list', name: '건의사항', component: SuggestionList},
	{ path: '/admin/suggestion/detail/:id', name: '건의사항 답변', component: SuggestionDetail},

];

export default routes;
