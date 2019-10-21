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
      address: ''
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
                        <InputGroupText>#&nbsp;</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.phone=e.target.value} placeholder="전화번호" autoComplete="phone" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-home"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" onChange={(e) => this.form.address=e.target.value} placeholder="주소" autoComplete="address" />
                    </InputGroup>
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
