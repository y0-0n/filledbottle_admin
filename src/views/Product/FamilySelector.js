import React, { Component } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import _fetch from '../../fetch';

class familySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 1,
      productFamily: 0,
      categoryData: [],
      allFamilyData: [],
    }
  }

  componentDidMount() {
		this.getAllFamily();
		this.getFamilyCategory();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.getAllFamily();
    }
  }

  getFamilyCategory() {
    _fetch("/api/product/familyCategory", "GET", null, (data) => {
      this.setState({ categoryData: data });
    });
  }
  
  getAllFamily() {
    _fetch("/api/product/allFamily/"+this.state.category, "GET", null, (data) => {
      this.setState({allFamilyData: data});
    });
  }

  tabClick(category) {
    this.setState({category});
  }

  passStateToParent = () => {
    this.props.receiveStateFromChild(this.state.category, this.state.productFamily);
  }

  scrollToNext() {
    var location = document.querySelector("#section2").offsetTop;
    window.scrollTo({top:location, behavior:'smooth'});
  }

  render() {
    const {allFamilyData, categoryData } = this.state;
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/Create copy.css"></link>
        <div className="form-card">
          <div className="form-title">품목군 <span style={{color : "#FA5858"}}>*</span></div>
          <div className="form-innercontent" style={{overflow: 'hidden'}}>
            <Nav tabs>
              {categoryData.map((e,i) => {
                return <NavItem key={i}>
                <NavLink active={this.state.category === e.id} onClick={() => this.tabClick(e.id)} href="#">{e.name}</NavLink>
              </NavItem>
              })}
            </Nav>
            <div>
              <ul className="ul-productFamily" style={{listStyleType: "none",}}>
                {allFamilyData.map((e, i) => {
                  return (
                    <li key={i} className="list-productFamily" style={this.state.productFamily === e.id ? {backgroundColor: "#20A8D8", color: "#fff"} : null}
                    onClick={()=> {this.setState({productFamily : e.id}, () => {
                      this.passStateToParent(); this.scrollToNext();
                    })}}>{e.name}</li>
                    )}
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default familySelector;