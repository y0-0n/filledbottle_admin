import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input } from 'reactstrap';
import '../../css/Table.css';

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불'
}

class OrderDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}]
      },
      refund : false,
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

  changeState(s) {
    fetch(process.env.REACT_APP_HOST+"/order/changeState/"+this.props.match.params.id+"/"+s, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => this.getData(this.props.match.params.id))
}

  handleRefund() {
    if(this.state.refund === true){
      this.setState({refund: false});
    }else{
      this.setState({refund: true});
    }
    
  }

  changeRefundstate(id) {
    let c = window.confirm('이 상품을 환불하시겠습니까?')

    if(c) {
      this.setState({refund: false});
    }
  }

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];
    var d = new Date(orderInfo['date']);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();
    var total = 0 ;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>{this.props.match.params.id}번 주문</Col>
                  <Col><Button onClick={() => {this.props.history.goBack()}}>뒤로가기</Button></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="ShowTable">
                <tbody>
                  <tr>
                    <th>고객명</th>
                    <td>{orderInfo['name']}</td>
                    <th>일자</th>
                    <td className="TableRight">{year}년 {month}월 {date}일</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>{orderInfo['telephone']}</td>
                    <th>HP</th>
                    <td className="TableRight">{orderInfo['cellphone']}</td>
                  </tr>
                  <tr>
                    <th>배송지</th>
                    <td>{orderInfo['address']}</td>
                    <th>요청사항</th>
                    <td className="TableRight">{orderInfo['comment']}</td>
                  </tr>
                  <tr className="TableBottom">
                    <th>주문상태</th>
                    <td colSpan='3'>{stateKor[orderInfo['state']]}</td>
                  </tr>
                </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                {orderInfo['state'] === "order" ? <Button onClick={() => this.changeState('shipping')}>출하 완료</Button> : null}
                {orderInfo['state'] === "shipping" ? <Button onClick={() => this.changeState('order')}>출하 취소</Button> : null}
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
              <Row>
                <Col>품목</Col>
                <Col>
                  {orderInfo['state'] === "order" ? <Button> 주문 취소</Button> : null}
                  {orderInfo['state'] === "shipping" ? <Button onClick={() => {this.handleRefund()}}>환불 하기</Button> : null}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
            <Table>
                  <thead>
                    <tr>
                    <th>품목명</th>
                      <th>수량</th>
                      <th>단가</th>
                      <th>공급가액</th>
                      <th>부가세</th>
                      <th>과세</th>
                      <th>총액</th>
                      {this.state.refund === true ? <th>환불</th> : null}
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.map((e, i) => {                      
                      total += e['quantity']*e['price_shipping'];
                      return ( <tr key={i}>
                        <td>{e['name']}</td>
                        <td>{e['quantity']}</td>
                        <td>{this.numberWithCommas(e['price_shipping'])}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 10 / 11 : e['price_shipping'] * e['quantity']))}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 1 / 11 : 0))}</td>
                        <td><Input name='tax' type='checkbox' checked={e.tax} disabled/></td>
                        <td>{this.numberWithCommas(e['quantity']*e['price_shipping'])}</td>
                        <td>{this.state.refund === true ? <Button onClick={() => this.changeRefundstate(e.id)}>X</Button> : null}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>총합</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>{this.numberWithCommas(total)}</th>
                    </tr>
                  </tfoot>
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