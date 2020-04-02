import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input } from 'reactstrap';
import Popup from "reactjs-popup";
import ProductModal from '../Modal/ProductModal';
import DatePicker from "react-datepicker";

//vos = value of supply (공급가액)
//vat = value added tax (부가세))
let d = {id: '', name: '', grade:'', weight:'', price: 0, quantity: 0};
let p = {id: '', name: ''};

class Create extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
			plantData: [[p]],
			plantData2: [[p]],
      sProduct1: [d],//소모 상품
			sProduct2: [d],//생산 상품
			date: new Date(),
    };
  }

  componentWillMount() {
  }



  getFamilyId(id, i, flag){
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
            this.getPlant(i, flag)
          })
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }

  getPlant(i, flag){
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
          let {plantData, plantData2, sProduct1, sProduct2} = this.state;
          if(data[1][0] === undefined) alert("창고에서 품목을 취급하지 않습니다")
          else {
						if(flag === 'consume') {
							sProduct1[i].plant = data[1][0].id;
							plantData[i] = data[1];
						}
						else {
							sProduct2[i].plant = data[1][0].id;
							plantData2[i] = data[1];
						}
							this.setState({plantData, plantData2, sProduct1, sProduct2});
          }
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }

  produceProduct() {
		const {sProduct1, sProduct2} = this.state;
    const date = this.convertDateFormat(this.state.date)
    console.log(sProduct1, sProduct2)
    fetch(process.env.REACT_APP_HOST+"/api/manufacture", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({sProduct1, sProduct2, date})
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
        this.props.history.push('/main/manufacture');
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요.');
        this.props.history.push('/login');
      } else {
        alert('에러로 인해 등록에 실패했습니다.')
      }
    });
	}
	
  convertDateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  render() {
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Manufacture.css"></link>
      <form>
			  <Row>
				  <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
								 <Col md="3" xs="2" sm="3">식품 가공</Col>
								 <Col md="9" xs="10" sm="9">
										<span className="date">
											<DatePicker
												className="datepicker"
												dateFormat="yyyy년 MM월 dd일"
												locale="ko"
												selected={this.state.date}
												onChange={(date) => { this.setState({ date }) }}
											/>
										</span>
									</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{overflowX : "auto", whiteSpace: "nowrap"}}>
                  <Table>
                    <thead>
                      <tr>
                          <th>생산품목명<span style={{color : "#FA5858"}}> *</span></th>
                          <th>창고<span style={{ color : "#FA5858"}}> *</span></th>
                          <th>판매 단가</th>
                          <th>수량<span style={{color : "#FA5858"}}> *</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.sProduct2.map(function (e, i) {
                          return (
                            <tr key={i}>
                              <td>
                                {<Popup
                                  trigger={<Input required name='name' value={this.state.sProduct2[i].name} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}} readOnly/>}
                                  modal>
                                  {close => <ProductModal index={i} close={close} login={()=>{this.props.history.push('/login')}} createProduct={() => {this.props.history.push('/product/create')}}
                                              selectProduct={(data) => {
                                                let {sProduct2} = this.state;

                                                let val = Object.assign({}, sProduct2[i]);

                                                /* set, for instance, comment[1] to "some text"*/
                                                val['id'] = data['id'];
                                                val['name'] = data['name'];
                                                val['price'] = data['price_shipping'];
                                                val['grade'] = data['grade'];
                                                val['weight'] = data['weight'];

                                                sProduct2[i] = val;

                                                /* set the state to the new variable */
																								this.setState({sProduct2});
																								this.getFamilyId(data['id'], i, 'manufacture');
                                              }}
                                            />}
                                  </Popup>}
                              </td>
                              <td>
                                <Input required value={this.state.sProduct2[i].plant} onChange={(e) => {
                                  let {sProduct2} = this.state;
                                  sProduct2[i].plant = e.target.value;
                                  this.setState({sProduct2})
                                }} type='select' name="plant">
                                  {
                                    this.state.plantData2[i].map((e, i) => {
                                      return <option key={i} value={e.id} >{e.name}</option>
                                    })
                                  }
                                </Input>
                              </td>
                              <td><Input name='price' value={this.state.sProduct2[i].price} readOnly/></td>
                              <td>
                                <Input required name='quantity' onChange={(e) => {
                                  let {sProduct2} = this.state;
                                  sProduct2[i] = Object.assign({}, sProduct2[i]);
                                  sProduct2[i].quantity = e.target.value;
                                  this.setState({sProduct2})
                                  }
                                } />
                              </td>
                            </tr>
                          )
                        }, this)
                      }
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col>소모 품목</Col>
                  <Col>
                    <div style={{float:"right"}}>
                      <Button block color="primary"
                        onClick={()=> {
                          let {sProduct1, plantData} = this.state;
													sProduct1.push(d);
													plantData.push([p]);
                          this.setState({
                            sProduct1
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
                          <th>품목명<span style={{color : "#FA5858"}}> *</span></th>
                          <th>창고<span style={{color : "#FA5858"}}> *</span></th>
                          <th>단가</th>
                          <th>수량<span style={{color : "#FA5858"}}> *</span></th>
                          <th>삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.sProduct1.map(function (e, i) {
                          return (
                            <tr key={i}>
                              <td>
                                {<Popup
                                  trigger={<Input required name='name' value={this.state.sProduct1[i].name} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}} readOnly/>}
                                  modal>
                                  {close => <ProductModal index={i} close={close} login={()=>{this.props.history.push('/login')}} createProduct={() => {this.props.history.push('/product/create')}}
                                              selectProduct={(data) => {
                                                let {sProduct1} = this.state;

                                                let val = Object.assign({}, sProduct1[i]);

                                                /* set, for instance, comment[1] to "some text"*/
                                                val['id'] = data['id'];
                                                val['name'] = data['name'];
                                                val['price'] = data['price_shipping'];
                                                val['grade'] = data['grade'];
                                                val['weight'] = data['weight'];
                                                //val['quantity'] = data['quantity'];

                                                sProduct1[i] = val;

                                                /* set the state to the new variable */
                                                this.setState({sProduct1});
                                                this.getFamilyId(data['id'], i, 'consume');
                                              }}
                                            />}
                                  </Popup>}
                              </td>
                              <td>
                                <Input required value={this.state.sProduct1[i].plant} onChange={(e) => {
                                  let {sProduct1} = this.state;
                                  sProduct1[i].plant = e.target.value;
                                  this.setState({sProduct1})
                                }} type='select' name="plant">
                                  {
                                    this.state.plantData[i].map((e, i) => {
                                      return <option key={i} value={e.id} >{e.name}</option>
                                    })
                                  }
                                </Input>
                              </td>
                              <td><Input name='price' value={this.state.sProduct1[i].price} readOnly/></td>
                              <td>
                                <Input required name='modifyQuantity' onChange={(e) => {
                                  let {sProduct1} = this.state;
                                  sProduct1[i] = Object.assign({}, sProduct1[i]);
                                  sProduct1[i].quantity = e.target.value;
                                  this.setState({sProduct1})
                                }} />
                              </td>
                              <td>
                                <Button block color="danger"
                                  onClick={()=> {
                                    let {sProduct1} = this.state;
                                    sProduct1.splice(i, 1);
                                    this.setState({
                                      sProduct1
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
                </div>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Button block color="primary">제조 추가하기</Button>
      </form>
      </div>
    )
  }
}

export default Create;
