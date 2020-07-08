import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Badge, InputGroup, InputGroupAddon } from 'reactstrap';

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불',
  cancel: '취소'
}

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}],
      },
      collect: true,
      refund: false,
      productId : 0,
      quantity : 0
    };
  }
  componentWillMount() {
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    fetch(process.env.REACT_APP_HOST + "/order/detail/" + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          this.setState({ data: data[1] })
        } else if (status === 401) {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        } else if (status === 400) {
          alert('존재하지 않는 주문입니다.');
          this.props.history.push('/main/sales/list')
        }
      });
  }

  numberWithCommas(x) {
    if (!x) {
      console.log('Cannot convert');
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  changeState(prev, next) {
    let c, d;
    c = window.confirm('이 주문을 변경하시겠습니까?');

    if(next === 'cancel'){
			d = window.confirm('주문 취소 후엔 변경이 불가능합니다. 원치 않으시다면 취소를 눌러주세요.');
			if(d) {
				let {orderInfo} = this.state.data;
				fetch(process.env.REACT_APP_HOST+"/order/changeState/", {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
					},
					body: JSON.stringify({orderInfo, next, prev})
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
						this.getData(this.props.match.params.id)
					} else if(status === 401) {
						alert('로그인 하고 접근해주세요')
						this.props.history.push('/login')
					} else if(status === 400) {
						alert('존재하지 않는 주문입니다.');
						this.props.history.push('/main/sales/list')
					}
				});
			}
			return ;
		}

    if (c) {
      let { orderInfo, productInfo } = this.state.data;
      fetch(process.env.REACT_APP_HOST + "/order/changeState/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ orderInfo, productInfo, next, prev })
      })
        .then(response => {
          if (response.status === 401) {
            return Promise.all([401])
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then(data => {
          const status = data[0];
          if (status === 200) {
            this.getData(this.props.match.params.id)
          } else if (status === 401) {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          } else if (status === 400) {
            alert('존재하지 않는 주문입니다.');
            this.props.history.push('/main/sales/list')
          }
        });
    }
  }

  handleRefund() {
    this.setState({ refund: !this.state.refund });
  }

  refundProduct(data) {
    let c;
    c = window.confirm('이 상품을 환불하시겠습니까?');
    data.orderId = this.props.match.params.id;
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/order/detail/refund/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ data })
      })
        .then(response => {
          if (response.status === 401) {
            return Promise.all([401])
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then(data => {
          const status = data[0];
          if (status === 200) {
            this.getData(this.props.match.params.id);
          } else if (status === 401) {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          } else if (status === 400) {
            alert('존재하지 않는 주문입니다.');
            this.props.history.push('/main/sales/list')
          }
        })
      alert('환불되었습니다.')
    }
  }

  checkQuantity(max, refund) {
    if(refund > max || 0 > refund){
      alert("범위를 확인해주세요");
      return false;
    }
    else return true;
  }

  render() {
    let { orderInfo, productInfo } = this.state.data;
    orderInfo = orderInfo[0];
    var d = new Date(orderInfo['date']);
    var year = d.getFullYear(), month = d.getMonth() + 1, date = d.getDate();
    var total_price = 0;
    var total_supply = 0;
    var total_vat = 0;
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/OrderDetail.css"></link>
        <Card>
          <CardHeader>
            <Row>
              <Col>{this.props.match.params.id}번 주문</Col>
              <Col>
                <div style={{ float: 'right' }}>
                  <Button color="primary" onClick={() => { this.props.history.goBack() }}>뒤로가기</Button>
                  {orderInfo['state'] === "shipping" ? "" :
                    orderInfo['state'] === "cancel" ? "" :
                      <Button color="primary" onClick={() => { this.props.history.push(`/main/order/edit/` + this.props.match.params.id) }} style={{ marginLeft: '10px' }}>수정</Button>}
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="ShowTable">
              <tbody>
                <tr>
                  <th>고객명</th>
                  <td>{orderInfo['name']}</td>
                  <th>일자</th>
                  <td>{year}년 {month}월 {date}일</td>
                </tr>
                <tr>
                  <th>연락처1</th>
                  <td>{orderInfo['cellphone']}</td>
                  <th>연락처2</th>
                  <td>{orderInfo['telephone']}</td>
                </tr>
                <tr>
                  <th>배송지</th>
                  <td>{orderInfo['address'] + ' ' + orderInfo['addressDetail'] + ' (' + orderInfo['postcode'] + ')'}</td>
                  <th>요청사항</th>
                  <td>{orderInfo['comment']}</td>
                </tr>
                <tr>
                  <th>주문상태</th>
                  <td colSpan='3'>
                    {orderInfo['state'] === 'order' ? <h3><Badge color="primary">{stateKor[orderInfo['state']]}</Badge></h3> : null}
                    {/*orderInfo['state'] === 'shipping' ? <h3><Badge color="secondary">{stateKor[orderInfo['state']]}</Badge></h3>: null*/}
                    {orderInfo['state'] === 'shipping' ? <h3><Badge color="secondary">출하</Badge></h3> : null}
                    {orderInfo['state'] === 'complete' ? <h3><Badge color="success">수금</Badge></h3> : null}
                    {orderInfo['state'] === 'refund' ? <h3><Badge color="danger">{stateKor[orderInfo['state']]}</Badge></h3> : null}
                    {orderInfo['state'] === 'cancel' ? <h3><Badge color="danger">{stateKor[orderInfo['state']]}</Badge></h3> : null}</td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
          <CardFooter>
            {orderInfo['state'] === "order" ? <Button onClick={() => this.changeState(orderInfo.state, 'shipping')} style={{ marginLeft: '10px' }}>출하 완료</Button> : null}
            {orderInfo['state'] === "shipping" ? <Button onClick={() => this.changeState(orderInfo.state, 'order')} style={{ marginLeft: '10px' }} >출하 취소</Button> : null}
            {orderInfo['state'] === "shipping" ? <Button onClick={() => this.changeState(orderInfo.state, 'complete')} style={{ marginLeft: '10px' }} >수금 완료</Button> : null}
            <Button onClick={() => { this.props.history.push(`/main/order/transaction/` + this.props.match.params.id) }} style={{ marginLeft: '10px' }}>거래명세서</Button>
            <Button onClick={() => { this.props.history.push(`/main/order/post/` + this.props.match.params.id) }} style={{ marginLeft: '10px' }}>택배송장</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Row>
              <Col>품목</Col>
              <Col>
                <div style={{ float: 'right' }}>
                  {orderInfo['state'] === "order" ? <Button onClick={() => { this.changeState(orderInfo.state, 'cancel') }}> 주문 취소</Button> : null}
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <p style={{ fontSize: "0.8em", color: "grey", fontWeight: "lighter" }}>* 재고명을 클릭하시면 재고 정보를 확인할 수 있습니다.</p>
              <Table>
                <thead>
                  <tr>
                    <th>품목명</th>
                    <th>재고</th>
                    <th>수량</th>
                    <th>판매 단가</th>
                    <th>공급가액</th>
                    <th>부가세</th>
                    <th>과세</th>
                    <th>총액</th>
                    <th>{orderInfo['state'] === "shipping" ?
                      this.state.refund ? <Button onClick={() => { this.handleRefund() }}>환불 완료</Button>
                        : <Button onClick={() => { this.handleRefund() }}>환불 하기</Button>
                      : null}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productInfo.map((e, i) => {
                    if(!e.refund){
                      total_price += e['price'];
                      total_supply += Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']);
                      total_vat += Math.round(e['tax'] ? e['price'] * 1 / 11 : 0);
                    }
                    else {
                      total_price -= e['price'];
                      total_supply -= Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']);
                      total_vat -= Math.round(e['tax'] ? e['price'] * 1 / 11 : 0);
                    }
                    return (<tr key={i} style={{ backgroundColor: e.refund ? 'lightyellow' : null }}>
                      <td>{e['name']}</td>
                      <td style={{ cursor: "pointer" }} onClick={() => { this.props.history.push(`/main/manage/stock/${e.stockId}`) }}>{e['stockName']}</td>
                      {/* <td style={{color: !e['plantSet'] ? 'red' : ''}}>{e['plant']}</td> */}
                      <td>{e['quantity']}</td>
                      <td>{this.numberWithCommas(e['price'] / e['quantity'])}</td>
                      <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']))}</td>
                      <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                      <td style={{ textAlign: 'center' }}><Input name='tax' type='checkbox' checked={e.tax || false} disabled /></td>
                      <td>{this.numberWithCommas(e['price'])}</td>
                      <td>
                      {
                        this.state.refund === true && e.refund == false? <React.Fragment>
                          <InputGroup>
                            <Input style={{width: '100px'}} onChange={(ee) => {e['refundQuantity'] = ee.target.value;}}/>
                            <InputGroupAddon addonType="append">
                              <Button onClick={() => {if(this.checkQuantity(e['quantity'], e['refundQuantity'])) this.refundProduct(e);}}>환불</Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </React.Fragment>
                           : null
                      }
                      </td>
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
                    <th>{this.numberWithCommas(total_supply)}</th>
                    <th>{this.numberWithCommas(total_vat)}</th>
                    <th></th>
                    <th>{this.numberWithCommas(total_price)}</th>
                    <th></th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </CardBody>
        </Card>
        {/* <Card>
          <CardHeader>
            <div>
              환불
            </div>
          </CardHeader>
          <CardBody>
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
              <Table>
                <thead>
                  <tr>
                    <th>품목명</th>
                    <th>재고</th>
                    <th>수량</th>
                    <th>판매 단가</th>
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
                    return (<tr key={i} style={{ backgroundColor: e.refund ? 'lightyellow' : null }}>
                      <td>{e['name']}</td>
                      <td style={{ cursor: "pointer" }} onClick={() => { this.props.history.push(`/main/manage/stock/${e.stockId}`) }}>{e['stockName']}</td>
                      { <td style={{color: !e['plantSet'] ? 'red' : ''}}>{e['plant']}</td> }
                      {e.refund?<td><Input placeholder={this.state.quantity} disabled></Input></td>: <td><Input type="number" placeholder={0} min={0} max={e['quantity']} onChange={e => this.setState({quantity: e.target.value})}></Input></td>}
                      <td>{this.numberWithCommas(e['price'] / e['quantity'])}</td>
                      <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']))}</td>
                      <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                      <td style={{ textAlign: 'center' }}><Input name='tax' type='checkbox' checked={e.tax || false} disabled /></td>
                      <td>{this.numberWithCommas(e['price'])}</td>
                      {
                        this.state.refund === true ?
                          !e.refund ? <td><Button onClick={() => {if(this.checkQuantity(e['quantity'])) this.changeRefundstate(e.orderProductId, e.refund);}}>환불</Button></td>
                            : <td><Button onClick={() => this.changeRefundstate(e.orderProductId, e.refund)}>환불 취소</Button></td>
                          : null}
                    </tr>
                    )
                  })}
                  { <Input onChange={(e) => {
                    this.setState({productId : e.target.value}, ()=> {
                      this.handleRefund();
                      console.log(this.state.productId, 'asdf')
                    });
                  }} type='select' name="family">
                    {productInfo.map((e, i) => {
                      console.log(e.orderProductId)
                      return <option key={i} value={e.orderProductId}>{e['name']}</option>
                    })}
                  </Input> }
                </tbody>
                <tfoot>
                </tfoot>
              </Table>
            </div>
          </CardBody>
        </Card> */}
      </div>
    )
  }
}

export default Detail;
