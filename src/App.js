import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import './css/Font.css';
import ScrollToTop from './ScrollToTop';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));
const AdminLayout = React.lazy(() => import('./containers/AdminLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Logout = React.lazy(() => import('./views/Pages/Login/Logout'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Landing = React.lazy(() => import('./views/LandingPage/LandingPage'));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <ScrollToTop/>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
            <Route exact path="/logout" name="Logout Page" render={props => <Logout {...props}/>} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
						<Route path="/admin" name="Admin Page" render={props => <AdminLayout {...props}/>} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            <Route exact path="/" name="Landing Page" render={props => <Landing {...props}/>} />
            <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
