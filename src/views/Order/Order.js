import React, { Component } from 'react';

import { Button, Card, CardBody, CardHeader, Col, Row, NavItem, Nav, NavLink, Table } from 'reactstrap';

  
class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: "",
      orderData: [],
      page: 1
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
    });
    this.getOrder(process);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="10" xs="10" sm="10" />
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
                  <NavItem>
                    <NavLink active={this.state.process === "estimate"} onClick={() => this.tabClick("estimate")} href="#">견적</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "order"} onClick={() => this.tabClick("order")} href="#">주문</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "shipment"} onClick={() => this.tabClick("shipment")} href="#">출하</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "complete"} onClick={() => this.tabClick("complete")} href="#">완료</NavLink>
                  </NavItem>
                </Nav>
                <div style={{overflow: 'scroll'}}>
                  <Table style={{'minWidth': 1500}}>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>일자</th>
                        <th>고객</th>
                        <th>총액</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.orderData.map((e, i) => {
                        var d = new Date(e.date);
                        var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();
                        return (<tr style={{cursor: 'pointer'}} key={e.id} onClick={() => {this.props.history.push(`/main/sales/order/${e.id}`)}}>
                        <td>{e.id}</td>
                        <td>{year + "년 " + month + "월 " + date + "일"}</td>
                        <td>{e.name}</td>
                        <td>{this.numberWithCommas(e.price)}</td>
                        <td>{e.state}</td>{/* TODO: 상태 변경 구현후 한글화 필요 */}
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