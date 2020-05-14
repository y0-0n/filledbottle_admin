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
      //keyword: '',
      first_date: (new Date(new Date().getTime() - 60*60*24*1000*30*4)),
      last_date: new Date(),
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
          this.setState({total: Math.ceil(data[1][0].total/listCount)})
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

  render() {
    var data = this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Order.css"></link>
			<link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row>
          <Col>
            <Card>
              <CardHeader>
								<Row>
									<Col md="3" xs="2" sm="3">주문 보기</Col>
									<Col md="9" xs="10" sm="9">
										<span className="search">
											<InputGroup>
												<Input onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
												<InputGroupAddon addonType="append">
													<Button block color="primary" onClick={() => { this.searchOrder(this.props.keyword); }}><i className="fa fa-search"></i></Button>
												</InputGroupAddon>
											</InputGroup>
										</span>
										<span className="date">
											<DatePicker
												className="datepicker"
												dateFormat="yyyy년 MM월 dd일"
												locale="ko"
												selected={this.state.first_date}
												onChange={(first_date) => { this.setState({ first_date }) }}
											/>
											&nbsp;~&nbsp;
											<DatePicker
												className="datepicker"
												dateFormat="yyyy년 MM월 dd일"
												locale="ko"
												selected={this.state.last_date}
												onChange={(last_date) => { this.setState({ last_date }) }}
											/>
										</span>
									</Col>
								</Row>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
										<div style={{float: "right"}}>
											<Button onClick={() => { this.props.history.push('/sales/order') }} color="primary">주문생성</Button>

											{/* <Button onClick={() => { this.getCafe24Orders(); }} color="primary">카페24 주문 불러오기</Button> */}
										</div>
                    {/*<UncontrolledButtonDropdown>
                      <DropdownToggle caret color="primary">
                        더 보기
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => { this.props.history.push('/sales/order') }}>주문생성</DropdownItem>
                      </DropdownMenu>
										</UncontrolledButtonDropdown>*/}
                  </Col>
                </Row>
                <hr></hr>
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
                <div>
                  <Table className="ListTable" hover>
                    <thead>
                      <tr>
                        <th className="list-hidden">#</th>
                        <th>출하일</th>
                        <th className="list-hidden">생성일</th>
                        <th>고객</th>
                        <th>총액</th>
                        <th className="list-hidden">상태</th>
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
                          {e.state === 'shipping' && this.state.process !== 'refund' ? <Badge color="secondary">{stateKor[e.state]}</Badge>: null}
                          {e.state === 'cancel' ? <Badge color="danger">{stateKor[e.state]}</Badge>: null}
                        </td>
                        </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <div style={{width: "100%", textAlign : "center"}}>{this.state.orderData.length === 0 ? <span >"현재 주문 목록이 없습니다."</span> : null}</div>
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
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}

export default List;
