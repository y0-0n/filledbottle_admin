import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.form = {
      email: '',
      password: ''
    };
    this.logout();
  }
  logout() {
    localStorage.removeItem('token');
  }

  login(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_HOST+"/api/auth/login", {
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
      let status = data[0], token = data[1].token;
      if(status === 200) {
        localStorage.setItem('token', token);
        this.props.history.push('/');
      } else {
        alert('아이디 혹은 비밀번호가 잘못됐습니다.');
      }
    });
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>로그인</h1>
                    <p className="text-muted">이메일 계정으로 로그인</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="email" onChange={(e) => this.form.email=e.target.value} placeholder="e-mail" autoComplete="username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" onChange={(e) => this.form.password=e.target.value} placeholder="password" autoComplete="current-password" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={this.login.bind(this)} color="primary" className="px-4">로그인</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">비밀번호 분실</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>회원가입</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>지금 가입하기</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
