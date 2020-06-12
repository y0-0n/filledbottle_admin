import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import DatePicker from "react-datepicker";


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Pay.css"></link>
        <div className="pay-card">
          <p className="pay-text">
            부농부농 서비스 이용기간이 만료 되었습니다. <br></br>
            더 많은 서비스 사용을 원하신다면 기간을 연장해주세요.
          </p>
          <div className="listcard">
            <div>1개월 결제하기</div>
            <div style={{fontSize: "40px", marginBottom: "10px"}}>월 <strong>50,000</strong> 원</div>
            <Button color="primary">결제하기</Button>
          </div>
          <div className="listcard">
            <div>6개월 결제하기</div>
            <div style={{fontSize: "40px", marginBottom: "10px"}}>월 <strong>45,000</strong> 원</div>
            <Button color="primary">결제하기</Button>
          </div>
          <div className="listcard">
            <div>1년 결제하기</div>
            <div style={{fontSize: "40px", marginBottom: "10px"}}>월 <strong>40,000</strong> 원</div>
            <Button color="primary">결제하기</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default List;
