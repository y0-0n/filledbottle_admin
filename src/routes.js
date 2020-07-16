import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));



const Home = React.lazy(() => import('./views/Home/Home'));
const Sales = React.lazy(() => import('./views/Order'));
const Customer = React.lazy(() => import('./views/Customer'));
const CreateCustomer = React.lazy(() => import('./views/Customer/Create'));
const CustomerDetail = React.lazy(() => import('./views/Customer/Detail'));
const CustomerModify = React.lazy(() => import('./views/Customer/Modify'));
const CustomerUnset = React.lazy(() => import('./views/Customer/Unset'));
const Product = React.lazy(() => import('./views/Product'));
const ProductSecondary = React.lazy(() => import('./views/Product/ListSecondary'));
const ProductTertiary = React.lazy(() => import('./views/Product/ListTertiary'));
const CreateProduct = React.lazy(() => import('./views/Product/Create copy'));
const ProductDetail = React.lazy(() => import('./views/Product/Detail copy'));
const ProductModify = React.lazy(() => import('./views/Product/Modify copy'));
const ProductUnset = React.lazy(() => import('./views/Product/Unset'));
const CostCalculator = React.lazy(() => import('./views/Product/CostCal'));
const Plant = React.lazy(() => import('./views/Plant/Plant'));
const CreateOrder = React.lazy(() => import('./views/Order/Create'));
//const Stock = React.lazy(() => import('./views/Stock/Stock'));
const StockList = React.lazy(() => import('./views/Stock/ListIndex'));
const StockListDetail = React.lazy(() => import('./views/Stock/Detail'));
const Stock = React.lazy(() => import('./views/Stock'));
const StockDetail = React.lazy(() => import('./views/Stock/StockDetail'));
// const StockProduct = React.lazy(() => import('./views/Stock/StockProduct'));
const StockModify = React.lazy(() => import('./views/Stock/Modify'));
const StockDetailModify = React.lazy(() => import('./views/Stock/StockModify'));
const CreateStock = React.lazy(() => import('./views/Stock/CreateIndex'));
const StockTransport = React.lazy(() => import('./views/Stock/Transport'));
const OrderDetail = React.lazy(() => import('./views/Order/Detail'));
const OrderModify = React.lazy(() => import('./views/Order/Modify'));
const Transaction = React.lazy(() => import('./views/Order/Transaction'));
const Post = React.lazy(() => import('./views/Order/Post'));
const Suggestions = React.lazy(() => import('./views/Suggestions'));
const CreateSuggestions = React.lazy(() => import('./views/Suggestions/Create'));
const SuggestionsDetail = React.lazy(() => import('./views/Suggestions/Detail'));
const Manufacture = React.lazy(() => import('./views/Manufacture'));
const CreateManufacture = React.lazy(() => import('./views/Manufacture/Create'));
const ManufactureDetail = React.lazy(() => import('./views/Manufacture/Detail'));
const ManufactureModify = React.lazy(() => import('./views/Manufacture/Modify'));
const Produce = React.lazy(() => import('./views/Produce'));
const CreateProduce = React.lazy(() => import('./views/Produce/Create'));
const ProduceDetail = React.lazy(() => import('./views/Produce/Detail'));
const ProduceModify = React.lazy(() => import('./views/Produce/Modify'));
const Purchase = React.lazy(() => import('./views/Purchase/List'));
const CreatePurchase = React.lazy(() => import('./views/Purchase/Create'));
const Message = React.lazy(() => import('./views/Message/Message'));
const Activity = React.lazy(() => import('./views/Activity/List'));
const RegisterDetail = React.lazy(() => import('./views/Pages/Register/RegisterDetail'));
const RegisterModify = React.lazy(() => import('./views/Pages/Register/RegisterModify'));
const RegisterCreate = React.lazy(() => import('./views/Pages/Register/EmployeeCreate'));
const Survey = React.lazy(() => import('./views/Survey/Survey'));
const SurveyHome = React.lazy(() => import('./views/Survey/Home'));
const Setting = React.lazy(() => import('./views/Setting/Setting'));
const Income = React.lazy(() => import('./views/Income/Income'));
const Pay = React.lazy(() => import('./views/Pay/List'));
const ProductSales = React.lazy(() => import('./views/Performance/ProductSales'));
const CustomerSales = React.lazy(() => import('./views/Performance/CustomerSales'));
const DailySales = React.lazy(() => import('./views/Performance/DailySales'));
const Market = React.lazy(() => import('./views/Market'));
const MarketDetail = React.lazy(() => import('./views/Market/Detail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/main/home', name: '홈', component: Home},
  { path: '/main/sales/list', exact: true,  name: '주문', component: Sales},
  { path: '/main/customer/list', exact: true,  name: '고객 목록', component: Customer},
  { path: '/customer/create', exact: true,  name: '고객 등록', component: CreateCustomer},
  { path: '/main/customer/:id', exact: true,  name: '고객 상세정보', component: CustomerDetail},
  { path: '/main/customer/edit/:id', exact: true,  name: '고객 수정', component: CustomerModify},
  { path: '/main/customer/list/unset', exact: true,  name: '비활성화 고객 목록', component: CustomerUnset},
  { path: '/main/product/list/primary', exact: true,  name: '상품 목록', component: Product},
  { path: '/main/product/list/secondary', exact: true,  name: '상품 목록', component: ProductSecondary},
  { path: '/main/product/list/tertiary', exact: true,  name: '상품 목록', component: ProductTertiary},
  { path: '/main/product/:id', exact: true,  name: '상품 상세정보', component: ProductDetail},
  { path: '/main/product/edit/:id', exact: true,  name: '상품 수정', component: ProductModify},
  { path: '/product/create', exact: true,  name: '상품 등록', component: CreateProduct},
  { path: '/main/product/list/unset', exact: true,  name: '상품 등록', component: ProductUnset},
  { path: '/main/product/list/calculator', exact: true,  name: '상품 등록', component: CostCalculator},
  { path: '/main/plant', exact: true,  name: '공장', component: Plant},
  { path: '/sales/order', exact: true,  name: '주문', component: CreateOrder},
  { path: '/main/sales/order/:id', exact: true,  name: '주문 상세', component: OrderDetail},
  { path: '/main/order/edit/:id', exact: true,  name: '주문 수정', component: OrderModify},
  { path: '/main/order/transaction/:id', exact: true,  name: '거래 명세서', component: Transaction},
  { path: '/main/order/post/:id', exact: true,  name: '택배 송장', component: Post},
  { path: '/main/suggestions', exact: true,  name: '건의 사항', component: Suggestions},
  { path: '/main/suggestions/write', exact: true,  name: '글쓰기', component: CreateSuggestions},
  { path: '/main/suggestions/:id', exact: true,  name: '건의 내용', component: SuggestionsDetail},
  { path: '/main/manufacture', exact: true,  name: '제조', component: Manufacture},
  { path: '/manufacture/create', exact: true,  name: '제조 등록', component: CreateManufacture},
  { path: '/main/manufacture/:id', exact: true,  name: '제조 상세', component: ManufactureDetail},
  { path: '/main/manufacture/edit/:id', exact: true,  name: '제조 수정', component: ManufactureModify},
  { path: '/main/produce', exact: true,  name: '생산', component: Produce},
  { path: '/produce/create', exact: true,  name: '생산 등록', component: CreateProduce},
  { path: '/main/produce/:id', exact: true,  name: '생산 상세', component: ProduceDetail},
  { path: '/main/produce/edit/:id', exact: true,  name: '생산 수정', component: ProduceModify},
  { path: '/main/message', exact: true,  name: '메세지', component: Message},
  { path: '/main/activity', exact: true,  name: '관광', component: Activity},
  { path: '/main/registerdetail', exact: true,  name: '회원정보', component: RegisterDetail},
  { path: '/main/register/edit', exact: true,  name: '회원정보수정', component: RegisterModify},
  { path: '/main/register/create', exact: true,  name: '직원추가', component: RegisterCreate},
	{ path: '/main/setting', exact: true,  name: '설정', component: Setting},
  { path: '/main/stock', exact: true,  name: '재고 관리', component: Stock},
  { path: '/main/manage/stock/:stockId', exact: true,  name: '재고 내역', component: StockDetail},
  { path: '/main/manage/stock/edit/:stockId', exact: true,  name: '재고 수정', component: StockDetailModify},
	{ path: '/main/manage/stock/', exact: true,  name: '재고 관리', component: StockList},
	{ path: '/stock/create', exact: true,  name: '재고 등록', component: CreateStock},
	{ path: '/main/stock/:id', exact: true,  name: '재고 상세', component: StockListDetail},
	{ path: '/stock/edit/:id', exact: true,  name: '재고 실사', component: StockModify},
  { path: '/stock/transport', exact: true,  name: '재고 이동', component: StockTransport},
  // { path: '/stock/product/:id', exact: true,  name: '재고 품목', component: StockProduct},
  { path: '/main/purchase', exact: true,  name: '매입 관리', component: Purchase},
  { path: '/purchase/create', exact: true,  name: '매입 등록', component: CreatePurchase},
  { path: '/main/survey', exact: true,  name: '시행 중', component: Survey},
  { path: '/main/survey/home', exact: true,  name: '마케팅 검사', component: SurveyHome},
  { path: '/main/income', exact: true,  name: '손익 계산서', component: Income},
  { path: '/main/pay', exact: true,  name: '결제상품리스트', component: Pay},
  { path: '/main/performance/product', exact: true,  name: '월별 성과', component: ProductSales},
  { path: '/main/performance/customer', exact: true,  name: '월별 성과', component: CustomerSales},
  { path: '/main/performance/daily', exact: true,  name: '월별 성과', component: DailySales},
  { path: '/main/market', exact: true,  name: '매장 관리', component: Market},
  { path: '/main/market/:id', exact: true,  name: '매장 상세', component: MarketDetail},

  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
