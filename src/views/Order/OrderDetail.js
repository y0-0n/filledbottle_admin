import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Label } from 'reactstrap';

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [[]]
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
                  <Label>거래처명 :&nbsp;</Label>
                  <Label>{this.state.data[0]['customer_name']}</Label>
                </Row>
                <Row>
                  <Label>일자 :&nbsp;</Label>
                  <Label>{this.state.data[0]['date']}</Label>
                </Row>
                <Row>
                  <Label>총액 :&nbsp;</Label>
                  <Label>{this.state.data[0]['sum']}</Label>
                </Row>
                <Row>
                  <Label>수금 :&nbsp;</Label>
                  <Label>{this.state.data[0]['received']}</Label>
                </Row>
                <Row>
                  <Label>상태 :&nbsp;</Label>
                  <Label>{this.state.data[0]['state']}</Label>
                </Row>
                <Row>
                  <Label>배송지 :&nbsp;</Label>
                  <Label>{}</Label>
                </Row>
                <Row>
                  <Label>요청사항 :&nbsp;</Label>
                  <Label>{}</Label>
                </Row>
                <Row>
                  <Label>배송유형 :&nbsp;</Label>
                  <Label>{}</Label>
                </Row>
              </CardBody>
              <CardFooter>
                {this.state.data[0]['state'] === "order" ? <Button>출하 완료</Button> : null}
                {this.state.data[0]['state'] === "shipment" ? <Button>완료</Button> : null}
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
              {this.state.data.map((e, i) => {
                return (
                  e['product_id']
                )
              })}
            </CardBody>
          </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default OrderDetail;