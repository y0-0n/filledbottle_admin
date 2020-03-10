import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Nav, NavItem, NavLink } from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
			allFamilyData: [],
			familyData: [],
      userCategoryData: [],
      category: 1,
      addFamilyList: [],
      deleteFamilyList: [],
      categoryData: [],
    };
  }
  componentWillMount() {
    this.getUserFamilyCategory();
    this.getAllFamily();
  }

  getUserFamilyCategory() {
		fetch(process.env.REACT_APP_HOST + "/api/product/userFamilyCategory", {
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
					if(data[1].length !== 0) {
						this.setState({ userCategoryData: data[1],
							category: data[1][0].id }, () => {
								this.getAllFamily();
							});
					} else {
						alert('없음')
					}
					
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
				this.getProductFamily();
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }
  
  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList/"+this.state.category, {
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
          this.setState({ familyData: data[1] });
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }


  addList(list, e) {
    if(!list.includes(e)) list.push(e)
    else list.splice(list.indexOf(e),1)
    this.forceUpdate();
  }

  render() {
    const { familyData, userCategoryData, allFamilyData, categoryData } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>취급 품목</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  {userCategoryData.map((e, i) => {
                    return <NavItem key={i}>
                      <NavLink href="#">{e.name}</NavLink>
                    </NavItem>
                  })}
                </Nav>
                <div>
                  <ul className="ul-productFamily" style={{ listStyleType: "none" }}>
                    {allFamilyData.map((e, i) => {
                    const f = (element) => element.id === e.id
										return (
                      <li key={i} className="list-productFamily" style={{
                        color: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? 'black': '#fff': this.state.deleteFamilyList.findIndex(f) !== -1 ? 'black': '#fff',
                        backgroundColor: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? '#fff': '#20A8D8': this.state.deleteFamilyList.findIndex(f) !== -1 ? '#fff': '#20A8D8', 
                        borderColor: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? 'lightgray': '': this.state.deleteFamilyList.findIndex(f) !== -1 ? 'lightgray': '',
                        float: "left", margin: "10px", width: "calc((100% - 20px) / 6)"
                      }} 
                      onClick={() => {familyData.findIndex(f) === -1 ? this.addList(this.state.addFamilyList, e) : this.addList(this.state.deleteFamilyList, e);
                      }}>{e.name}</li>
                    )}
									)}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Detail;
