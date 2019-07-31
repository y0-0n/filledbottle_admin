import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sdata: [],
      search: false
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

  searchCustomer() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  render() {
    var data = this.state.search ? this.state.sdata : this.state.data;
    return (
      <div className="animated fadeIn">

        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Button block color="primary" onClick={()=> {this.props.history.push('/customer/create');}}>거래처 추가하기</Button>
          </Col>
        </Row>

        <Row className="mb-5">
            <Col md="10" xs="10" sm="10">
              <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}/>
            </Col>
            <Col md="2" xs="2" sm="2">
              <Button block color="primary" onClick={()=> {this.searchCustomer()}}>거래처 검색</Button>
            </Col>
        </Row>

        <Row>
        {
          data.map(function (e) {
          return (
            <Col key={e.id} md="4" xs="12" sm="6">
              <Card>
                <CardHeader>
                  {e.name}
                </CardHeader>
                <CardBody>
                  {/*<div>{e.delegate}</div>
                  <div>{e.telephone}</div>
                  <div>{e.cellphone}</div>
                  <div>{e.address}</div>*/}
                  <Button block outline color="primary" onClick={() => {this.props.history.push("/customer/"+e.id)}}>거래처 상세보기</Button>
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
