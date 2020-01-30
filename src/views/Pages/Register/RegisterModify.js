import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Table } from 'reactstrap';


class RegisterModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[]]
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
        if (status === 200){
          this.setState({ data: data[1][0] });
          this.form = {
            name: data[1][0].name,
            email: data[1][0].email,
            phone: data[1][0].phone,
            address: data[1][0].addreses,
            crNumber: data[1][0].crNumber,
          }      
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  modifyInfo(e){
    e.preventDefault();
    
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
                    <th>주소</th>
                    <td colSpan="3">
                      <Input defaultValue={data.address} onChange={(e) => this.form.address=e.target.value}/>
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