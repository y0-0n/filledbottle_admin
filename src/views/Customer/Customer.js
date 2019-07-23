import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.form = {

    }
  }
  componentWillMount() {
    this.findCustomer();
  }

  findCustomer() {
    fetch("http://localhost:4000/customer", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})})
  }

  addCustomer(form) {
    const {name, delegate, telephone, cellphone, address} = this.form;
    fetch("http://localhost:4000/customer", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, delegate, telephone, cellphone, address
      })
    })
      .then(response => response.json())
      .then(data => {console.warn(data); this.findCustomer()});
  }

  deleteCustomer(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch("http://localhost:4000/customer", {
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
        .then(data => {console.warn(data); this.findCustomer()});
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="4" xs="12" sm="6">
          <Form onSubmit={(e) => {e.preventDefault(); this.addCustomer(this.form)}}>
            <FormGroup>
              <Card>
                <CardHeader>
                  거래처 추가하기
                </CardHeader>
                <CardBody>
                  <Label>거래처명</Label>
                  <Input onChange={(e) => this.form.name=e.target.value} />
                  <Label>대표자명</Label>
                  <Input onChange={(e) => this.form.delegate=e.target.value} />
                  <Label>전화번호</Label>
                  <Input onChange={(e) => this.form.telephone=e.target.value}/>
                  <Label>핸드폰번호</Label>
                  <Input onChange={(e) => this.form.cellphone=e.target.value}/>
                  <Label>주소</Label>
                  <Input onChange={(e) => this.form.address=e.target.value}/>
                </CardBody>
                <CardFooter>
                  <Button block outline color="primary">추가하기</Button>
                </CardFooter>
              </Card>
            </FormGroup>
          </Form>
        </Col>
        {
          data.map(function (e) {
          return (
            <Col key={e.id} md="4" xs="12" sm="6">
              <Card>
                <CardHeader>
                  {e.name}
                </CardHeader>
                <CardBody>
                  <div>{e.delegate}</div>
                  <div>{e.telephone}</div>
                  <div>{e.cellphone}</div>
                  <div>{e.address}</div>
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>주문 조회하기</Button>
                </CardBody>
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deleteCustomer(e.id)}>거래처 삭제하기</Button>
                </CardFooter>
              </Card>
            </Col>)
          }.bind(this))
        }
        </Row>
      </div>
    )
  }
}

export default Customer;
