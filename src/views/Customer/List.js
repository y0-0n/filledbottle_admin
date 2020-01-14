import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, CardImg, CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup } from 'reactstrap';
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

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      keyword: '',
      checkdata: [],
      checks: [],
    };
    this.form = {
    }
  }

  componentWillMount() {
    this.getCustomer();
  }

  getTotal() {
    const {keyword} = this.state;

    fetch(process.env.REACT_APP_HOST+"/customer/total", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({keyword})
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
    const {page, keyword} = this.state;

    fetch(process.env.REACT_APP_HOST+"/customer/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({page, keyword})
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
      page: x,
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
            this.getCustomer()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  searchCustomer() {
    let {keyword} = this;
    this.setState({keyword, page: 1}, () => {
      this.getCustomer();
    })
  }

  /*changeSet() {
    this.setState({set: !this.state.set, number: 1}, () => {
      this.getCustomer();
    });
  }*/

  render() {
    var data = this.state.data;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    data.map((e, i) => {this.state.checks[i] = false});
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
          <Card>
              <CardHeader>
                <Row>
                  <Col>고객 상세 검색</Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.props.history.push('/customer/create'); }}>고객 등록</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <th style={{textAlign: "center"}}>그룹</th>
                      <td>
                        <FormGroup>
                          <Input type="select" name="group" id="groupSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </td>
                    </tr>
                    <tr>
                      <th style={{textAlign: "center"}}>고객명</th>
                      <td colSpan="3"><Input onChange={(e) => { this.keyword = e.target.value }} /></td>
                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col md="2" xs="3" sm="3">
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button block color="primary" onClick={() => { this.searchCustomer() }}>고객 검색</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>고객 보기</Col>
                  <Col></Col><Col></Col><Col></Col>
                  {/*
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
                  </Col>*/}
                  <Col><Button block color="primary" onClick={() => {this.props.history.push('/main/customer/list/unset')}}>비활성화 고객 보기</Button></Col>
                  <Col>
                    <Button block color="primary" onClick={() => {
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
                <div style={{ overflow: 'scroll' }}>
                    <Table style={{ minWidth: 600 }} hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>고객명</th>
                          <th>전화번호</th>
                          <th>HP</th>
                          <th>주소</th>
                          {//<th>수정</th>
                          }
                          <th>선택</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((e, i) => {
                          return (<tr style={{ cursor: 'pointer' }} key={e.id}>
                            <td>{e.id}</td>
                            <td onClick={() => {this.props.history.push(`/main/customer/${e.id}`)}}>{e.name}</td>
                            <td>{e.telephone}</td>
                            <td>{e.cellphone}</td>
                            <td>{e.address}</td>
                            {//<td><Button onClick={() => {this.props.history.push(`/main/customer/edit/:id}`)}}>수정</Button></td>
                            }
                            <td><input name='selection' type='checkbox' onClick={() => {
                              let {checks} = this.state;
                              checks[i] = !checks[i];
                            }}/></td>
                          </tr>)
                        })}
                      </tbody>
                    </Table>
                  </div>
              </CardBody>
              <CardFooter>
                <Pagination>
                  {this.state.page === 1 ? '' : 
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.page-1)}}/>
                  </PaginationItem>
                  }
                  {this.state.page === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.state.page === 2 ? arr.forEach(x => arr1.push(x+1)) : null}   
                  {this.state.page !== 1 && this.state.page!== 2 ? arr.forEach(x => arr1.push(x)) :null }    
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.state.page+e)
                    return (<PaginationItem key={i} active={this.state.page === this.state.page+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.state.page+e)}}>
                      {this.state.page+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.state.page === this.state.total ? '' : 
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.state.page+1)}}/>
                  </PaginationItem>}     
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}



export default List;