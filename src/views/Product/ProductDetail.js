import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Label } from 'reactstrap';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    this.findProduct();
  }

  findProduct() {
    fetch(process.env.REACT_APP_HOST+"/product/"+this.props.match.params.id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data: data[0]})});
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
        .then(_ => {this.findProduct()});
    }
  }

  render() {
      console.warn(this.state)
    //var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              상품 상세
            </CardHeader>
            <CardBody>
              <Row>
                <Label>상품명 :&nbsp;</Label>
                <Label>{this.state.data.name}</Label>
              </Row>
              <Row>
              <Label>단가 :&nbsp;</Label>
              <Label>{this.state.data.price_shipping}</Label>
              </Row>
              <Row>
              <Label>무게 :&nbsp;</Label>
              <Label>{this.state.data.weight}</Label>
              </Row>
              <Row>
              <Label>등급 :&nbsp;</Label>
              <Label>{this.state.data.grade}</Label>
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

export default ProductDetail;