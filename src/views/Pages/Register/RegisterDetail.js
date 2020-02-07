import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table, Nav, NavItem, NavLink } from 'reactstrap';

class RegisterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
			data: [[]],
			plantData: [],
			allFamilyData: [],
      familyData: [],
      topCategory : "fruit",
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
	
  getPlantList() {
    fetch(process.env.REACT_APP_HOST+"/api/plant", {
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
      if(status === 200)
        this.setState({plantData: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}
	
  getAllFamily() {
    fetch(process.env.REACT_APP_HOST+"/api/product/allFamily", {
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
      if(status === 200)
        this.setState({allFamilyData: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

	getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList", {
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
  
  tabClick(topCategory) {
    this.setState({
      topCategory,
    }, () => {
    });
  }
	
  componentWillMount() {
		this.getDetail();
		this.getPlantList();
		this.getAllFamily();
		this.getProductFamily();
  }
  
  render() {
    const {data, plantData, allFamilyData, familyData} = this.state;
    return (
			<div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/RegisterDetail.css"></link>
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>회원 정보</Col>
                <Col>
                  <div style={{float : "right"}}>
                    <Button block color="primary" onClick={() => {this.props.history.push(`/main/register/edit`)}}>회원정보수정</Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table className="ShowTable">
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>
                      {data.name}
                    </td>
                    <th>아이디</th>
                    <td>
                      {data.email}
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      {data.phone}
                    </td>
                    <th>사업자등록번호</th>
                    <td>
                      {data.crNumber}
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
                      {data.address}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

				<Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>창고</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table className="ShowTable">
                <thead>
                  <tr>
                    <th>이름</th>
                  </tr>
                </thead>
								<tbody>
									{plantData.map((e, i) => {
										return (<tr>
											<td>{e.name}</td>
										</tr>)}
									)}
								</tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

				<Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>카테고리</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink active={this.state.topCategory === "fruit"} onClick={() => this.tabClick("fruit")} href="#">과일</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.topCategory === "grocery"} onClick={() => this.tabClick("grocery")} href="#">채소</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.topCategory === "rice"} onClick={() => this.tabClick("rice")} href="#">쌀/잡곡</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.topCategory === "egg"} onClick={() => this.tabClick("egg")} href="#">계란/축산품</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={this.state.topCategory === "seafood"} onClick={() => this.tabClick("seafood")} href="#">수산물/해산물</NavLink>
                </NavItem>
              </Nav>
              <div style={{justifyContent: "center"}}>
                <ul className="ul-productFamily" style={{listStyleType: "none", display: "inline-block"}}>
                  {}
                  {allFamilyData.map((e, i) => {
                    console.log(e)
							  		const f = (element) => element.id === e.id
										return (
											<li className="list-productFamily" style={{color: familyData.findIndex(f) === -1 ? 'black': '#2E9AFE'}}>{e.name}</li>
                    )}
                    
									)}
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>

        </Row>
      </div>
    );
  }
}

export default RegisterDetail;