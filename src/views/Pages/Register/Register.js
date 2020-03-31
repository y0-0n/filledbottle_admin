/*global daum*/
import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      crNumber: '',
      checks : [],
    }
    this.state = {
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.checkChecks()
  }

  signup() {
    if (this.form.password !== this.passwordCheck) {
      alert('비밀번호와 비밀번호 반복이 일치하는지 확인해주세요');
      return;
		}
		//주소 띄어쓰기 생기는 부분
    this.form.address = document.getElementById("sample6_address").value + " " + document.getElementById("sample6_detailAddress").value;
    this.form.postcode = document.getElementById("sample6_postcode").value;

    fetch(process.env.REACT_APP_HOST + "/api/auth/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.form)
    })
      .then(response => {
        return Promise.all([response.status, response.json()]);
      })
      .then(data => {
        let status = data[0];
        if (status === 422) {
          let { errors } = data[1];
          console.log(errors)
          errors.map(function (e, _) {
            switch (e.param) {
              case 'email': alert('이메일을 확인해주세요'); break;
              case 'password': alert('비밀번호를 확인해주세요'); break;
              case 'name': alert('성명을 확인해주세요'); break;
              default: break;
            }
            return null;
          })
          return;
        } else if (status === 400) {
          alert('이미 존재하는 이메일 계정입니다.');
          return;
        } else if (status === 500) {
          alert('회원가입을 실패했습니다.');
          return;
        }
        alert('성공적으로 회원가입 됐습니다.');
        this.props.history.push('/login');
      });
  }

  sample6_execDaumPostcode() {
    new window.daum.Postcode({
      oncomplete: function (data) {
        var addr = ''; // 주소 변수
        var extraAddr = ''; // 참고항목 변수
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          if (extraAddr !== '') {
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

  checkChecks(){
    if(this.form.checks[0] === true && this.form.checks[1] === true && this.form.checks[2] === true){
      this.enableBtn();
    }
    else document.getElementById('button_joinus').disabled = true;
  }

  enableBtn(){
    document.getElementById('button_joinus').disabled = false;
  }

  render() {
    this.form.checks = [false,false,false];
    return (
      <div className="app align-items-center">
        <link rel="stylesheet" type="text/css" href="css/Register.css"></link>
        <Container>
          <Form>
            <Row className="justify-content-center">
              <Col md="12" lg="7" xl="6">
                <Card style={{ height: '700px' }}>
                  <CardBody className="p-4">
                    <h1>약관</h1>
                    <h4 className="text-muted">서비스 이용 약관</h4>
                    <div style={{ height: '120px', overflow: 'scroll' }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div style={{ float: 'right' }}>
                      <Input type='checkbox' onClick={() => {
                            let {checks} = this.form;
                            checks[0] = !checks[0];
                            this.checkChecks();
                        }}/>
                      <p>서비스 이용약관 동의하기</p>
                    </div><br></br><hr></hr>
                    <h4 className="text-muted">개인정보 취급방침</h4>
                    <div style={{ height: '120px', overflow: 'scroll' }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div style={{ float: 'right' }}>
                      <Input type='checkbox' onClick={() => {
                            let {checks} = this.form;
                            checks[1] = !checks[1];
                            this.checkChecks();
                        }}/>
                      <p>개인정보 취급방침 동의하기</p>
                    </div><br></br><hr></hr>
                    <h4 className="text-muted">전자금융거래 이용 약관</h4>
                    <div style={{ height: '120px', overflow: 'scroll' }}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div style={{ float: 'right' }}>
                      <Input type='checkbox' onClick={() => {
                            let {checks} = this.form;
                            checks[2] = !checks[2];
                            this.checkChecks();
                        }}/>
                      <p>전자금융거래 이용약관 동의하기</p>
                    </div><br></br>
                  </CardBody>
                </Card>
              </Col>
              <Col md="12" lg="7" xl="6">
                <Card style={{ height: '700px' }}>
                  <CardBody className="p-4">
                    <h1>회원가입</h1>
                    <p className="text-muted">정보를 입력하세요</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.name = e.target.value} placeholder="이름" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.email = e.target.value} placeholder="아이디" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(e) => this.form.password = e.target.value} placeholder="비밀번호" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(e) => this.passwordCheck = e.target.value} placeholder="비밀번호 반복" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.crNumber = e.target.value} placeholder="사업자등록번호" autoComplete="crNumber" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>#&nbsp;</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.phone = e.target.value} placeholder="전화번호" autoComplete="phone" />
                    </InputGroup>
                    <InputGroup style={{ width: '60%' }} className="mb-3">
                      <Input type="text" id="sample6_postcode" placeholder="우편번호" />
                      <InputGroupAddon addonType="append">
                        <Button block color="primary" onClick={() => { this.sample6_execDaumPostcode() }}>우편번호찾기</Button>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Input className="mr-2" type="text" id="sample6_address" placeholder="주소" />
                      <Input type="text" id="sample6_detailAddress" placeholder="상세주소" />
                    </InputGroup>

                    {/*<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-home"></i>
											</InputGroupText>
											</InputGroupAddon>
										<Input type="text" onChange={(e) => this.form.address=e.target.value} placeholder="주소" autoComplete="address" />*/}
                    <Button color="success" id="button_joinus" disabled ="" onClick={this.signup.bind(this)}block>가입하기</Button>
                  </CardBody>
                  <CardFooter className="p-4">
                    {/*<Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>*/}
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
