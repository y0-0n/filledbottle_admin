import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Table } from 'reactstrap';


class RegisterModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[]]
    }
  }

  sample6_execDaumPostcode() {
    new window.daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }
            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                //document.getElementById("sample6_extraAddress").value = extraAddr;
								addr += extraAddr;
            } else {
                //document.getElementById("sample6_extraAddress").value = '';
            }
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
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
        if (status === 200){
          this.setState({ data: data[1][0] });
          this.form = {
            name: data[1][0].name,
            email: data[1][0].email,
            phone: data[1][0].phone,
            address: data[1][0].addreses,
            crNumber: data[1][0].crNumber,
          }
          console.warn(data[1])
          document.getElementById("sample6_address").value = data[1][0].address;
          document.getElementById("sample6_detailAddress").value = data[1][0].addressDetail;
          document.getElementById("sample6_postcode").value = data[1][0].postcode;  
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  modifyInfo(e){
    e.preventDefault();
		this.form.address = document.getElementById("sample6_address").value+" "+document.getElementById("sample6_detailAddress").value;
		this.form.postcode = document.getElementById("sample6_postcode").value;
    
    let c = window.confirm('회원정보를 수정하시겠습니까?')
    console.log(this.form)
    if(c) {
      fetch(process.env.REACT_APP_HOST+"/api/auth/info", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',  
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(this.form)
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
        if(status === 200) {
          alert('수정됐습니다.');
          this.props.history.push('/main/registerdetail');
        } else {
          alert('수정에 실패했습니다.');
        }
      });
    }
  }

  componentWillMount() {
    this.getDetail();
  }
  
  render() {
    const data = this.state.data;

    return (
        <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/RegisterDetail.css"></link>
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>회원 정보 수정</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table className="ShowTable">
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>
                        <Input defaultValue={data.name} onChange={(e) => this.form.name=e.target.value}/>
                    </td>
                    <th>아이디</th>
                    <td>
                        <Input defaultValue={data.email} onChange={(e) => this.form.email=e.target.value}/>
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                      <Input defaultValue={data.phone} onChange={(e) => this.form.phone=e.target.value}/>
                    </td>
                    <th>사업자등록번호</th>
                    <td>
                      <Input defaultValue={data.crNumber} onChange={(e) => this.form.crNumber=e.target.value}/>
                    </td>
                  </tr>
                  <tr>
                    <th>계좌번호</th>
                    <td colSpan="3">
                      <Input defaultValue={data.AccountNumber} onChange={(e) => this.form.AccountNumber=e.target.value}/>
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
                      <Row style={{marginBottom: '10px'}}>
                        <Col lg="6" md="6" sm="6">
                          <InputGroup required>
                            <Input type="text" id="sample6_postcode" placeholder="우편번호" readOnly/>                            
                            <InputGroupAddon addonType="append">
                              <Button block color="primary" onClick={() => {this.sample6_execDaumPostcode()}}>우편번호찾기</Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row style={{marginBottom: '10px'}}>
                        <Col>
                          <Input type="text" id="sample6_address" placeholder="주소" readOnly/>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6" md="6" sm="6" style={{paddingRight: '0px'}}>
                          <Input type="text" id="sample6_detailAddress" placeholder="상세주소"/>
                        </Col>
                      </Row>
                      {/* <Input defaultValue={data.address} onChange={(e) => this.form.address=e.target.value}/> */}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Row>
                <Col>
                    <Button block color="primary" onClick={this.modifyInfo.bind(this)}>수정하기</Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterModify;