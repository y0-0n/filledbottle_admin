import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, CardImg, CardTitle, CardSubtitle, Table } from 'reactstrap';
import Switch from "../Switch/Switch";
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
      checkdata: [],
      search: false,
      show: true,
      checks: [],
    };
    this.form = {

    }
  }

  componentWillMount() {
    this.getCustomer();
  }

  getCustomer() {
    this.setState({ search: false, set: true });
    fetch(process.env.REACT_APP_HOST + "/customer", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if (status === 200)
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      })
  }

  getUnsetCustomer() {
    this.setState({ search: false, set: false });
    fetch(process.env.REACT_APP_HOST + "/customer/unset", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        let status = data[0];
        if (status === 200)
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      })
  }

  deleteCustomer(id) {
    let c = window.confirm('위 고객을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => {
          if (response.status === 401) {
            return Promise.all([401])
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then(data => {
          let status = data[0];
          if (status === 200)
            this.getCustomer()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }



  activateCustomer(id) {
    let c = window.confirm('위 고객을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => {
          if (response.status === 401) {
            return Promise.all([401])
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then(data => {
          let status = data[0];
          if (status === 200)
            this.getUnsetCustomer()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  searchCustomer() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({ sdata: result, search: true });
  }

  changeShow() {
    if (this.state.show === true) this.setState({ show: false });
    else this.setState({ show: true });
  }

  render() {
    var data = this.state.search ? this.state.sdata : this.state.data;
    data.map((e, i) => {this.state.checks[i] = false});
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="8" xs="6" sm="6">
            <Input onChange={(e) => { this.setState({ keyword: e.target.value }) }} />
          </Col>
          <Col md="2" xs="3" sm="3">
            <Button block color="primary" onClick={() => { this.searchCustomer() }}>고객 검색</Button>
          </Col>
          <Col md="2" xs="3 " sm="3">
            <Button block color="primary" onClick={() => { this.props.history.push('/customer/create'); }}>고객 등록하기</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>고객 보기</Col>
                  <Col></Col><Col></Col>
                  <Col>
                    {this.state.set ?
                      "비활성화 고객 보기" :
                      "활성화 고객 보기"
                    }{this.state.set ?
                      <Switch id='1' isOn={this.state.set} handleToggle={this.getUnsetCustomer.bind(this)} /> :
                      <Switch id='1' isOn={this.state.set} handleToggle={this.getCustomer.bind(this)} />
                    }
                  </Col>
                  <Col>
                    {this.state.show ?
                      "카드로 보기" :
                      "리스트로 보기"
                    }<Switch id='2' isOn={this.state.show} handleToggle={() => this.changeShow()} />
                  </Col>
                  <Col>
                    <Button onClick={() => {
                      let {checkdata} = this.state;
                      for(var i = 0; i < this.state.checks.length; i++){
                        if(this.state.checks[i] === true){
                          checkdata[i] = data[i];
                        }
                      }
                      this.props.history.push({
                        pathname: '/main/message',
                        state: checkdata
                      }); 
                    }}>카카오톡 보내기</Button>
                  </Col>
                </Row>
              </CardHeader>
              {this.state.show ?
                <CardBody>
                  <div style={{ overflow: 'scroll' }}>
                    <Table style={{ minWidth: 600 }} hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>고객명</th>
                          <th>전화번호</th>
                          <th>HP</th>
                          <th>주소</th>
                          <th>수정</th>
                          <th>선택</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((e, i) => {
                          return (<tr style={{ cursor: 'pointer' }} key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.telephone}</td>
                            <td>{e.cellphone}</td>
                            <td>{e.address}</td>
                            <td><Button onClick={() => {this.props.history.push(`/main/customer/edit/:id}`)}}>수정</Button></td>
                            <td><input name='selection' type='checkbox' onClick={() => {
                              let {checks} = this.state;
                              checks[i] = !checks[i];
                              console.log(checks);
                            }}/></td>
                          </tr>)
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                :
                <CardBody>
                  <Row>
                    {data.map(function (e, i) {
                      return (
                        <Col key={i} lg="4" md="6" xs="12" sm="12">
                          <Card>
                            <CardHeader>
                              {e.name}
                            </CardHeader>
                            <CardImg top width="100%" src={e.file_name ? "http://211.62.225.216:4000/static/" + e.file_name : '318x180.svg'} alt="Card image cap" />
                            <CardBody>
                              <CardTitle><h3>고객명 : {e.name}</h3></CardTitle>
                              <CardSubtitle><h4>전화번호 : {e.telephone}</h4></CardSubtitle>
                              <CardSubtitle><h4>HP : {e.cellphone}</h4></CardSubtitle>
                              <CardSubtitle><h4>주소 : {e.address}</h4></CardSubtitle>
                              <Button block outline color="primary" onClick={() =>
                                this.props.history.push({
                                  pathname: '/main/sales/list',
                                  state: { name: e.name }
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
                </CardBody>
              }
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}



export default Customer;
