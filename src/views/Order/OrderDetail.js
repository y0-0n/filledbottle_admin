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

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];

    console.warn(orderInfo)
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
                    <Label>거래처명 :&nbsp;</Label>
                    <Label>{orderInfo['name']}</Label>
                  </Col>
                  <Col>
                    <Label>일자 :&nbsp;</Label>
                    <Label>{orderInfo['date']}</Label>
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
                        <td>{e['price_shipping']}</td>
                        <td>{e['quantity']}</td>
                        <td>{e['price']}</td>
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