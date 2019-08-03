import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Label } from 'reactstrap';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    this.findCustomer();
  }

  findCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer/"+this.props.match.params.id, {
      method: 'GET',
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
    //var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              거래처 상세
            </CardHeader>
            <CardBody>
              <Row>
                <Label>거래처명 :&nbsp;</Label>
                <Label>{this.state.data.name}</Label>
              </Row>
              <Row>
              <Label>대표 :&nbsp;</Label>
              <Label>{this.state.data.delegate}</Label>
              </Row>
              <Row>
              <Label>전화번호 :&nbsp;</Label>
              <Label>{this.state.data.telephone}</Label>
              </Row>
              <Row>
              <Label>HP :&nbsp;</Label>
              <Label>{this.state.data.cellphone}</Label>
              </Row>
              <Row>
              <Label>주소 :&nbsp;</Label>
              <Label>{this.state.data.address}</Label>
              </Row>
              <Row>
              <Label>담당자 :&nbsp;</Label>
              <Label>{this.state.data.manager}</Label>
              </Row>
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