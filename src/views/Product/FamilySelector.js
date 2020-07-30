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
    this.setState({
      category,
    }, () => {
			this.getAllFamily();
    });
  }

  childFunction = () => {
    this.props.parentFunction(this.state.category, this.state.productFamily);
  }

  componentWillMount() {
		this.getAllFamily();
		this.getFamilyCategory();
  }

  render() {
    const {allFamilyData, categoryData } = this.state;
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/Create copy.css"></link>
        <div className="form-card">
          <div className="form-title">품목군</div>
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
                  const f = (element) => element.id === e.id
                  return (
                    <li key={i} className="list-productFamily" style={this.state.productFamily === e.id ? {backgroundColor: "#20A8D8", color: "#fff"} : null}
                    onDoubleClick={()=> {this.setState({productFamily : e.id})}} onClick={this.childFunction}>{e.name}</li>
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