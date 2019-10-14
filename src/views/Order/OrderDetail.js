import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Badge } from 'reactstrap';
import '../../css/Table.css';

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불',
  cancel: '취소'
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
    let c;
    c = window.confirm('이 상품을 주문 취소하시겠습니까?');

    if(c) {
      fetch(process.env.REACT_APP_HOST+"/order/changeState/"+this.props.match.params.id+"/"+s, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => this.getData(this.props.match.params.id))
      }
    
}

  handleRefund() {
    if(this.state.refund === true){
      this.setState({refund: false});
    }else{
      this.setState({refund: true});
    }
  }

  changeRefundstate(id, refund) {
    let c;
    if(refund) 
      c = window.confirm('이 상품을 환불 취소하시겠습니까?');
    else
      c = window.confirm('이 상품을 환불하시겠습니까?');

    if(c) {
      fetch(process.env.REACT_APP_HOST+"/orderDetail/refund/"+id, {
        method: 'PUT',  
      })
        .then(response => response.json())
        .then(data => this.getData(this.props.match.params.id))
      }
  }

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];
    var d = new Date(orderInfo['date']);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();
    var total_price = 0 ;
    var total_supply = 0;
    var total_vat = 0;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">{this.props.match.params.id}번 주문</Col>
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
                    <td colSpan='3'>
                      {orderInfo['state'] === 'order' ? <h3><Badge color="primary">{stateKor[orderInfo['state']]}</Badge></h3>: null}
                      {orderInfo['state'] === 'shipping' ? <h3><Badge color="secondary">{stateKor[orderInfo['state']]}</Badge></h3>: null}
                      {orderInfo['state'] === 'refund' ? <h3><Badge color="danger">{stateKor[orderInfo['state']]}</Badge></h3>: null}
                      {orderInfo['state'] === 'cancel' ? <h3><Badge color="danger">{stateKor[orderInfo['state']]}</Badge></h3>: null}</td>
                  </tr>
                </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                {orderInfo['state'] === "order" ? <Button onClick={() => this.changeState('shipping')} style={{marginLeft : '10px'}}>출하 완료</Button> : null}
                {orderInfo['state'] === "shipping" ? <Button onClick={() => this.changeState('order')} style={{marginLeft : '10px'}} >출하 취소</Button> : null}
                <Button onClick={() => {this.props.history.push(`/main/order/edit/`+this.props.match.params.id)}} style={{marginLeft : '10px'}}>수정</Button>
                <Button onClick={() => {this.props.history.push(`/main/order/transaction/`+this.props.match.params.id)}} style={{marginLeft : '10px'}}>거래명세서</Button>
                <Button onClick={() => {this.props.history.push(`/main/order/post/`+this.props.match.params.id)}} style={{marginLeft : '10px'}}>택배송장</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col md="10" xs="10" sm="10">품목</Col>
                <Col>
                  {orderInfo['state'] === "order" ? <Button onClick={() => {this.changeState('cancel')}}> 주문 취소</Button> : null}
                  {orderInfo['state'] === "shipping" ?
                    this.state.refund ? <Button onClick={() => {this.handleRefund()}}>환불 완료</Button>
                    : <Button onClick={() => {this.handleRefund()}}>환불 하기</Button>
                  : null}
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
                      total_price += e['price'];
                      total_supply += Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']);
                      total_vat += Math.round(e['tax'] ? e['price'] * 1 / 11 : 0);
                      return ( <tr key={i} style={{backgroundColor: e.refund ? 'orange' : null}}>
                        <td>{e['name']}</td>
                        <td>{e['quantity']}</td>
                        <td>{this.numberWithCommas(e['price']/e['quantity'])}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']))}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                        <td><Input name='tax' type='checkbox' checked={e.tax} disabled/></td>
                        <td>{this.numberWithCommas(e['price'])}</td>
                        <td>{
                          this.state.refund === true ?
                              !e.refund ? <Button onClick={() => this.changeRefundstate(e.id, e.refund)}>환불</Button>
                              : <Button onClick={() => this.changeRefundstate(e.id, e.refund)}>환불 취소</Button>
                          : null}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>총합</th>
                      <th></th>
                      <th></th>
                      <th>{this.numberWithCommas(total_supply)}</th>
                      <th>{this.numberWithCommas(total_vat)}</th>
                      <th></th>
                      <th>{this.numberWithCommas(total_price)}</th>
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