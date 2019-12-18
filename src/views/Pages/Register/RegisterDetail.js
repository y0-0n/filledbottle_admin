import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Table } from 'reactstrap';
import '../../../css/Table.css';

class RegisterDetail extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      email: '',
      password: '',
      phone: '',      address: '',
      crNumber:'',
    }
  }

  componentWillMount() {
  }
  
  render() {
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
                    </td>
                    <th>아이디</th>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                    </td>
                    <th>사업자등록번호</th>
                    <td>
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
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