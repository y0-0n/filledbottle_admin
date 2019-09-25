import React, { Component } from 'react';
import { Button, Input, Card, CardBody, CardHeader, CardFooter, Col, Row, Label, Table } from 'reactstrap';
import ProductModal from './Modal';
import Popup from "reactjs-popup";

let d = {id: '', name: '', quantity: 0, price: 0, vos: 0, vat: 0, tax: false, sum: 0, tax: false};

class OrderModify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}],
        name: '',
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
                    <Label>고객명 :&nbsp;</Label><br />
                    <Label>{orderInfo['name']}</Label>
                  </Col>
                  <Col>
                    <Label>일자 :&nbsp;</Label><br />
                    <Label>{year}년 {month}월 {date}일</Label>
                  </Col>
                </Row>
                <Row>

                </Row>
                <Row>
                  <Col>
                    <Label>전화번호 :&nbsp;</Label>
                    <Input defaultValue={orderInfo['telephone']} onChange={(e) => {orderInfo['telephone'] = e.target.value}} />
                  </Col>
                  <Col>
                    <Label>HP :&nbsp;</Label>
                    <Input defaultValue={orderInfo['cellphone']} onChange={(e) => {orderInfo['cellphone'] = e.target.value}} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>배송지 :&nbsp;</Label>
                    <Input defaultValue={orderInfo['address']} onChange={(e) => {orderInfo['address'] = e.target.value}} />
                  </Col>
                  <Col>
                    <Label>요청사항 :&nbsp;</Label>
                    <Input defaultValue={orderInfo['comment']} onChange={(e) => {orderInfo['comment'] = e.target.value}} />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
          <Card>
            <CardHeader>
              <Row>
                <Col md="10" xs="10" sm="10">품목을 입력하세요</Col>
                <Col md="2" xs="2" sm="2">
                  <Button block color="primary" 
                    onClick={()=> {
                      let sProduct = productInfo;
                      sProduct.push(d);
                      this.setState({
                        productInfo: sProduct
                      })}}>
                    추가하기
                  </Button>
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
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.map((e, i) => {
                      console.log(e)
                      return ( <tr key={i}>
                        <td>
                          {<Popup
                            trigger={<Input name='name' value={productInfo[i].name || ''} style={{cursor: 'pointer'}} onChange={() => console.log('S')}/>}
                            modal>
                            {close => <ProductModal index={i} close={close}
                                        selectProduct={(data) => {
                                          let sProduct = productInfo;

                                          let val = Object.assign({}, sProduct[i]);
                                      
                                          /* set, for instance, comment[1] to "some text"*/
                                          val['id'] = data['id'];
                                          val['name'] = data['name'];
                                          val['price_shipping'] = data['price_shipping'];
                                      
                                          sProduct[i] = val;
                                          
                                          /* set the state to the new variable */
                                          console.log(productInfo, sProduct)
                                          this.setState({productInfo: sProduct});
                                        }}/>}
                          </Popup>}
                        </td>
                        <td><Input name='quantity' value={productInfo[i].quantity || ''} onChange={(e)=> {
                          let sProduct = productInfo;
                          sProduct[i].quantity = e.target.value;
                          this.setState({productInfo: sProduct})}}
                        /></td>
                        <td>{this.numberWithCommas(e['price_shipping'])}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 10 / 11 : e['price_shipping'] * e['quantity']))}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 1 / 11 : 0))}</td>
                        <td><Input name='tax' type='checkbox' value={productInfo[i].tax} onClick={() => {
                          let sProduct = productInfo;
                          sProduct[i].tax = !sProduct[i].tax;
                          this.setState({productInfo: sProduct})}} />
                        </td>
                        <td>{this.numberWithCommas(e['price_shipping'] * e['quantity'])}</td>
                        <td>
                          <Button block color="danger" 
                            onClick={()=> {
                              let sProduct = productInfo;
                              sProduct.splice(i, 1);
                              this.setState({
                                productInfo: sProduct
                              })
                            }}>
                            X
                          </Button>
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </Table>

            </CardBody>
          </Card>
          </Col>
        </Row>
        <Button block color="primary" onClick={() => {
          this.convertOrder(this.state);
        }}>주문 수정하기</Button>

      </div>
    )
  }
}

export default OrderModify;