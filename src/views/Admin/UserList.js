import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Table, } from 'reactstrap';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList : 
      [{id: 1, name: '정소원', email: 'soso@soso.com', phone: '010-8888-9999', address: '전남여수시안산동 부영아파트', crNumber: '12345667'},
      {id: 2, name: 'sisi', email: 'sssiiisi@soso.com', phone: '010-8998-9912', address: '전남여수시 학동 101', crNumber: '1222667'},
      ]
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                회원 목록
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr style={{backgroundColor: "#F5F5F5"}}>
                      <th>#</th>
                      <th>이름</th>
                      <th>아이디( 이메일 )</th>
                      <th>전화번호</th>
                      <th>주소</th>
                      <th>사업자 등록번호</th>
                    </tr>
                      {
                        this.state.userList.map((e, i) => {
                          return <tr key={i} onClick={() => {this.props.history.push('/admin/users/detail')}}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>{e.address}</td>
                            <td>{e.crNumber}</td>
                          </tr>
                        })
                      }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default UserList;

