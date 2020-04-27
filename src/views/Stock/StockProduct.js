import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Nav, NavItem, NavLink } from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
			useFamilyData: [],
			familyData: [],
      userCategoryData: [],
      category: 1,
      addFamilyList: [],
      deleteFamilyList: [],
			categoryData: [],
			plant: this.props.match.params.id,
      modify: false,
    };
  }
  
  componentWillMount() {
		this.getUserFamilyCategory();
		this.getUseFamily();
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
								this.getProductFamily();
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

  getUseFamily() {//취급 품목 불러오기
    fetch(process.env.REACT_APP_HOST+"/api/product/familyInPlant/"+this.state.plant, {
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
				this.setState({useFamilyData: data[1]});
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

  modifyUseFamily() {
		const {addFamilyList, deleteFamilyList, plant} = this.state;
		fetch(process.env.REACT_APP_HOST + "/api/product/modifyFamilyInPlant", {
      method: 'POST',
      headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify(
        {
          addFamilyList, deleteFamilyList, plant
        }
      )    })
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
					this.getUseFamily();
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
			this.getProductFamily();
    });
  }

  addList(list, e) {
    if(this.state.modify){
			if(!list.includes(e)) list.push(e)
			else list.splice(list.indexOf(e),1)
			this.forceUpdate();
		} else {

		}
  }

  render() {
		const { familyData, userCategoryData, useFamilyData} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>취급 품목</Col>
                  <Col>
                  <div style={{float : "right"}}>
                    {this.state.modify ? <Button block color="success" onClick={() => {this.modifyUseFamily()}}>저장하기</Button> : <Button block color="primary" onClick={() => {this.setState({modify: true})}}>편집하기</Button>}
                  </div>
                </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  {userCategoryData.map((e, i) => {
                    return <NavItem key={i}>
                      <NavLink href="#" onClick={() => this.tabClick(e.id)}>{e.name}</NavLink>
                    </NavItem>
                  })}
                </Nav>
                <div>
                  <ul className="ul-productFamily" style={{ listStyleType: "none" }}>
                    {familyData.map((e, i) => {
										
										const f = (element) => element.family_id === e.familyUserId
										const f2 = (element) => element.familyUserId === e.familyUserId
										
										return (
                      <li key={i} className="list-productFamily" style={{
                        color: useFamilyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f2) === -1 ? 'black': '#fff': this.state.deleteFamilyList.findIndex(f2) !== -1 ? 'black': '#fff',
                        backgroundColor: useFamilyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f2) === -1 ? '#fff': '#20A8D8': this.state.deleteFamilyList.findIndex(f2) !== -1 ? '#fff': '#20A8D8', 
                        borderColor: useFamilyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f2) === -1 ? 'lightgray': '': this.state.deleteFamilyList.findIndex(f2) !== -1 ? 'lightgray': '',
                        float: "left", margin: "10px", width: "calc((100% - 20px) / 6)", border: "1px solid lightgray", borderRadius: "10px", padding: "5px", textAlign: "center"
                      }} 
                      onClick={() => {useFamilyData.findIndex(f) === -1 ? this.addList(this.state.addFamilyList, e) : this.addList(this.state.deleteFamilyList, e);
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
