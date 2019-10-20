import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, CardImg, CardTitle, CardSubtitle } from 'reactstrap';

/*

  GET /customer/state

  -> this.state.data

  id : 주문 번호
  name : 고객 이름
  telephone : 전화번호
  cellphone : HP
  address : 주소
  이미지

*/

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sdata: [],
      search: false,
    };
    this.form = {

    }
  }
  
  componentWillMount() {
    this.getCustomer();
  }

  getCustomer() {
    this.setState({set: true});
    fetch(process.env.REACT_APP_HOST+"/customer", {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
    })
      .then(response => {
        return Promise.all([response.status, response.json()]);
      })
      .then(data => {
        let status = data[0];
        if(status === 200)
          this.setState({data: data[1]});
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      })
  }

  getUnsetCustomer() {
    this.setState({set: false});
    fetch(process.env.REACT_APP_HOST+"/customer/unset", {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',
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

  activateCustomer(id) {
    let c = window.confirm('위 고객을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/customer", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(data => {console.warn(data); this.getUnsetCustomer()});
    }
  }

  searchCustomer() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  render() {
    console.log(this.state.data)
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
            {this.state.set ?
              <Col md="2" xs="3 " sm="3">
                <Button block color="primary" onClick={()=> {this.getUnsetCustomer()}}>비활성화 고객 보기</Button>
              </Col> :
              <Col md="2" xs="3 " sm="3">
                <Button block color="primary" onClick={()=> {this.getCustomer()}}>활성화 고객 보기</Button>
              </Col> 
            }
        </Row>

        <Row className="mb-5">
        {
          data.map(function (e) {
            console.log(e)
          return (
            <Col key={e.name}  lg="4" md="6" xs="12" sm="12">
              <Card>
                <CardHeader>
                  {e.name}
                </CardHeader>
                <CardImg top width="100%" src={e.file_name ? "http://211.62.225.216:4000/static/"+e.file_name : '318x180.svg'} alt="Card image cap"/>
                <CardBody>
                  <CardTitle><h3>고객명 : {e.name}</h3></CardTitle>
                  <CardSubtitle><h4>전화번호 : {e.telephone}</h4></CardSubtitle>
                  <CardSubtitle><h4>HP : {e.cellphone}</h4></CardSubtitle>
                  <CardSubtitle><h4>주소 : {e.address}</h4></CardSubtitle>
                  <Button block outline color="primary" onClick={() =>
                    this.props.history.push({
                      pathname: '/main/sales/list',
                      state: {name: e.name}
                    })}
                  >주문 조회</Button>
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>고객 분석</Button>
                </CardBody>
                {this.state.set ?
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deleteCustomer(e.id)}>고객 비활성화</Button>
                </CardFooter> :
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.activateCustomer(e.id)}>고객 활성화</Button>
                </CardFooter>
              }  
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
