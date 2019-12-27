import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Table } from 'reactstrap';
import '../../../css/Table.css';

class RegisterDetail extends Component {
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
        if (status === 200)
          this.setState({ data: data[1][0] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  componentWillMount() {
    this.getDetail();
  }
  
  render() {
    const data = this.state.data;
    return (
        <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>회원 정보</Col>
                <Col></Col><Col></Col><Col></Col>
                <Col><Button block color="primary" onClick={() => {this.props.history.push(`/main/register/edit`)}}>회원정보수정</Button></Col>
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
        </Row>
      </div>
    );
  }
}

export default RegisterDetail;