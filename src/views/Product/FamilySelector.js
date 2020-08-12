import React, { Component } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';


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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.getAllFamily();
    }
  }

  getFamilyCategory() {
		fetch(process.env.REACT_APP_HOST + "/api/product/familyCategory", {
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
        if (status === 200){
          this.setState({ categoryData: data[1] });
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }
  
  getAllFamily() {
    fetch(process.env.REACT_APP_HOST+"/api/product/allFamily/"+this.state.category, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
			let status = data[0];
      if(status === 200){
				this.setState({allFamilyData: data[1]});
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

  tabClick(category) {
    this.setState({category});
  }

  passStateToParent = () => {
    this.props.receiveStateFromChild(this.state.category, this.state.productFamily);
  }

  componentWillMount() {
		this.getAllFamily();
		this.getFamilyCategory();
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