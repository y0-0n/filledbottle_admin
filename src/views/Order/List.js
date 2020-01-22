import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Button, Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, NavItem, Nav, NavLink, Table, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

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
  refund: '환불',
  cancel: '취소'
}
const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "all",
      orderData: [],
      page: 1,
      total: 0,
      keyword: '',
      first_date: new Date('2019-11-24'),
      last_date: new Date(),
    };
    this.keyword = '';
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
    const {first_date, last_date, keyword} = this.state;
    const process_ = this.state.process;

    fetch(process.env.REACT_APP_HOST+"/order/total/"+(process_ === "refund" ? "refund" : ""), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({first_date, last_date, process_, keyword})
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

  getOrder() {
    const {first_date, last_date, page, keyword} = this.state;
    const process_ = this.state.process;
    fetch(process.env.REACT_APP_HOST+"/order/list"+(process_ === "refund" ? "/refund" : ""), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({first_date, last_date, page, process_, keyword})
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
      if(status === 200) {
        let orderData = data[1];
        this.setState({orderData})
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    });
  }

  tabClick(process) {
    this.setState({
      process,
      page: 1
    }, () => {
      this.getTotal();
      this.getOrder();
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchOrder() {
    let {keyword} = this;
    this.setState({keyword, page: 1}, () => {
      this.getOrder();
      this.getTotal();
    })
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x){
    this.setState({
      page: x,
    }, () => {
      this.getOrder();
    });
  }

  render() {
    var data = this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
              <Row>
                  <Col>주문 보기</Col>
                  <Col md="2" xs="3" sm="3">
                    <div style={{ pointer: 'cursor', width : 140}}>
                      <DatePicker
                        dateFormat="yyyy년 MM월 dd일"
                        locale="ko"
                        selected={this.state.first_date}
                        onChange={(first_date) => { this.setState({ first_date }) }}
                      />
                    </div>
                  </Col>
                  ~
                  <Col md="2" xs="3" sm="3">
                    <DatePicker
                      dateFormat="yyyy년 MM월 dd일"
                      locale="ko"
                      selected={this.state.last_date}
                      onChange={(last_date) => { this.setState({ last_date }) }}
                    />
                  </Col>
                  <Col md="2" xs="3" sm="3">
                    <Input onChange={(e) => { this.keyword = e.target.value }} />
                  </Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.searchOrder() }}>검색</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col></Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.props.history.push('/sales/order'); }}>주문 생성</Button>
                  </Col>
                </Row>

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
                  <NavItem>
                    <NavLink active={this.state.process === "cancel"} onClick={() => this.tabClick("cancel")} href="#">취소</NavLink>
                  </NavItem>
                </Nav>
                <div style={{overflow: 'scroll'}}>
                  <Table style={{minWidth: 600}} hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>출하일</th>
                        <th>생성일</th>
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
                        <td>
                          {this.state.process === 'refund' ? <h3><Badge color="danger">{stateKor['refund']}</Badge></h3> : null}
                          {e.state === 'order' ? <h3><Badge color="primary">{stateKor[e.state]}</Badge></h3>: null}
                          {e.state === 'shipping' && this.state.process !== 'refund' ? <h3><Badge color="secondary">{stateKor[e.state]}</Badge></h3>: null}
                          {e.state === 'cancel' ? <h3><Badge color="danger">{stateKor[e.state]}</Badge></h3>: null}
                        </td>
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <div>
                <Pagination style={{justifyContent: 'center'}}>
                  {this.state.page === 1 ? '' : 
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.page-1)}}/>
                  </PaginationItem>
                  }
                  {this.state.page === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.state.page === 2 ? arr.forEach(x => arr1.push(x+1)) : null}   
                  {this.state.page !== 1 && this.state.page!== 2 ? arr.forEach(x => arr1.push(x)) :null }    
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.state.page+e)
                    return (<PaginationItem key={i} active={this.state.page === this.state.page+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.state.page+e)}}>
                      {this.state.page+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.state.page === this.state.total ? '' : 
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.state.page+1)}}/>
                  </PaginationItem>}
                </Pagination>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default List;
