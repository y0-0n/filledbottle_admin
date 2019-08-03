import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.form = {

    }
  }
  componentWillMount() {
    this.findProduct();
  }

  findProduct() {
    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})})
  }

  addProduct(form) {
    //const {name} = form;
    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {console.warn(data); this.findProduct()});
  }

  deleteProduct(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/product", {
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
        .then(data => {this.findProduct()});
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="4" xs="12" sm="6">
          <Form onSubmit={(e) => {e.preventDefault(); this.addProduct(this.form)}}>
            <FormGroup>
              <Card>
                <CardHeader>
                  제품 추가하기
                </CardHeader>
                <CardBody>
                  <Label>제품명</Label>
                  <Input onChange={(e) => this.form.name=e.target.value} />
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
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>제품 상세보기</Button>
                </CardBody>
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deleteProduct(e.id)}>제품 삭제하기</Button>
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

export default Product;
