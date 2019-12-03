import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, CardImg, CardTitle, CardSubtitle, Table, Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
const listCount = 5;

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      number: 1,
      keyword: 'a',
      set: true,
      checkdata: [],
      show: true,
      checks: [],
    };
    this.form = {

    }
  }

  componentWillMount() {
    this.getCustomer();
  }

  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/customer/total/"+(this.state.set ? '' : 'unset/')+this.state.keyword, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
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
          this.setState({total: Math.ceil(data[1][0].total/listCount)})
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer/"+(this.state.set ? '' : 'unset/')+this.state.number+'/'+this.state.keyword, {
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
        this.getTotal();
      })
  }


  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getCustomer();
    });
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
    let {keyword} = this;
    this.setState({keyword})
    this.getCustomer();
  }

  changeShow() {
    this.setState({show: !this.state.show})
  }

  changeSet() {
    this.setState({set: !this.state.set}, () => {
      this.getCustomer();
    });
  }

  render() {
    var data = this.state.data;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    data.map((e, i) => {this.state.checks[i] = false});
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="8" xs="6" sm="6">
            <Input onChange={(e) => { this.keyword = e.target.value }} />
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
                    }
                    <Switch id='1' isOn={this.state.set} handleToggle={this.changeSet.bind(this)} />
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
              <CardBody>
              {this.state.show ?
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
                :
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
              }
              </CardBody>
              <CardFooter>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.number-1)}}/>
                  </PaginationItem>
                  {this.state.number === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.state.number === 2 ? arr.forEach(x => arr1.push(x+1)) : null}   
                  {this.state.number !== 1 && this.state.number!== 2 ? arr.forEach(x => arr1.push(x)) :null }    
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.state.number+e)
                    return (<PaginationItem key={i} active={this.state.number === this.state.number+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.state.number+e)}}>
                      {this.state.number+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.state.number+1)}}/>
                  </PaginationItem>
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}



export default Customer;
