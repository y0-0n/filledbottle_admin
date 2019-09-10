import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sData: [],
      keyword: ''
    };
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


  deleteProduct(id) {
    let c = window.confirm('이 상품을 삭제하시겠습니까?')
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

  searchProduct() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  render() {
    var data = this.state.search ? this.state.sdata : this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
            <Col md="10" xs="10" sm="10">
              <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}/>
            </Col>
            <Col md="2" xs="2" sm="2">
              <Button block color="primary" onClick={()=> {this.searchProduct()}}>제품 검색</Button>
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

        <Row className="mb-5">
          <Col md="10" xs="10" sm="10" />
          <Col md="2" xs="2" sm="2">
            <Button block color="primary" onClick={()=> {this.props.history.push('/product/create');}}>제품 등록하기</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Product;
