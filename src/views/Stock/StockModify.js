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
      type : '자가생산',
      quantity: 0,
      price : 0,
    };

    this.state = {
			data: [{}],
      current: 0,
      sProduct :[],
      productName :'',
      price_shipping: '',
      file_name : "/assets/img/noimage.jpg",
    };
  }

  componentWillMount() {
    const {stockId} = this.props.match.params;
		this.getStockDetail(stockId);
	}

  getStockDetail(stockId) {
    fetch(process.env.REACT_APP_HOST+"/api/stock/"+stockId, {
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
      data[1][0].expiration = new Date(data[1][0].expiration);
      data[1][0].date_manufacture = new Date(data[1][0].date_manufacture);
      if(status === 200)
        this.setState({data: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

  render() {
    let {data} = this.state;
    data = data[0];
    console.warn(data)
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
                  <Input placeholder={ "품목을 선택해주세요" } value={data.productName} style={{width:"30%"}} readOnly/>
                </div>
              </div>
            </div>
            <div className="sell-list">
              <label className="sell-label">구분</label>
              <div className="sell-input">
                <Input value={data.name} style={{width: "30%"}} readOnly/>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">입고 수량</label>
                <div className="sell-input">
                  <InputGroup>
                    <Input type="number" value={data.initial_quantity} readOnly/>
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
                  selected={data.expiration}
                  onChange={(expiration) => { data.expiration = expiration; this.setState({ data: [data] }); }}
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
                  selected={data.date_manufacture}
                  onChange={(date_manufacture) => { data.date_manufacture = date_manufacture; this.setState({ data: [data] }); }}
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

