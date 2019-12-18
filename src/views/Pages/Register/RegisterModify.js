import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row,Table } from 'reactstrap';
import '../../../css/Table.css';

class RegisterModify extends Component {
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
                <Col>회원 정보 수정</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table className="ShowTable">
                <tbody>
                  <tr>
                    <th>이름</th>
                    <td>
                        <Input/>
                    </td>
                    <th>아이디</th>
                    <td>
                        <Input/>
                    </td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>
                        <Input/>
                    </td>
                    <th>사업자등록번호</th>
                    <td>
                        <Input/>
                    </td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">
                        <Input/>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Row>
                <Col>
                    <Button block color="primary" onClick={() => {}}>수정하기</Button>
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