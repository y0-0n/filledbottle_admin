import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table } from 'reactstrap';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    this.getCustomer();
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {this.setState({data: data[0]})});
  }

  deleteCustomer(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/customer", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(_ => {this.findCustomer()});
    }
  }

  render() {
    let {data} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>거래처 상세</Col>
                <Col></Col><Col></Col>
                <Col><Button  onClick={() => {this.props.history.push(`/main/customer/edit/${this.props.match.params.id}`)}}>수정</Button></Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Table className="ShowTable">
                <tbody>
                  <tr>
                    <th style={{width: '10%'}}>사진</th>
                    <td style={{width: '40%'}}>
                      <img style={{width: '90%'}} alt="제품 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                    </td>
                    <th style={{width: '10%'}}>고객명</th>
                    <td style={{width: '40%'}}>
                      {data.name}
                    </td>
                  </tr>
                  <tr>
                    <th>핸드폰번호</th>
                    <td>
                      {data.cellphone}
                    </td>
                    <th>전화번호</th>
                    <td>
                      {data.telephone}
                    </td>
                  </tr>
                  <tr>
                    <th style={{width: '12%'}}>사업자등록번호</th>
                    <td>
                      {data.address}
                    </td>
                    <th>주소</th>
                    <td>
                      {data.address}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
            </CardFooter>
          </Card>
        </Col>
        </Row>
      </div>
    )
  }
}

export default CustomerDetail;