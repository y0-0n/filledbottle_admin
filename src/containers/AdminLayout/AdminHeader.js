import React, { Component } from 'react';
//import { Link, NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
//import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
//import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import _fetch from '../../fetch';
import logo from '../../assets/img/brand/logo.JPG'
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
    _fetch('/api/auth/info', 'GET', null, (data) => {
      this.setState({data: data[0]})
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
        <AppNavbarBrand href={"#/admin/main/home"}
          full={{ src: logo, width: 89, alt: 'BNBN Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/admin/users/list" className="nav-link" >회원 목록</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/admin/farm/list" className="nav-link" >농장 목록</NavLink>
          </NavItem>
					<NavItem className="px-3">
            <NavLink to="/admin/product/list" className="nav-link" >품목 목록</NavLink>
          </NavItem>
					<NavItem className="px-3">
            <NavLink to="/admin/suggestion/list" className="nav-link" >건의 사항</NavLink>
          </NavItem>
					<NavItem className="px-3">
            <NavLink to="/main/home/" className="nav-link" >서비스로 이동</NavLink>
          </NavItem>
        </Nav>
				<Nav className="ml-auto" navbar>
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
