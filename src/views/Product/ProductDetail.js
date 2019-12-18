import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge } from 'reactstrap';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.getProduct();
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST+"/product/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then(data => {this.setState({data: data[0]})});
  }

  deactivateProduct(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/product/deactivate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(_ => {this.getProduct()});
    }
  }

  activateProduct(id) {
    let c = window.confirm('이 상품을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/product/activate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
      })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if (status === 200)
          this.getProduct()
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
          <Card>
            <CardHeader>
              <Row>
                <Col>제품 상세</Col>
                <Col></Col><Col></Col>
                <Col><Button  onClick={() => {this.props.history.push(`/main/product/edit/${this.props.match.params.id}`)}}>수정</Button></Col>
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
                    <th style={{width: '10%'}} className="TableRight">상품명</th>
                    <td style={{width: '40%'}}>
                      {data.name}
                    </td>
                  </tr>
                  <tr>
                    <th>등급</th>
                    <td className="TableRight">
                      {data.grade}
                    </td>
                    <th>상태</th>
                    <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                  </tr>
                  <tr>
                    <th>무게</th>
                    <td>
                      {data.weight}
                    </td>
                    <th>판매 단가</th>
                    <td className="TableRight">
                      {data.price_shipping}
                    </td>
                  </tr>
                  <tr>
                  </tr>
                    
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Row>
                <Col>
                {
                  data.set ? 
                  <Button block style={{ width: 120 }} color="ghost-danger" onClick={() => this.deactivateProduct(this.props.match.params.id)}>상품 비활성화</Button> : 
                  <Button block style={{ width: 100 }} color="ghost-primary" onClick={() => this.activateProduct(this.props.match.params.id)}>상품 활성화</Button>
                }
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
        </Row>
      </div>
    )
  }
}

export default ProductDetail;