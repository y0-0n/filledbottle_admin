import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroup, InputGroupAddon } from 'reactstrap';
import ProductModal from '../Modal/ProductModal';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";

class Modify extends Component {
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
      current: 0,
      sProduct :[],
      productName :'',
      price_shipping: '',
      file_name : "/assets/img/noimage.jpg",
    };
  }

  componentWillMount() {
		this.getPlant();
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
                  {console.log(this.state.sProduct)}
                  {<Popup
                    trigger={<Input require placeholder={ "품목을 선택해주세요" } value={this.state.productName} style={{cursor: 'pointer', backgroundColor: '#ffffff', width:"30%"}} onChange={() => {console.log('S')}}/>}
                    modal>
                      
                    {close => <ProductModal close={close} login={()=>{this.props.history.push('/login')}} createProduct={() => {this.props.history.push('/product/create')}}
                      selectProduct={(data) => {
                        console.log(data)
                        let {name, price_shipping, file_name} = data;
                        this.setState({
                          productName: name,
                          price_shipping,
                          file_name : "http://211.62.225.216:4000/static/" + file_name
                        })
                      }}/>}
                  </Popup>}
                </div>
              </div>
              <div className="sell-discount">
                <div style={{display: "inline-block"}}>
                  <img src={this.state.file_name}/>
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
                  selected={this.state.first_date2}
                  onChange={(first_date2) => { this.setState({ first_date2 }) }}
                />
              </div>
            </div>
          </div>
        </div>
        <Button color="primary" style={{width:"100%"}}>수정하기</Button>
        </div>
    )
  }
}

export default Modify;

