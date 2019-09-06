import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Label, Table } from 'reactstrap';

class OrderModify extends Component {
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
    let {orderInfo} = this.state.data;
    orderInfo = orderInfo[0];
    let {productInfo} = this.state.data;

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
                  <Col>
                    <Label>총액 :&nbsp;</Label>
                    <Label>{orderInfo['price']}</Label>
                  </Col>
                  <Col>
                    <Label>수금 :&nbsp;</Label>
                    <Label>{orderInfo['received']}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>상태 :&nbsp;</Label>
                    <Label>{orderInfo['state']}</Label>
                  </Col>
                  <Col>
                    <Label>배송유형 :&nbsp;</Label>
                    <Label>{}</Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>배송지 :&nbsp;</Label>
                    <Label>{}</Label>
                  </Col>
                  <Col>
                    <Label>요청사항 :&nbsp;</Label>
                    <Label>{}</Label>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                {orderInfo['state'] === "order" ? <Button>출하 완료</Button> : null}
                {orderInfo['state'] === "shipment" ? <Button>완료</Button> : null}
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
                      <th>단가</th>
                      <th>수량</th>
                      <th>공급가액</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.map((e, i) => {
                      return ( <tr key={i}>
                        <td>{e['name']}</td>
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

export default OrderModify;