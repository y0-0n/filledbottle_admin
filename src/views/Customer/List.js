import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input,
  CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup,
  InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
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
const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //page: 1,
      //keyword: '',
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
    const {keyword} = this.props;

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
    const { keyword} = this.props;
    const page = this.props.pageNumbers;

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
      //page: x,
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
    this.getCustomer();
	}
	
	sendMessage() {
    fetch(process.env.REACT_APP_HOST + `/api/kakao/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {

				console.warn(response)
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
				let status = data[0];
        if (status === 200) {
					console.warn("성공")
				}
        else {
					console.warn(data[0]);
          alert(' 오류');
        }
      });
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
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Customer.css"></link>
        <Row>
          <Col>
          <Card>
              <CardHeader>
                <Row>
                  <Col>고객 상세 검색</Col>
                  <Col md="3" xs="6" sm="6">
                    <InputGroup>
                      <Input onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
                      <InputGroupAddon addonType="append">
                        <Button block color="primary" onClick={() => { this.searchCustomer(this.props.keyword) }}><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Row>
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
                  <Col>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle caret color="primary">
                        더 보기
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => { this.props.history.push('/main/customer/list/unset') }}>비활성화</DropdownItem>
                        <DropdownItem onClick={() => {
                          /*let { checkdata } = this.state;
                          for (var i = 0; i < this.state.checks.length; i++) {
                            if (this.state.checks[i] === true) {
                              checkdata[i] = data[i];
                            }
                          }
                          this.props.history.push({
                            pathname: '/main/message',
                            state: checkdata
													});*/
													alert('A')
													this.sendMessage();
                        }}>카카오톡 보내기</DropdownItem>
                        <DropdownItem onClick={() => { this.props.history.push('/customer/create'); }}>고객등록</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
									<Col>
										<div style={{float: "right"}}>
											<Button onClick={() => { this.props.history.push('/customer/create'); }} color="primary">고객 등록</Button>
                    </div>
									</Col>
                </Row>
                <hr></hr>
                <div>
                  <Table className="ListTable" hover>
                    <thead>
                      <tr>
                        <th className="list-hidden">no.</th>
                        <th>고객명</th>
                        <th className="list-hidden">연락처</th>
                        <th>주소</th>
                        {//<th>수정</th>
                        }
                        <th>선택</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, i) => {
                        return (<tr onClick={() => {this.props.history.push(`/main/customer/${e.id}`)}} style={{ cursor: 'pointer' }} key={e.id}>
                          <td className="list-hidden">{e.id}</td>
                          <td>{e.name}</td>
                          <td className="list-hidden">{e.cellphone}</td>
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
                  <div style={{width: "100%", textAlign : "center"}}>{this.state.data.length === 0? <span >"현재 고객 목록이 없습니다."</span> : null}</div>
                </div>
              </CardBody>
              <CardFooter>
                <Pagination style={{justifyContent: 'center'}}>
                  {this.props.pageNumbers === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers-1))}}/>
                  </PaginationItem>
                  }
                  {this.props.pageNumbers === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.props.pageNumbers === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {this.props.pageNumbers !== 1 && this.props.pageNumbers!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.props.pageNumbers+e)
                    return (<PaginationItem key={i} active={this.props.pageNumbers === this.props.pageNumbers+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+e)); console.log(this.props.pageNumbers)}}>
                      {this.props.pageNumbers+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.props.pageNumbers === this.state.total ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+1))}}/>
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
