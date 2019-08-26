import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Label } from 'reactstrap';
import Popup from "reactjs-popup";
import Modal from './Modal';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

let d = {a: '', b: '', c: '', d: '', e: '', f: '', keyword: ''};

class CreateOrder extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
      product: [],
      sProduct: [d],
      sCustomer: null, //선택된 거래처
      date: new Date(),
      manager: null
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
    const {manager, sCustomer, sProduct} = this.state;
    let {date} = this.state;

    date = this.convertDateFormat(date);
    fetch(process.env.REACT_APP_HOST+"/order", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({date, manager, sCustomer, sProduct})
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
    let customer = this.customer;
    console.warn(this.state.sProduct);
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
                    <DatePicker
                      dateFormat="yyyy년 MM월 dd일"
                      locale="ko"
                      selected={this.state.date}
                      onChange={(date) => {this.setState({date})}}
                    />
                  </Col>
                  <Col>
                    <Label>담당자</Label>
                    <Input onChange={(e) => this.setState({manager: e.target.value})} />
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
                거래처를 클릭하세요
              </CardHeader>
              <CardBody>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>거래처</th>
                      <th>대표</th>
                      <th>담당자</th>
                      <th>핸드폰</th>
                      <th>전화번호</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.map(function (e) {
                      return (
                        <tr style={{cursor: "pointer", backgroundColor: this.state.sCustomer === e.id ? 'lightgray' : 'transparent'}}
                          onClick={()=>{
                            if(this.state.sCustomer !== e.id)
                              this.setState({sCustomer: e.id})
                            else
                              this.setState({sCustomer: null})
                          }}
                          key={e.id}>
                          <th scope="row">{e.id}</th>
                          <td>{e.name}</td>
                          <td>{e.delegate}</td>
                          <td>{e.manager}</td>
                          <td>{e.cellphone}</td>
                          <td>{e.telephone}</td>
                        </tr>
                      )
                    }.bind(this))}
                  </tbody>
                </Table>
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
                                trigger={<Input name='b' value={this.state.sProduct[i].b} style={{cursor: 'pointer'}} onChange={this.onUpdateComments.bind(this,i)}/>}
                                modal>
                                {close => <Modal keyword={this.state.sProduct[i].keyword} index={i} close={close}
                                            test={(data) => {
                                              console.log(data);
                                              let sProduct = this.state.sProduct;

                                              let val = Object.assign({}, sProduct[i]);
                                          
                                              /* set, for instance, comment[1] to "some text"*/
                                              val['a'] = data['id'];
                                              val['b'] = data['name'];
                                              val['d'] = data['price_shipping'];
                                          
                                              sProduct[i] = val;
                                          
                                              /* set the state to the new variable */
                                              this.setState({sProduct});
                                            }}>
                                          </Modal>}
                                </Popup>}
                            </td>
                            <td><Input name='c' onChange={this.onUpdateComments.bind(this,i)} /></td>
                            <td><Input name='d' value={this.state.sProduct[i].d} onChange={this.onUpdateComments.bind(this,i)} /></td>
                            <td><Input name='e' onChange={this.onUpdateComments.bind(this,i)} /></td>
                            <td><Input name='f' onChange={this.onUpdateComments.bind(this,i)} /></td>
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