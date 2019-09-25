import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Label, Table } from 'reactstrap';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}]
      }
    };
  }
  componentWillMount() {
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    fetch(process.env.REACT_APP_HOST+"/orderDetail/"+id, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})});
  }

  numberWithCommas(x) {
    if(!x) {
      console.log('Cannot convert');
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];
    var d = new Date(orderInfo['date']);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();


    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                {this.props.match.params.id}번 주문
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Label>고객명 :&nbsp;</Label>
                    <Label>{orderInfo['name']}</Label>
                  </Col>
                  <Col>
                    <Label>일자 :&nbsp;</Label>
                    <Label>{year}년 {month}월 {date}일</Label>
                  </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                  <Col>
                    <Label>전화번호 :&nbsp;</Label>
                    <Label>{orderInfo['telephone']}</Label>
                  </Col>
                  <Col>
                    <Label>HP :&nbsp;</Label>
                    <Label>{orderInfo['cellphone']}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>배송지 :&nbsp;</Label>
                    <Label>{orderInfo['address']}</Label>
                  </Col>
                  <Col>
                    <Label>요청사항 :&nbsp;</Label>
                    <Label>{orderInfo['comment']}</Label>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                {/*orderInfo['state'] === "order" ? <Button>출하 완료</Button> : null}
                {orderInfo['state'] === "shipment" ? <Button>완료</Button> : null*/}
                <Button onClick={() => {this.props.history.push(`/main/order/edit/`+this.props.match.params.id)}}>수정</Button>
                <Button onClick={() => {this.props.history.push(`/main/order/transaction/`+this.props.match.params.id)}}>거래명세서</Button>
                <Button onClick={() => {this.props.history.push(`/main/order/post/`+this.props.match.params.id)}}>택배송장</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
          <Card>
            <CardHeader>
              품목
            </CardHeader>
            <CardBody>
            <Table>
                  <thead>
                    <tr>
                      <th>제품명</th>
                      <th>등급</th>
                      <th>무게</th>
                      <th>단가</th>
                      <th>수량</th>
                      <th>총액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.map((e, i) => {
                      return ( <tr key={i}>
                        <td>{e['name']}</td>
                        <td>{e['grade']}</td>
                        <td>{e['weight']}</td>
                        <td>{this.numberWithCommas(e['price_shipping'])}</td>
                        <td>{e['quantity']}</td>
                        <td>{this.numberWithCommas(e['price'])}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </Table>

            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default OrderDetail;