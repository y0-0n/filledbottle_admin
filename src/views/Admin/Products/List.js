import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Nav, NavItem, NavLink} from 'reactstrap';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[]],
			allFamilyData: [],
			familyData: [],
			categoryData: [],
      category : 1,
      productData: [],
      page : '',
    };
  }

  componentWillMount() {
    this.getAllFamily();
    this.getFamilyCategory();
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
					//이 부분 나중에 콜백으로 바꾸기
					this.setState({
						addFamilyList: [],
						deleteFamilyList: [],
						modify: false
					}, () => {
					});
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }
  
  tabClick(category) {
    this.setState({
      category,
    }, () => {
			this.getAllFamily();
    });
  }

  render() {
    const { allFamilyData, categoryData, } = this.state;
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ProductList.css"></link>
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                품목 목록
              </CardHeader>
              <CardBody>
                <div>
                  <Nav tabs>
                    {categoryData.map((e, i) => {
                      return <NavItem key={i}>
                        <NavLink active={this.state.category === e.id} onClick={() => this.tabClick(e.id)} href="#">{e.name}</NavLink>
                      </NavItem>
                    })}
                  </Nav>
                  <div>
                    <ul className="ul-productFamily " style={{ listStyleType: "none", }}>
                      {allFamilyData.map((e, i) => {
                        return (
                          <li key={i} className="list-productFamily"
                            style={{ backgroundColor: this.state.page === e.name ? "#20A8D8": "",
                            color: this.state.page === e.name ? "#fff": "",
                            borderColor: this.state.page === e.name ? "": "lightgray" }}
                            onClick={() => {
                              this.setState({ page : e.name })
                            }}>{e.name}</li>
                        )
                      }
                      )}
                    </ul>
                  </div>
                </div>
              </CardBody>
              <hr></hr>
              <CardBody>
                <div>
                  {this.state.page}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default ProductList;

