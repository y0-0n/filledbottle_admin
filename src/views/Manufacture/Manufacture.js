import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input } from 'reactstrap';
import Popup from "reactjs-popup";
import ProductModal from '../Order/Modal';
import CustomerModal from '../Order/Modal2';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
registerLocale('ko', ko)

//vos = value of supply (공급가액)
//vat = value added tax (부가세))
let d = {id: '', name: '', grade:'', weight:'', price: 0};

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
      comment: '',
    };
  }
  componentWillMount() {
  }

  convertDateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  vaild() {
    let length = this.state.sProduct.length;
    for(var i = 0; i < length; i++){
      if(this.state.sProduct[i].b === '' || this.state.sProduct[i].c === ''){
        return(true)
      }
    }
    return(!this.state.manager)
  }

  countQuantity(){
    this.setState({refund: false});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">소모 상품</Col>
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
                        <th>상품명</th>
                        <th>등급</th>
                        <th>무게</th>
                        <th>단가</th>
                        <th>소모재고</th>
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
                                trigger={<Input name='name' value={this.state.sProduct[i].name} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}} readOnly/>}
                                modal>
                                {close => <ProductModal index={i} close={close}
                                            selectProduct={(data) => {
                                              let {sProduct} = this.state;

                                              let val = Object.assign({}, sProduct[i]);
                                          
                                              /* set, for instance, comment[1] to "some text"*/
                                              val['id'] = data['id'];
                                              val['name'] = data['name'];
                                              val['price'] = data['price_shipping'];
                                              val['grade'] = data['grade'];
                                              val['weight'] = data['weight'];

                                              sProduct[i] = val;
                                                         
                                              /* set the state to the new variable */
                                              this.setState({sProduct});
                                            }}
                                          />}
                                </Popup>}
                            </td>
                            <td><Input name='grade' value={this.state.sProduct[i].grade} readOnly/></td>
                            <td><Input name='weight' value={this.state.sProduct[i].weight} readOnly/></td>
                            <td><Input name='price' value={this.state.sProduct[i].price} readOnly/></td>
                            <td><Input name='consume'/></td>
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
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">생산 상품</Col>
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
                        <th>상품명</th>
                        <th>등급</th>
                        <th>무게</th>
                        <th>단가</th>
                        <th>생산재고</th>
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
                                trigger={<Input name='name' value={this.state.sProduct[i].name} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}} readOnly/>}
                                modal>
                                {close => <ProductModal index={i} close={close}
                                            selectProduct={(data) => {
                                              let {sProduct} = this.state;

                                              let val = Object.assign({}, sProduct[i]);
                                          
                                              /* set, for instance, comment[1] to "some text"*/
                                              val['id'] = data['id'];
                                              val['name'] = data['name'];
                                              val['price'] = data['price_shipping'];
                                              val['grade'] = data['grade'];
                                              val['weight'] = data['weight'];

                                              sProduct[i] = val;
                                                         
                                              /* set the state to the new variable */
                                              this.setState({sProduct});
                                            }}
                                          />}
                                </Popup>}
                            </td>
                            <td><Input name='grade' value={this.state.sProduct[i].grade} readOnly/></td>
                            <td><Input name='weight' value={this.state.sProduct[i].weight} readOnly/></td>
                            <td><Input name='price' value={this.state.sProduct[i].price} readOnly/></td>
                            <td><Input name='consume'/></td>
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
        }}>제조 추가하기</Button>
      </div>
    )
  }
}

export default CreateOrder;