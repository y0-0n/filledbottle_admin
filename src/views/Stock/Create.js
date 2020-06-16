import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroup, InputGroupAddon } from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import ProductModal from '../Modal/ProductModal';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";


class Create extends Component {
  constructor(props) {
    super(props);
    this.form = {
      productId : '',
      plant : '',
      type : '외주생산',
      quantity: 0,
      price : 0,
    };

    this.state = {
			plantData: [],
			current: 0
    };
  }

  componentWillMount() {
		this.getPlant();
	}
	
  createStock() {
		fetch(process.env.REACT_APP_HOST+"/api/stock", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(this.form)
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
        this.props.history.push('/main/stock');
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요.')
        this.props.history.push('/login')
      } else {
        alert('에러로 인해 등록에 실패했습니다.')
      }
    });
  }

	getPlant(){
    fetch(process.env.REACT_APP_HOST+"/api/plant", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
				this.setState({plantData: data[1]});
				this.form.plant = data[1][0].id
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}
	
	getLastStock() {
		fetch(process.env.REACT_APP_HOST+"/api/stock/last/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({plant: this.form.plant, productId: this.form.productId})
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
				this.setState({current: data[1].current});
				this.form.current = data[1].current;
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}

  render() {
		const {plantData} = this.state;
		console.log(this.state.current)
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div className="form-card">
          <div className="form-title">재고 등록</div>
          <div className="form-innercontent">
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">품목명</label>
                <div className="sell-input">
                  <Input style={{width: "30%"}}/>
                </div>
              </div>
              <div className="sell-discount">
                <div style={{display: "inline-block"}}>
                  <img src="/assets/img/noimage.jpg"/>
                </div>
                <div style={{display: "inline-block"}}>
                  <div className="product-info">
                    <label>카테고리</label>
                    <input></input>
                  </div>
                  <div className="product-info">
                    <label>품목군</label>
                    <input></input>
                  </div>
                  <div className="product-info">
                    <label>판매단가</label>
                    <input></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">구분</label>
              <div className="sell-input">
                <Input style={{width: "30%"}} readOnly/>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">재고수</label>
                <div className="sell-input">
                  <InputGroup>
                    <Input type="number" placeholder="숫자만 입력" required onChange={(e) => this.form.price = e.target.value/*this.changePrice.bind(this)*/} />
                    <InputGroupAddon addonType="append">
                      개
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">유통기한</label>
              <div className="sell-input">
                <DatePicker
                  className="datepicker"
                  dateFormat="yyyy년 MM월 dd일"
                  locale="ko"
                  selected={this.state.first_date}
                  onChange={(first_date) => { this.setState({ first_date }) }}
                />
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">제조일자</label>
              <div className="sell-input">
                <DatePicker
                  className="datepicker"
                  dateFormat="yyyy년 MM월 dd일"
                  locale="ko"
                  selected={this.state.first_date}
                  onChange={(first_date) => { this.setState({ first_date }) }}
                />
              </div>
            </div>
          </div>
        </div>
        <Button color="primary" style={{width:"100%"}} onClick={() => {this.createStock();}}>등록하기</Button>
      {/*<link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col md="9" lg="9" xl="8">
						<Card>
							<CardHeader>
									재고 입고 등록하기
							</CardHeader>
							<CardBody>
								<Table className="ShowTable">
									<tbody>
										<tr>
											<th>품목명</th>
											<td>
												{<Popup
													trigger={<Input value={this.state.name} onChange={(e) => this.form.name = e.target.value} />}
													modal>
													{close => <ProductModal close={close} login={() => { this.props.history.push('/login') }} createProduct={() => { this.props.history.push('/product/create') }}
														selectProduct={(data) => {
															this.setState({name : data['name']})
															this.form.productId = data['id'];;
															this.getLastStock();
														}}
													/>}
												</Popup>}
											</td>
											<th>창고</th>
											<td>
												<Input onChange={(e) => {this.form.plant = e.target.value;}} type='select'>
													{
														plantData.map((e,i) => {
															return (
																<option key={i} value={e.id}>{e.name}</option>
															)
														})
													}
												</Input>
											</td>
										</tr>
										<tr>
                      <th>재고</th>
                      <td><Input value={this.state.current} readOnly/></td>
											<th>유형</th>
											<td>
												<Input defaultValue={this.form.type} onChange={(e) => {this.form.type = e.target.value}} type='select'>
													<option value="외주생산">외주생산</option>
													<option value="자가생산">자가생산</option>
													<option value="상품매입">상품매입</option>
												</Input>
											</td>
										</tr>
										<tr>
											<th>입고수량</th>
											<td >
												<Input onChange={(e) => this.form.quantity = e.target.value} />
											</td>
											<th>매입원가</th>
											<td >
												<Input onChange={(e) => this.form.price = e.target.value} />
											</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
							<CardFooter>
								<Button block outline color="primary" onClick={() => {this.createStock();}}>추가하기</Button>
							</CardFooter>
						</Card>
					</Col>
        </Row>*/}
        </div>
    )
  }
}

export default Create;

