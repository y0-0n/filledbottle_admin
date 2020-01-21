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
      crNumber:'',
    }
  }

  componentWillMount() {
  }

  signup() {
    if(this.form.password !== this.passwordCheck) {
      alert('비밀번호와 비밀번호 반복이 일치하는지 확인해주세요');
      return;
    }

    fetch(process.env.REACT_APP_HOST+"/api/auth/signup", {
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
        if(status === 422) {
          let {errors} = data[1];
          console.log(errors)
          errors.map(function (e, _) {
            switch(e.param) {
              case 'email' : alert('이메일을 확인해주세요'); break;
              case 'password' : alert('비밀번호를 확인해주세요'); break;
              case 'name' : alert('성명을 확인해주세요'); break;
              default: break;
            }
            return null;
          })
          return ;
        } else if (status === 400) {
          alert('이미 존재하는 이메일 계정입니다.');
          return ;
        } else if (status === 500) {
          alert('회원가입을 실패했습니다.');
          return ;
        }
        alert('성공적으로 회원가입 됐습니다.');
        this.props.history.push('/login');
      });
  }
  
  sample6_execDaumPostcode() {
    new window.daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R'){
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                // 조합된 참고항목을 해당 필드에 넣는다.
                document.getElementById("sample6_extraAddress").value = extraAddr;
            
            } else {
                document.getElementById("sample6_extraAddress").value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>회원가입</h1>
                    <p className="text-muted">정보를 입력하세요</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.name=e.target.value} placeholder="이름" autoComplete="username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.email=e.target.value} placeholder="아이디" autoComplete="email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(e) => this.form.password=e.target.value} placeholder="비밀번호" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" onChange={(e) => this.passwordCheck=e.target.value} placeholder="비밀번호 반복" autoComplete="new-password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.crNumber=e.target.value} placeholder="사업자등록번호" autoComplete="crNumber" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>#&nbsp;</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.phone=e.target.value} placeholder="전화번호" autoComplete="phone" />
                    </InputGroup>
										<InputGroup style={{width: '60%'}} className="mb-3">
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
                    <Button color="success" onClick={this.signup.bind(this)} block>가입하기</Button>
                  </Form>
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
        </Container>
      </div>
    );
  }
}

export default Register;
