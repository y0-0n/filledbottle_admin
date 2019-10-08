import React, { Component } from 'react';

import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, NavItem, Nav, NavLink, Table, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

/*

  GET /order/state

  -> this.state.orderData

  id : 주문 번호
  state : 주문 상태
  date : 출하 일자
  price : 주문 총액
  name : 고객 이름
  orderDate : 주문 일자

*/

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불'
}
const listCount = 5;

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "all",
      orderData: [],
      page: 1,
      sdata: [],
      search: false,
      number : 1,
      total: 0,
      keyword: 'a'
    };
  }

  componentWillMount() {
    if(this.props.location.state !== undefined) {
      this.setState({keyword: this.props.location.state.name}, () => {
        this.getOrder();
        this.getTotal();  
      });
    } else {
      this.getOrder();
      this.getTotal();
    }
  }

  getTotal() {
      fetch(process.env.REACT_APP_HOST+"/order/total/"+this.state.process+"/"+this.state.keyword, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.setState({total: Math.ceil(data[0].total/listCount)})
      });
  }

  getOrder() {
    fetch(process.env.REACT_APP_HOST+"/order/"+this.state.number+"/"+this.state.process+"/"+this.state.keyword, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(orderData => {this.setState({orderData})});
  }

  tabClick(process) {
    this.setState({
      process,
      number: 1
    }, () => {
      this.getTotal();
      this.getOrder();
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchCustomer() {
    this.getOrder();
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getOrder();
    });
  }

  render() {
    var data = this.state.search ? this.state.sdata : this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="8" xs="6" sm="6">
            <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}/>
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={()=> {this.searchCustomer()}}>고객 검색</Button>
          </Col>
          <Col md="2" xs="2" sm="2">
            <Button block color="primary" onClick={()=> {this.props.history.push('/sales/order');}}>주문 추가</Button>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <CardHeader>
                주문 보기
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink active={this.state.process === "all"} onClick={() => this.tabClick("all")} href="#">전체</NavLink>
                  </NavItem>
                  {/*<NavItem>
                    <NavLink active={this.state.process === "estimate"} onClick={() => this.tabClick("estimate")} href="#">견적</NavLink>
                  </NavItem>*/}
                  <NavItem>
                    <NavLink active={this.state.process === "order"} onClick={() => this.tabClick("order")} href="#">주문</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "shipping"} onClick={() => this.tabClick("shipping")} href="#">출하</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "refund"} onClick={() => this.tabClick("refund")} href="#">환불</NavLink>
                  </NavItem>
                </Nav>
                <div style={{overflow: 'scroll'}}>
                  <Table style={{minWidth: 600}} hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>출하일</th>
                        <th>등록일</th>
                        <th>고객</th>
                        <th>총액</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, i) => {
                        return (<tr style={{cursor: 'pointer'}} key={e.id} onClick={() => {this.props.history.push(`/main/sales/order/${e.id}`)}}>
                        <td>{e.id}</td>
                        <td>{this.getDate(e.date)}</td>
                        <td>{this.getDate(e.orderDate)}</td>
                        <td>{e.name}</td>
                        <td>{this.numberWithCommas(e.price)}</td>
                        <td>{stateKor[e.state]}</td>
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.number-1)}}/>
                  </PaginationItem>
                  {this.state.number === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.state.number === 2 ? arr.forEach(x => arr1.push(x+1)) : null}   
                  {this.state.number != 1 && this.state.number!= 2 ? arr.forEach(x => arr1.push(x)) :null }    
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.state.number+e)
                    return <PaginationItem key={i} active={this.state.number === this.state.number+e}>
                    <PaginationLink onClick={() => {this.countPageNumber(this.state.number+e)}}>
                    {this.state.number+e}
                    </PaginationLink>
                  </PaginationItem>
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

export default Sales;
