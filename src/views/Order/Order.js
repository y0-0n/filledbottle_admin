import React, { Component } from 'react';

import { Button, Card, CardBody, CardHeader, Col, Row, NavItem, Nav, NavLink, Table, Input } from 'reactstrap';

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불'
}
  
class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "",
      orderData: [],
      page: 1,
      sdata: [],
      search: false
    };
  }

  componentWillMount() {
    this.getOrder("");
  }

  getOrder(state) {
    fetch(process.env.REACT_APP_HOST+"/order/"+state, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(orderData => {this.setState({orderData})});
  }

  tabClick(process) {
    this.setState({
      process
    }, function () {
      this.getOrder(process);
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchCustomer() {
    let result = this.state.orderData.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
    console.log(this.state.orderData)
    var data = this.state.search ? this.state.sdata : this.state.orderData;

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
                    <NavLink active={this.state.process === ""} onClick={() => this.tabClick("")} href="#">전체</NavLink>
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
                        <td>{stateKor[e.state]}</td>{/* TODO: 상태 변경 구현후 한글화 필요 */}
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Sales;