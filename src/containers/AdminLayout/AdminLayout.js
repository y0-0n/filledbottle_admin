import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  // AppAside,
  // AppFooter,
  AppHeader,
  // AppSidebar,
  // AppSidebarFooter,
  // AppSidebarForm,
  // AppSidebarHeader,
  // AppSidebarMinimizer,
  // AppBreadcrumb2 as AppBreadcrumb,
  // AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import main_nav from '../../main_nav';

// routes config
import routes from '../../routesAdmin';

const AdminHeader = React.lazy(() => import('./AdminHeader'));

class AdminLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  /*loadNav(pathname) {
    const page = pathname.split('/')[1];
    switch(page) {
      case "dashboard" : return navigation;
      case "sales" : return sales_nav;
      case "stock" : return stock_nav;
      default : return main_nav;
    }
  }*/

  render() {
    return (
      <div className="app">
				<AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <AdminHeader {...this.props} onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
					<main className="main" style={{marginLeft: 0}}>
            {/*<AppBreadcrumb appRoutes={routes} router={router}/>*/}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
										console.warn(route)
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/admin" to="/admin/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
				</div>
      </div>
    );
  }
}

export default AdminLayout;
