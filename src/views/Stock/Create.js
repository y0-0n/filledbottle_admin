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
			date_manufacture: '',
			expiration: '',
      type : '자가생산',
      quantity: 0,
    };

    this.state = {
			plantData: [],
      current: 0,
      sProduct :[],
      productName :'',
      price_shipping: '',
      file_name : "/assets/img/noimage.jpg",
    };
  }

  componentWillMount() {
	}

	convertDateFormat(date) {
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  createStock() {
		//TODO : 구분명 편집 필요
    this.form.name = this.state.productName;
		this.form.productId = this.state.productId;
		this.form.expiration = this.convertDateFormat(this.state.expiration);
		this.form.date_manufacture = this.convertDateFormat(this.state.date_manufacture);
		this.form.plant = this.props.plant;
		console.warn(this.form)

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

  render() {
    const {plantData} = this.state;
    if(this.props.plant === 'all') this.props.history.push('/main/stock')
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div className="form-card">
				<div className="form-title">재고 등록 ({this.props.plant})</div>
          <div className="form-innercontent">
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">품목명</label>
                <div className="sell-input">
                  {console.log(this.state.sProduct)}
                  {<Popup
                    trigger={<Input require placeholder={ "품목을 선택해주세요" } value={this.state.productName} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}}/>}
                    modal>
                      
                    {close => <ProductModal close={close} login={()=>{this.props.history.push('/login')}} createProduct={() => {this.props.history.push('/product/create')}}
                      selectProduct={(data) => {
												let {name, price_shipping, file_name, familyName, id} = data;
                        this.setState({
													productId: id,
                          productName: name,
													price_shipping,
													familyName,
                          file_name : process.env.REACT_APP_HOST+"/static/" + file_name
                        });
                      }}/>}
                  </Popup>}
                </div>
              </div>
              <div className="sell-discount">
                <div style={{display: "inline-block"}}>
                  <img src={this.state.file_name}/>
                </div>
                <div style={{display: "inline-block"}}>
                  {/* <div className="product-info">
                    <label>카테고리</label>
                    <input></input>
                  </div> */}
                  <div className="product-info">
                    <label>품목군</label>
                    <input value={this.state.familyName}/>
                  </div>
                  <div className="product-info">
                    <label>판매단가</label>
                    <input value={this.state.price_shipping}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">구분</label>
              <div className="sell-input">
                <Input value={this.state.productName} style={{width: "30%"}} readOnly/>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">재고수</label>
                <div className="sell-input">
                  <InputGroup>
                    <Input type="number" placeholder="숫자만 입력" required onChange={(e) => this.form.quantity = e.target.value/*this.changePrice.bind(this)*/} />
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
                  selected={this.state.expiration}
                  onChange={(date) => { this.setState({ expiration: date }) }}
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
                  selected={this.state.date_manufacture}
                  onChange={(date) => { this.setState({ date_manufacture: date }) }}
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

