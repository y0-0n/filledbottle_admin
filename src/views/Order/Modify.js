import React, { Component } from 'react';
import { Button, Input, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';
import ProductModal from '../Modal/ProductModal';
import Popup from "reactjs-popup";

let def = {id: '', name: '', quantity: 0, price: 0, tax: 0};
let d = {id: '', name: '', plant: 0, quantity: 0, price: 0, vos: 0, vat: 0, tax: false, sum: 0};
let p = {id: '', name: ''};


class OrderModify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plantData: [[p]],
      product: [],
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


  getPlant(i){
    const {productFamily} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/plant/searchPlant", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({productFamily})
    })
      .then(response => {
        if(response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if(status === 200){
          let {plantData} = this.state;
          plantData[i] = data[1];
          this.setState({plantData});
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }

  getFamilyId(id, i){
    fetch(process.env.REACT_APP_HOST+"/api/product/familyId/"+id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if(response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if(status === 200){
          this.setState({productFamily: data[1][0].id}, () => {
            this.getPlant(i)
          })
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }


  getData(id) {
    fetch(process.env.REACT_APP_HOST+"/order/detail/"+id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
        data[1].productInfo.map((e,i) => {
          e['price_shipping'] = e['price'] / e['quantity'];
          this.getFamilyId(e.productId, i)
        })
        this.setState({data: data[1]})

      } else if(status === 401) {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      } else if(status === 400) {
        alert('존재하지 않는 주문입니다.');
        this.props.history.push('/main/sales/list')
      }
    });
  }

  numberWithCommas(x) {
    if(!x) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  convertDateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  modifyOrder() {
    let {orderInfo, productInfo} = this.state.data;
    fetch(process.env.REACT_APP_HOST+"/order/modify/"+this.props.match.params.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({orderInfo, productInfo})
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
        this.props.history.push('/main/sales/order/'+this.props.match.params.id);
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      } else if(status === 400) {
        alert('존재하지 않는 주문입니다.');
        this.props.history.push('/main/sales/list')
      }
    });
  }

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];
    var d = new Date(orderInfo['date']);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    console.log(productInfo);
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/OrderDetail.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                {this.props.match.params.id}번 주문
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
                    <td>
                      <Input defaultValue={orderInfo['telephone']} type="tel" onChange={(e) => {orderInfo['telephone'] = e.target.value}} />
                    </td>
                    <th>HP</th>
                    <td className="TableRight">
                      <Input defaultValue={orderInfo['cellphone']} type="tel" onChange={(e) => {orderInfo['cellphone'] = e.target.value}} />
                    </td>
                  </tr>
                  <tr className="TableBottom">
                    <th>배송지</th>
                    <td>
                      <Input defaultValue={orderInfo['address']} onChange={(e) => {orderInfo['address'] = e.target.value}} />
                    </td>
                    <th>요청사항</th>
                    <td className="TableRight">
                      <Input defaultValue={orderInfo['comment']} onChange={(e) => {orderInfo['comment'] = e.target.value}} />
                    </td>
                  </tr>
                </tbody>
                </Table>
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
                <Col>품목을 입력하세요</Col>
                <Col>
                  <div style={{float : "right"}}>
                    <Button block color="primary"
                      onClick={()=> {
                        let sProduct = productInfo;
                        sProduct.push(def);
                        this.setState({
                          sProduct: productInfo
                        })}}>
                      추가하기
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div style={{overflowX : "auto", whiteSpace: "nowrap"}}>
                <Table>
                  <thead>
                    <tr>
                      <th>품목명</th>
                      <th>창고</th>
                      <th>수량</th>
                      <th>판매 단가</th>
                      <th>공급가액</th>
                      <th>부가세</th>
                      <th>과세</th>
                      <th>총액</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productInfo.map((e, i) => {
                      console.warn(e)
                      return ( <tr key={i}>
                        <td>
                          {<Popup
                            trigger={<Input name='name' value={productInfo[i].name || ''} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => console.log('S')} readOnly/>}
                            modal>
                            {close => <ProductModal index={i} close={close}
                                        selectProduct={(data) => {
                                          let sProduct = productInfo;

                                          let val = Object.assign({}, sProduct[i]);

                                          /* set, for instance, comment[1] to "some text"*/
                                          val['productId'] = data['id'];
                                          val['name'] = data['name'];
                                          val['price_shipping'] = data['price_shipping'];
                                          sProduct[i] = val;

                                          /* set the state to the new variable */
                                          this.setState({productInfo: sProduct});
                                          this.getFamilyId(data['id'], i)
                                        }}/>}
                          </Popup>}
                        </td>
                        <td>
                          <Input value={e['plantId']} onChange={(e) => {
                            let sProduct = productInfo;
                            sProduct[i].plantId = e.target.value;
                            this.setState({productInfo : sProduct})
                          }} type='select' name="plant">
                            {
                              this.state.plantData[i] !== undefined? this.state.plantData[i].map((e, i) => {
                                return <option key={i} value={e.id} >{e.name}</option>
                              }) : null
                            }
                          </Input>
                        </td>
                        <td>
                          <Input name='quantity' style={{width: 100, display: 'inline-block'}} value={productInfo[i].quantity || 0} onChange={(e)=> {
                          let sProduct = productInfo;
                          sProduct[i].quantity > 0 ? sProduct[i].quantity = e.target.value :  sProduct[i].quantity= Math.abs(e.target.value);
                          //sProduct[i].quantity = e.target.value;
                          this.setState({productInfo: sProduct})}}
                        /><Button onClick={(e)=> {
                          let sProduct = productInfo;
                          sProduct[i].quantity > 0 ? --sProduct[i].quantity :  sProduct[i].quantity = 0;
                          this.setState({
                            productInfo: sProduct
                          })}}>
                          -
                        </Button>
                        <Button onClick={(e)=> {
                          let sProduct = productInfo;
                          ++sProduct[i].quantity;
                          this.setState({
                            productInfo: sProduct
                          })}}>
                          +
                        </Button>
                        </td>
                        <td>{this.numberWithCommas(e['price_shipping'])}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 10 / 11 : e['price_shipping'] * e['quantity']))}</td>
                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price_shipping'] * e['quantity'] * 1 / 11 : 0))}</td>
                        <td><Input name='tax' type='checkbox' defaultChecked={e.tax} onClick={() => {
                          let sProduct = productInfo;
                          sProduct[i].tax = !sProduct[i].tax;
                          this.setState({productInfo: sProduct})}}
                          />
                        </td>
                        <td>{this.numberWithCommas(e['price'] = e['price_shipping'] * e['quantity'])}</td>
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
              </div>
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Button block color="primary" onClick={() => {
          this.modifyOrder();
        }}>주문 수정하기</Button>

      </div>
    )
  }
}

export default OrderModify;
