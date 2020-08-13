import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, Row, Table } from 'reactstrap';
import _fetch from '../../../fetch';
// const employee = [
//   {
//       name: '정소원',
//       department: '개발부',
//       position: '부장',
//       cellphone: '01012353512',
//   },
//   {
//     name: '강주희',
//     department: '영업부',
//     position: '사원',
//     cellphone: '01023672958',
//   },
// ]

class RegisterDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      companyData: {},
			plantData: [],
			familyInPlantData: [],
			allFamilyData: [],
			familyData: [],
			categoryData: [],
      category : 1,
      addFamilyList: [],
			deleteFamilyList: [],
      modify: false,//편집 모드 flag
      family: 1,
      productData: [],
      prohibitDelete: false,
      plant : 1,
      deletePlantList: [],
      employee: [[]],
      cardShow : true,
      storeImg: '',
      storeName: '민수의 농장'
    }
  }

  getUserDetail() {
    _fetch("/api/auth/info", "GET", null, (data) => {
      this.setState({ userData: data[0] });
    })
  }
  
  getCompanyDetail() {
    _fetch('/api/company/info', "GET", null, (data) => {
      this.setState({ companyData: data[0] });
    })
  }
	
  getPlantList() {
    _fetch("/api/plant", "GET", null, (data) => {
      this.setState({plantData: data});
    })
	}
	
	addPlant() {
    const plantName = this.newPlant
    _fetch("/api/plant/", "POST", {plantName}, (data) => {
      this.getPlantList();
      alert('추가되었습니다.');
      window.location.reload();
    })
	}

	deactivatePlant(plant) {
    _fetch("/api/plant/deactivate/"+plant.id, "PUT", null, (data) => {
      window.location.reload();
    })
  }

  tabClick(category) {
    this.setState({category});
  }
	
  componentDidMount() {
    this.getUserDetail();
    this.getCompanyDetail();
		this.getPlantList();
  }

  componentDidUpdate(prevProps, prevState) {
  }

  // toggleList (list, e) {
	// 	if(this.state.modify){
  //     if(list === this.state.deleteFamilyList) {
  //       this.getProduct()
  //       .then((result) => {
  //         if(result){
  //           if(!list.includes(e)) list.push(e)
  //           else list.splice(list.indexOf(e),1)
  //           this.forceUpdate();
  //         }
  //       })
  //     }
  //     else {
  //       if(!list.includes(e)) list.push(e)
  //       else list.splice(list.indexOf(e),1)
  //       this.forceUpdate();
  //     }
	// 	} else {

  //   }
  // }
  
  // async getProduct() {
  //   const {family, category} = this.state;
  //   let result = false;
  //   await fetch(process.env.REACT_APP_HOST + "/product/list", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify(
  //       {
  //         name: '', page: 'all', family, category
  //       }
  //     )
  //   })
  //     .then(response => {
  //       if (response.status === 401) {
  //         return Promise.all([401])
  //       } else {
  //         return Promise.all([response.status, response.json()]);
  //       }
  //     })
  //     .then(data => {
  //       let status = data[0];
  //       if (status === 200)
  //         this.setState({ productData: data[1] }, () => {
  //           console.warn(this.state.productData.length)
  //           if(this.state.productData.length){
  //             alert("품목이 존재함으로 삭제할 수 없습니다.");
  //             result = false;
  //           }
  //           else {
  //             result = true;
  //           }
  //         });
  //       else {
  //         alert('로그인 하고 접근해주세요');
  //         this.props.history.push('/login');
  //       }
  //     })
  //   return result;
  // }

  getDiffDate(dateInput) {
    var d = new Date(dateInput);
    var todayDate = new Date();
    var diffDate = Math.ceil((d.getTime()-todayDate.getTime())/(1000*3600*24));

    return diffDate;
  }

  render() {
    const {userData, companyData, plantData, } = this.state;
    // console.warn(userData, companyData)
    return (
			<div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/RegisterDetail.css"></link>
        <Row>
          <Col>
            {/* {this.state.cardShow ? 
            <div className="vaildity-card">
            <div>
              <p className="close-button" style={{cursor : 'pointer'}} onClick={()=> {this.setState({cardShow: false})}}>X</p>
              <p className="vaildity-content">
                부농부농 서비스를 이용할 수 있는 기간이 <span style={{color: "lightblue"}}>{this.getDiffDate(data.expiration)}</span> 일 남았습니다
                <br/>
                연장하기 버튼을 눌러 이용기간을 연장해주세요. 
              </p>
              <Button color="primary" onClick={() => {this.props.history.push(`/main/pay`)}}>연장하기</Button>
            </div>
          </div>
          : null} */}
            
          </Col>
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
                        {userData.name}
                      </td>
                      <th>아이디</th>
                      <td>
                        {userData.email}
                      </td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>
                        {companyData.phone}
                      </td>
                      <th>사업자등록번호</th>
                      <td>
                        {companyData.crNumber}
                      </td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>
                        {companyData.address} {companyData.addressDetail} ({companyData.postcode})
                      </td>
                      <th>계좌번호</th>
                      <td>
                        {companyData.accountName} {companyData.accountNumber}
                      </td>
                    </tr>
                    <tr>
                      <th>상점 이름</th>
                      <td style={{textAlign: 'center'}}>
                        <p>{companyData.name}</p>
                      </td>
                      <th>상점 사진</th>
                      <td>
                        <img style={{width: '500px'}} alt="품목 사진" src={companyData.file_name ? process.env.REACT_APP_HOST+"/static/" + companyData.file_name : '318x180.svg'} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>직원 관리</Col>
                  <Col>
                    <div style={{float : "right"}}>
                      <Button block color="primary" onClick={() => {this.props.history.push(`/main/register/create`)}}>직원추가</Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>부서</th>
                      <th>직원명</th>
                      <th>직책</th>
                      <th>전화번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.map((e, i) => {
                      return (<tr>
                        <td className="list-hidden">{i+1}</td>
                        <td>{e.department}</td>
                        <td className="list-hidden">{e.name}</td>
                        <td>{e.position}</td>
                        <td>{e.cellphone}</td>
                      </tr>)
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}

          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>창고</Col>
                  <div style={{float: "right"}}>
                    <Col>
                    <InputGroup>
                      <Input placeholder="새 창고명" onChange={(e) => { this.newPlant = e.target.value }} />
                      <InputGroupAddon addonType="append">
                        <Button block color="primary" onClick={() => { this.addPlant() }}>추가</Button>
                      </InputGroupAddon>
                    </InputGroup>
                    </Col>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table style={{textAlign: 'center'}}>
                  <thead>
                    <tr>
                      <th>창고명</th>
                      {/* <th>저장 품목군</th> */}
                      <th style={{width: '20%'}}>삭제</th>
                      {/*<th>저장량</th>*/}
                    </tr>
                  </thead>
                  <tbody>
                    {plantData.map((e, i) => {
                      return (<tr key={i}>
                        <td>{e.name}</td>
                        {/* <td>
                        {
                        this.state.familyInPlantData[i] !== undefined ?
                          this.state.familyInPlantData[i].map((e, i) => {
                          return e.name
                        }) : null}
                        </td> */}
                        <td style={{textAlign:"center"}}>{this.state.familyInPlantData[i] !== undefined && this.state.familyInPlantData[i].length === 0 ?
                          <Button color="danger" onClick={() => {
                            this.deactivatePlant(e)
                          }}>X</Button> :
                          <Button color="danger" disabled>X</Button>  
                        }</td>
                      </tr>)}
                    )}
                    <tr>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>취급 품목</Col>
                  <Col>
                    <div style={{float : "right"}}>
                      {this.state.modify ? <Button block color="success" onClick={() => {this.modifyFamily()}}>저장하기</Button> : <Button block color="primary" onClick={() => {this.setState({modify: true})}}>편집하기</Button>}
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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
                        <li key={i} className="list-productFamily" style={{
                          color: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? 'black': '#fff': this.state.deleteFamilyList.findIndex(f) !== -1 ? 'black': '#fff',
                          backgroundColor: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? '#fff': '#20A8D8': this.state.deleteFamilyList.findIndex(f) !== -1 ? '#fff': '#20A8D8', 
                          borderColor: familyData.findIndex(f) === -1 ? this.state.addFamilyList.findIndex(f) === -1 ? 'lightgray': '': this.state.deleteFamilyList.findIndex(f) !== -1 ? 'lightgray': ''
                        }} 
                        onClick={() => {
                          this.setState({family: e.id}, () => {
                            familyData.findIndex(f) === -1 ? this.toggleList(this.state.addFamilyList, e) : this.toggleList(this.state.deleteFamilyList, e);
                          });
                          
                        }}>{e.name}</li>
                        )}
                        )}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col> */}

        </Row>
      </div>
    );
  }
}

export default RegisterDetail;