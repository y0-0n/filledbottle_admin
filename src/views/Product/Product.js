import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input, CardTitle, CardSubtitle } from 'reactstrap';

/*

  GET /product/state

  -> this.state.data

  id : 주문 번호
  name : 상품명
  grade : 등급
  weight : 무게
  price_shipping : 단가

*/

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sData: [],
      keyword: '',
    };
    this.form = {

    }
  }
  componentWillMount() {
    this.getProduct();
  }

  getProduct() {
    this.setState({search: false, set: true});
    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if(response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if(status === 200)
          this.setState({data: data[1]});
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  getUnsetProduct() {
    this.setState({search: false, set: false});
    fetch(process.env.REACT_APP_HOST+"/product/unset", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      let status = data[0];
      if(status === 200)
        this.setState({data: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    })
  }


  deleteProduct(id) {
    let c = window.confirm('이 상품을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/product", {
        method: 'DELETE',
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
        .then(data => {this.getProduct()});
    }
  }

  activateProduct(id) {
    let c = window.confirm('위 상품을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/product", {
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
        .then(data => {console.warn(data); this.getUnsetProduct()});
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
          <Col md="8" xs="6" sm="6">
            <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}/>
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={()=> {this.searchProduct()}}>상품 검색</Button>
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={()=> {this.props.history.push('/product/create');}}>등록하기</Button>
          </Col>
            {this.state.set ?
              <Col md="2" xs="3 " sm="3">
                <Button block color="primary" onClick={()=> {this.getUnsetProduct()}}>비활성화 상품 보기</Button>
              </Col> :
              <Col md="2" xs="3 " sm="3">
                <Button block color="primary" onClick={()=> {this.getProduct()}}>활성화 상품 보기</Button>
              </Col> 
            }
        </Row>

        <Row>
        {
          data.map(function (e) {
            return (
              <Col key={e.id} lg="4" md="6" xs="12" sm="12">
                <Card>
                  <CardHeader>
                    {e.name}
                  </CardHeader>
                  <CardImg top width="100%" src={e.file_name ? "http://211.62.225.216:4000/static/"+e.file_name : '318x180.svg'} alt="Card image cap"/>
                  <CardBody>
                    <CardTitle><h3>상품명 : {e.name}</h3></CardTitle>
                    <CardSubtitle><h4>등급 : {e.grade}</h4></CardSubtitle>
                    <CardSubtitle><h4>무게 : {e.weight}</h4></CardSubtitle>
                    <CardSubtitle><h4>단가 : {e['price_shipping']}</h4></CardSubtitle>
                    <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>상품 분석</Button>
                  </CardBody>
                  {this.state.set ?
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deleteProduct(e.id)}>상품 비활성화</Button>
                </CardFooter> :
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.activateProduct(e.id)}>상품 활성화</Button>
                </CardFooter>
              }
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
