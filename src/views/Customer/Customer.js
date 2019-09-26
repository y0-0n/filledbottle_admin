import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, CardImg, CardTitle, CardSubtitle } from 'reactstrap';
import axios from 'axios';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sdata: [],
      search: false,
      selectedFile : null,
    };
    this.form = {

    }
  }
  
  componentWillMount() {
    this.getCustomer();
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})})
  }

  deleteCustomer(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/customer", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(data => {console.warn(data); this.getCustomer()});
    }
  }

  searchCustomer() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  handleFileInput(e){
    this.setState({
      selectedFile : e.target.files[0],
    })
  }

  handlePost(){
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);

    return axios.post("/api/upload", formData).then(res => {
      alert('성공')
    }).catch(err=> {
      alert('실패다')
    })
  }

  render() {
    var data = this.state.search ? this.state.sdata : this.state.data;
    return (
      <div className="animated fadeIn">
        
        <Row className="mb-5">
            <Col md="8" xs="6" sm="6">
              <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}/>
            </Col>
            <Col md="2" xs="3" sm="3">
              <Button block color="primary" onClick={()=> {this.searchCustomer()}}>고객 검색</Button>
            </Col>
            <Col md="2" xs="3 " sm="3">
              <Button block color="primary" onClick={()=> {this.props.history.push('/customer/create');}}>등록하기</Button>
            </Col>
        </Row>

        <Row className="mb-5">
        {
          data.map(function (e) {
          return (
            <Col key={e.id}  lg="4" md="6" xs="12" sm="12">
              <Card>
                <CardHeader>
                  {e.name}
                </CardHeader>
                <CardImg top width="100%" src={"318x180.svg"} alt="Card image cap"/>
                <Input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                <Button onClick={this.handlePost()}>사진 업로드</Button>
                <CardBody>
                  <CardTitle><h3>고객명 : {e.name}</h3></CardTitle>
                  <CardSubtitle><h4>전화번호 : {e.telephone}</h4></CardSubtitle>
                  <CardSubtitle><h4>HP : {e.cellphone}</h4></CardSubtitle>
                  <CardSubtitle><h4>주소 : {e.address}</h4></CardSubtitle>
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>주문 조회</Button>
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>고객 분석</Button>
                </CardBody>
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deleteCustomer(e.id)}>고객 삭제</Button>
                </CardFooter>
              </Card>
            </Col>)
          }.bind(this))
        }
        </Row>

      </div>
    )
  }
}

export default Customer;
