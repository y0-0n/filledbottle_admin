import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
//import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    }
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST+"/api/auth/info", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if (status === 200)
          this.setState({ data: data[1][0] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  componentWillMount() {
    this.getDetail();
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { data } = this.state;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/main" className="nav-link" >메인 메뉴</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/sales/order" className="nav-link" >주문 생성</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/customer/create" className="nav-link" >고객 등록</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/product/create" className="nav-link" >품목 등록</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/manufacture/create" className="nav-link" >제조 등록</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/produce/create" className="nav-link" >생산 등록</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/activity/create" className="nav-link" >관광 등록</NavLink>
          </NavItem>
          {/*<NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem>*/}
        </Nav>
        <Nav className="ml-auto" navbar>
          {/*<NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>*/}
          <h5>{data.name} 님</h5>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="icon-user"></i>
              {/*<img src={'/assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />*/}
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem>
                <NavItem className="d-md-down-none">
                  <NavLink to="/main/registerdetail" className="nav-link"><i className="icon-user"></i>회원정보</NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                <NavItem className="d-md-down-none">
                  <NavLink to="/main/setting" className="nav-link"><i className="icon-puzzle"></i>환경설정</NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem>
                <NavItem className="d-md-down-none">
                  <NavLink to="/login" className="nav-link"><i className="icon-lock"></i>로그아웃</NavLink>
                </NavItem>
              </DropdownItem>
              {/*<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
            </DropdownMenu>
        </AppHeaderDropdown>
        </Nav>
        {/*<AppAsideToggler className="d-md-down-none" />*/}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
