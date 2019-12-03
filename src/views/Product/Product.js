import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input, CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Switch from "../Switch/Switch";

/*

  GET /product/state

  -> this.state.data

  id : 주문 번호
  name : 상품명
  grade : 등급
  weight : 무게
  price_shipping : 단가

*/

const listCount = 5;

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      number: 1,
      keyword: 'a',
      show: true,
      set: true
    };
    this.form = {

    }
  }
  componentWillMount() {
    this.getProduct();
  }

  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/product/total/"+(this.state.set ? '' : 'unset/')+this.state.keyword, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
      })
      .then(response => {
        if(response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if(status === 200) {
          this.setState({total: Math.ceil(data[1][0].total/listCount)})
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST+"/product/"+(this.state.set ? '' : 'unset/')+this.state.number+'/'+this.state.keyword, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  deleteProduct(id) {
    let c = window.confirm('이 상품을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/product", {
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
          this.getCustomer()
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
    }
  }

  activateProduct(id) {
    let c = window.confirm('위 상품을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/product", {
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
          this.getUnsetCustomer()
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
    }
  }

  searchProduct() {
    this.getProduct();
  }

  changeShow() {
    this.setState({show: !this.state.show})
  }

  changeSet() {
    this.setState({set: !this.state.set}, () => {
      this.getProduct();
    });
  }

  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getProduct();
    });
  }

  render() {
    var data = this.state.data;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">

        <Row className="mb-5">
          <Col md="8" xs="6" sm="6">
            <Input onChange={(e) => { this.setState({ keyword: e.target.value }) }} />
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={() => { this.searchProduct() }}>상품 검색</Button>
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={() => { this.props.history.push('/product/create'); }}>상품 등록하기</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>상품 보기</Col>
                  <Col></Col><Col></Col>
                  <Col>
                    {this.state.set ?
                      "비활성화 상품 보기" :
                      "활성화 상품 보기"
                    }
                      <Switch id='1' isOn={this.state.set} handleToggle={this.changeSet.bind(this)} />
                  </Col>
                  <Col>
                    {this.state.show ?
                      "카드로 보기" :
                      "리스트로 보기"
                    }<Switch id='2' isOn={this.state.show} handleToggle={() => this.changeShow()} />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              {this.state.show ?
                  <div style={{ overflow: 'scroll' }}>
                    <Table style={{ minWidth: 600 }} hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>상품명</th>
                          <th>등급</th>
                          <th>무게</th>
                          <th>단가</th>
                          {this.state.set ?
                            <th>상품 비활성화</th> :
                            <th>상품 활성화</th>
                          }
                          <th>수정</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((e, i) => {
                          return (<tr style={{ cursor: 'pointer' }} key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.grade}</td>
                            <td>{e.weight}</td>
                            <td>{e['price_shipping']}</td>
                            {this.state.set ?
                              <td>
                                <Button block style={{ width: 120 }} color="ghost-danger" onClick={() => this.deleteProduct(e.id)}>상품 비활성화</Button>
                              </td> :
                              <td>
                                <Button block style={{ width: 100 }} color="ghost-primary" onClick={() => this.activateProduct(e.id)}>상품 활성화</Button>
                              </td>
                            }
                            <td><Button  onClick={() => {this.props.history.push(`/main/product/edit/:id`)}}>수정</Button></td>
                          </tr>)
                        })}
                      </tbody>
                    </Table>
                  </div>
                :
                  <Row>
                    {data.map(function (e) {
                      return (
                        <Col key={e.id} lg="4" md="6" xs="12" sm="12">
                          <Card>
                            <CardHeader>
                              {e.name}
                            </CardHeader>
                            <CardImg top width="100%" src={e.file_name ? "http://211.62.225.216:4000/static/" + e.file_name : '318x180.svg'} alt="Card image cap" />
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
              }
              </CardBody>
              <CardFooter>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.number-1)}}/>
                  </PaginationItem>
                  {this.state.number === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.state.number === 2 ? arr.forEach(x => arr1.push(x+1)) : null}   
                  {this.state.number !== 1 && this.state.number!== 2 ? arr.forEach(x => arr1.push(x)) :null }    
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.state.number+e)
                    return (<PaginationItem key={i} active={this.state.number === this.state.number+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.state.number+e)}}>
                      {this.state.number+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.state.number+1)}}/>
                  </PaginationItem>
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Product;
