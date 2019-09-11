import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Label } from 'reactstrap';
import Popup from "reactjs-popup";
import ProductModal from './Modal';
import CustomerModal from './Modal2';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

//vos = value of supply (공급가액)
//vos = value added tax (부가세))
let d = {id: '', name: '', quantity: 0, price: 0, vos: 0, vat: 0, tax: false, sum: 0, keyword: ''};

class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
      product: [],
      sProduct: [d],
      sCustomer: null, //선택된 거래처
      date: new Date(),
      manager: '',
      address: '',
      cellphone: '',
      telephone: '',
      customerName: '',
      comment: ''
    };
  }
  componentWillMount() {
    this.findCustomer();
    this.findProduct();
  }

  findCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(customer => {this.customer = customer;this.setState({customer})})
  }

  findProduct() {
    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(product => {this.setState({product})})
  }

  convertDateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  addOrder() {
    const {sCustomer, sProduct, cellphone, telephone, address, comment} = this.state;
    let {date} = this.state;

    date = this.convertDateFormat(date);
    fetch(process.env.REACT_APP_HOST+"/order", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({date, sCustomer, sProduct, cellphone, telephone, address, comment})
    })
      .then(response => response.json())
      .then(data => {this.props.history.push('/sales/list');});
  }

  onUpdateComments(idx, e) {
    /*
        you can modify your state only using setState. But be carefull when trying to grab actual state and modify it's reference.
        So, the best way is to create a new object (immutable pattern), and one way of doing that is to use Object.assign
    */
    let key = e.target.name;
    let sProduct = this.state.sProduct;

    let val = Object.assign({}, sProduct[idx]);

    /* set, for instance, comment[1] to "some text" */
    val[key] = e.target.value;

    sProduct[idx] = val;
    sProduct[idx].keyword = e.target.value;

    /* set the state to the new variable */
    this.setState({sProduct});
  }

  render() {
    //let customer = this.customer;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                주문서
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Label>일자</Label><br />
                    <div style={{pointer: 'cursor'}}>
                      <DatePicker
                        dateFormat="yyyy년 MM월 dd일"
                        locale="ko"
                        selected={this.state.date}
                        onChange={(date) => {this.setState({date})}}
                      />
                    </div>
                  </Col>
                  <Col>
                    <Label>고객</Label>
                    {<Popup
                      trigger={<Input value={this.state.customerName} style={{cursor: 'pointer'}} onChange={() => {console.log('S')}} />}
                      modal>
                      {close => <CustomerModal close={close}
                      selectCustomer={(data) => {
                        let {address, cellphone, name, id, telephone} = data;
                        this.setState({
                          address,
                          cellphone,
                          customerName: name,
                          sCustomer: id,
                          telephone
                        })
                        /* set, for instance, comment[1] to "some text"*/
                      }}/>}
                    </Popup>}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>전화번호</Label>
                    <Input value={this.state.telephone} onChange={() => {console.log('S')}} />
                  </Col>
                  <Col>
                    <Label>HP</Label>
                    <Input value={this.state.cellphone} onChange={() => {console.log('S')}} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>주소</Label>
                    <Input value={this.state.address} onChange={() => {console.log('S')}} />
                  </Col>
                  <Col>
                    <Label>요청사항</Label>
                    <Input value={this.state.comment} onChange={(e) => {
                      this.setState({
                        comment: e.target.value
                      })
                    }} />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">품목을 입력하세요</Col>
                  <Col md="2" xs="2" sm="2">
                    <Button block color="primary" 
                      onClick={()=> {
                        let sProduct = this.state.sProduct;
                        sProduct.push(d);
                        this.setState({
                          sProduct
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
                    {
                      this.state.sProduct.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>
                              {<Popup
                                trigger={<Input name='name' value={this.state.sProduct[i].name} style={{cursor: 'pointer'}} onChange={() => {console.log('S')}} />}
                                modal>
                                {close => <ProductModal keyword={this.state.sProduct[i].keyword} index={i} close={close}
                                            selectProduct={(data) => {
                                              let {sProduct} = this.state;

                                              let val = Object.assign({}, sProduct[i]);
                                          
                                              /* set, for instance, comment[1] to "some text"*/
                                              val['id'] = data['id'];
                                              val['name'] = data['name'];
                                              val['price'] = data['price_shipping'];
                                          
                                              sProduct[i] = val;
                                              sProduct[i].vos = sProduct[i].tax ? Math.round(sProduct[i].quantity * sProduct[i].price * 10 / 11) : sProduct[i].quantity * sProduct[i].price;
                                              sProduct[i].vat = sProduct[i].tax ? Math.round(sProduct[i].vos / 10) : 0;
                
                                              /* set the state to the new variable */
                                              this.setState({sProduct});
                                            }}/>}
                                </Popup>}
                            </td>
                            <td><Input name='quantity' value={this.state.sProduct[i].quantity} onChange={(e)=> {
                              let {sProduct} = this.state;
                              sProduct[i].quantity = e.target.value;
                              sProduct[i].vos = sProduct[i].tax ? Math.round(e.target.value * sProduct[i].price * 10 / 11) : e.target.value * sProduct[i].price;
                              sProduct[i].vat = sProduct[i].tax ? Math.round(sProduct[i].vos / 10) : 0;
                              this.setState({sProduct})}}
                            /></td>
                            <td><Input name='price' value={this.state.sProduct[i].price} readOnly/></td>
                            <td><Input name='vos' value={this.state.sProduct[i].vos} readOnly/></td>
                            <td><Input name='vat' value={this.state.sProduct[i].vat} readOnly/></td>
                            <td><Input name='tax' type='checkbox' value={this.state.sProduct[i].tax} onClick={() => {
                              let {sProduct} = this.state;
                              if(sProduct[i].tax) {//면세로 바꿀 경우
                                sProduct[i].vos += sProduct[i].vat;
                                sProduct[i].vat = 0;
                              } else {//과세로 바꿀 경우
                                sProduct[i].vat = Math.round(sProduct[i].vos * 1/11);
                                sProduct[i].vos = Math.round(sProduct[i].vos * 10/11);
                              }
                              sProduct[i].tax = !sProduct[i].tax;
                              this.setState({sProduct})}} />
                            </td>
                            <td><Input name='sum' value={this.state.sProduct[i].price * this.state.sProduct[i].quantity} readOnly/></td>
                            <td>
                              <Button block color="danger" 
                                onClick={()=> {
                                  let {sProduct} = this.state;
                                  sProduct.splice(i, 1);
                                  this.setState({
                                    sProduct
                                  })
                                }}>
                                X
                              </Button>
                            </td>
                          </tr>
                        )
                      }, this)
                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Button block color="primary" onClick={() => {
          this.addOrder(this.state);
        }}>주문 추가하기</Button>
      </div>
    )
  }
}

export default CreateOrder;