import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroup, InputGroupAddon } from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import ProductModal from '../Modal/ProductModal';
import Popup from "reactjs-popup";
import DatePicker from "react-datepicker";
import {handleState} from '../common';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
			plantData: [],
      current: 0,
      sProduct :[],
      productName :'',
      price_shipping: '',
      file_name : "/assets/img/noimage.jpg",
      data : {
        name : '',
        productId : 0,
        plant : '',
        date_manufacture: '',
        expiration: '',
        type : '자가생산',
        quantity: 0,
      }
    };
  }

  componentWillMount() {
	}

	convertDateFormat(date) {
    if(date === undefined) alert('날짜를 입력해주세요') 
    else return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  createStock() {
		//TODO : 구분명 편집 필요
    this.state.data.name = this.state.productName;
		this.state.data.productId = this.state.productId;
		this.state.data.expiration = this.convertDateFormat(this.state.expiration);
		this.state.data.date_manufacture = this.convertDateFormat(this.state.date_manufacture);
		this.state.data.plant = this.props.plant;
    console.log(this.state)
    if(this.getDiffDate(this.state.date_manufacture, this.state.expiration) < 0 ) alert('제조일자와 유통기한을 확인해주세요.')
    else{
      fetch(process.env.REACT_APP_HOST+"/api/stock", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(this.state.data)
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
  }

  getDiffDate(date_manufacture, date_expiration) {
    var dm = new Date(date_manufacture);
    var de = new Date(date_expiration);
    var diffDate = Math.ceil((de.getTime() - dm.getTime())/(1000*3600*24));

    return diffDate
  }

  // handleState (e) {
  //   let {data} = this.state;
  //   data[e.target.name] = e.target.value
  //   this.setState({data});
  // };

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
                <label className="sell-label">품목명 <span style={{color : "#FA5858"}}>*</span></label>
                <div className="sell-input">
                  {<Popup
                    trigger={<Input className="stock-input" required placeholder={ "품목을 선택해주세요" } value={this.state.productName} style={{cursor: 'pointer', backgroundColor: '#ffffff'}} onChange={() => {console.log('S')}}/>}
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
                  <img style={{width: '300px'}} src={this.state.file_name}/>
                </div>
                <div style={{display: "inline-block"}}>
                  {/* <div className="product-info">
                    <label>카테고리</label>
                    <input></input>
                  </div> */}
                  <div className="product-info">
                    <label>품목군</label>
                    <input className="stockproduct-input" value={this.state.familyName}/>
                  </div>
                  <div className="product-info">
                    <label>판매단가</label>
                    <input className="stockproduct-input" value={this.state.price_shipping}></input>
                  </div>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">구분</label>
              <div className="sell-input">
                <Input className="stock-input" value={this.state.productName} readOnly/>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">재고수 <span style={{color : "#FA5858"}}>*</span></label>
                <div className="sell-input">
                  <InputGroup>
                    <Input type="number" placeholder="숫자만 입력" name="quantity" value={this.state.data.quantity} required onChange={handleState.bind(this)} />
                    <InputGroupAddon addonType="append">
                      개
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">제조일자 <span style={{color : "#FA5858"}}>*</span></label>
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
            <div className="sell-list">
              <label className="sell-label">유통기한 <span style={{color : "#FA5858"}}>*</span></label>
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
          </div>
        </div>
        <Button color="primary" style={{width:"100%"}} onClick={() => {this.createStock();}}>등록하기</Button>
      </div>
    )
  }
}

export default Create;

