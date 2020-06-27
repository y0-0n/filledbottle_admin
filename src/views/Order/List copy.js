import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input, NavItem, Nav, NavLink,
   CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup, Badge,
   InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import { actionCreators } from '../../reducer';


   /*

  GET /order/state

  -> this.state.orderData

  id : 주문 번호
  state : 주문 상태
  date : 출하 일자
  price : 주문 총액
  name : 고객 이름
  orderDate : 주문 일자

*/

const stateKor = {
  order: '주문',
  shipping: '출하',
  refund: '환불',
  cancel: '취소'
}
const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 1,
      process: "all",
      orderData: [],
      //page: 1,
      total: 0,
      totalData: 0,
      //keyword: '',
      first_date: (new Date(new Date().getTime() - 60*60*24*1000*30*4)),
      last_date: new Date(),
      checks: []
    };
    //this.keyword = '';
	}
	getCafe24Orders() {
    // 로그인 유저의 토큰 받아오기
		// fetch("https://cors-anywhere.herokuapp.com/https://ast99.cafe24api.com/api/v2/oauth/token", {
    //   method: "POST",
    //   headers: {
    //     'Authorization': `Basic `+Buffer.from('RfqI830WFC9Ljwfm2q8o7P:eTW86bTvbqdZxrvN9u52VF').toString('base64'),
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body: "grant_type=authorization_code&code=waQXkBfeg0QG2FZw3DSD1M&redirect_uri=https://bnbnong.com",
    // })
    // .then(response => {
    //   return Promise.all([response.status, response.json()]);
    // })
    // .then(data => {
    //   let status = data[0], token = data[1].token;
    //   if(status === 200) {
    //     localStorage.setItem('token', token);
    //     console.warn(data)
    //   } else {
    //     console.warn(data)
    //   }
		// });

		// __________________________________________________-

    // 토큰을 사용해 주문을 받아옴
		// fetch("https://cors-anywhere.herokuapp.com/https://ast99.cafe24api.com/api/v2/admin/orders?start_date=2020-04-01&end_date=2020-04-31", {
		// 	headers: {
		// 		Authorization: "Bearer VV5niXkKC9fKfp4FpiAff1",
		// 		"Content-Type": "application/json"
		// 	},
		// })
		// .then(response => {
    //   return Promise.all([response.status, response.json()]);
    // })
    // .then(data => {
    //   let status = data[0], token = data[1].token;
    //   if(status === 200) {
    //     localStorage.setItem('token', token);
    //     console.warn(data)
    //   } else {
    //     console.warn(data)
    //   }
		// });
		window.location.href = "https://bnbnong.com:4001/api/cafe24";
	}

  componentWillMount() {
    // if(this.props.location.state !== undefined) {
    //   this.setState({keyword: this.props.location.state.name}, () => {
    //     this.getOrder();
    //     this.getTotal();
    //   });
    // } else {
      this.getOrder();
      this.getTotal();
      //this.getCafe24Order();
    //}
    console.log(this.props.keyword)
    console.log(this.props.pageNumbers)
  }

  getTotal() {
    const {first_date, last_date } = this.state;
    const keyword = this.props.keyword;
    const process_ = this.state.process;

    fetch(process.env.REACT_APP_HOST+"/order/total/"+(process_ === "refund" ? "refund" : ""), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({first_date, last_date, process_, keyword})
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
          this.setState({total: Math.ceil(data[1][0].total/listCount), totalData : data[1][0].total})
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getOrder() {
    const {first_date, last_date } = this.state;
    const keyword = this.props.keyword;
    const page = this.props.pageNumbers;
    const process_ = this.state.process;
    fetch(process.env.REACT_APP_HOST+"/order/list"+(process_ === "refund" ? "/refund" : ""), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({first_date, last_date, page, process_, keyword})
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
      if(status === 200) {
        let orderData = data[1];
        this.setState({orderData})
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    });
  }

  tabClick(process) {
    this.setState({
      process,
      //page: 1
    }, () => {
      this.getTotal();
      this.getOrder();
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchOrder() {
    this.getOrder();
    this.getTotal();
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x){
    this.setState({
      //page: x,
    }, () => {
      this.getOrder();
    });
  }

  /*getCafe24Order() {
    fetch('https://cors-anywhere.herokuapp.com/https://ast99.cafe24api.com/api/v2/admin/orders?start_date=2020-04-01&end_date=2020-04-31', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('cafe24AccessToken'),
        'Content-Type' : 'application/json',
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
      if (status === 200){
        console.log(data[1].orders)
      }
      else {
        alert('로그인 하고 접근해주세요');
      }
    })
  }*/

  resetInput() {
    var reset_input = document.getElementsByClassName('searchbox-input')
    for(var i = 0; i < reset_input.length; i++) {
      reset_input[i].value = null;
      console.log(i);
    }
  }
  
  resetDatePicker() {
    this.setState({
      first_date: (new Date(new Date().getTime() - 60*60*24*1000*30*4)),
      last_date: new Date(),
    })
  }

  render() {
    var data = this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    data.map((e, i) => {this.state.checks[i] = false});
    {console.log(this.props.location.state)}
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <Row>
          <Col>
            <div className="search-box">
              <div className="search-list">
                <label className="search-label">조회기간</label>
                <div className="sell-input">
                  <DatePicker
                    className="datepicker searchbox-input"
                    dateFormat="yyyy년 MM월 dd일"
                    locale="ko"
                    selected={this.state.first_date}
                    onChange={(first_date) => { this.setState({ first_date }) }}
                  />
                  &nbsp;~&nbsp;
                  <DatePicker
                    className="datepicker searchbox-input"
                    dateFormat="yyyy년 MM월 dd일"
                    locale="ko"
                    selected={this.state.last_date}
                    onChange={(last_date) => { this.setState({ last_date }) }}
                  />
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">상세조건</label>
                <div className="sell-input">
                  <Input className='searchbox-input' placeholder="고객명을 검색해주세요." style={{width: "30%"}} onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
                </div>
              </div>
              <div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
                <Button color="primary" style={{marginRight: 10}} onClick={() => { this.searchOrder(this.props.keyword); }}>검색</Button>
								<Button color="ghost-primary" onClick={() => { this.props.searchKeyword(''); this.resetInput(); this.resetDatePicker() }}>초기화</Button>
							</div>
            </div>
            
            <div className="list-card">
              <div className="list-title">
                <span>
                  상품목록 (총 <span style={{color: "#1B8EB7"}}>{this.state.totalData}</span> 개)
                </span>
                <div className="list-sort-box">
                  <div>
                    <select>
                      <option>상품등록일순</option>
                      <option>총액높은순</option>
                      <option>총액낮은순</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="list-menu">
              </div>
              <div className="list-box" style={{marginTop: 20}}>
                <div style={{float: "right"}}>
                  <Button color="primary" onClick={() => {this.props.history.push(`/sales/order`)}} style={{marginRight: 10}}>주문추가</Button>
                  <Button color="primary" onClick={() => {this.props.history.push(`/main/order/post/`)}}>택배송장</Button>
                  {console.log(data[0])}
                </div>
                <Nav tabs>
                  <NavItem>
                    <NavLink active={this.state.process === "all"} onClick={() => this.tabClick("all")} href="#">전체</NavLink>
                  </NavItem>
                  {/*<NavItem>
                    <NavLink active={this.state.process === "estimate"} onClick={() => this.tabClick("estimate")} href="#">견적</NavLink>
                  </NavItem>*/}
                  <NavItem>
                    <NavLink active={this.state.process === "order"} onClick={() => this.tabClick("order")} href="#">주문</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "shipping"} onClick={() => this.tabClick("shipping")} href="#">출하</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "refund"} onClick={() => this.tabClick("refund")} href="#">환불</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink active={this.state.process === "cancel"} onClick={() => this.tabClick("cancel")} href="#">취소</NavLink>
                  </NavItem>
                </Nav>
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th className="list-hidden">#</th>
                      <th>출하일</th>
                      <th className="list-hidden">생성일</th>
                      <th>고객</th>
                      <th>총액</th>
                      <th className="list-hidden">상태</th>
                      <th>선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => {
                      this.state.count++
                      return (<tr style={{cursor: 'pointer'}} key={this.state.count} onClick={() => {this.props.history.push(`/main/sales/order/${e.id}`)}}>
                        <td className="list-hidden">{e.id}</td>
                        <td>{this.getDate(e.date)}</td>
                        <td className="list-hidden">{this.getDate(e.orderDate)}</td>
                        <td>{e.name}</td>
                        <td>{this.numberWithCommas(e.price)}</td>
                        <td className="list-hidden">
                          {this.state.process === 'refund' ? <Badge color="danger">{stateKor['refund']}</Badge> : null}
                          {e.state === 'order' ? <Badge color="primary">{stateKor[e.state]}</Badge>: null}
                          {/*e.state === 'shipping' && this.state.process !== 'refund' ? <span><Badge color="secondary">{stateKor[e.state]}</Badge></span>: null*/}
													{e.state === 'shipping' && this.state.process !== 'refund' ? <span><Badge color="secondary">출하</Badge></span>: null}
													{e.state === 'complete' && this.state.process !== 'refund' ? <span><Badge color="success">수금</Badge></span>: null}
                          {e.state === 'cancel' ? <Badge color="danger">{stateKor[e.state]}</Badge>: null}
                        </td>
                        <td style={{textAlign: "center"}} onClick={() => {
                            let {checks} = this.state;
                            checks[i] = !checks[i];
                            console.log(this.state.checks)
                          }}><Input type="checkbox"></Input></td>
                      </tr>
                      )
                    })}
                  </tbody>
                </Table>
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
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+e));}}>
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
                
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

}

export default List;
