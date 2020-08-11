import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Button, Col, Row, NavItem, Nav, NavLink,Table, } from 'reactstrap';

const stateKor = {
		laborCost : '인건비',
		managementCost : '관리비',
		managementCost : '재료비'
}
const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 1,
      cost: "all",
      orderData: [],
      //page: 1,
      total: 0,
      //keyword: '',
      first_date: (new Date(new Date().getTime() - 60*60*24*1000*30*3)),
      last_date: new Date(),
    };
	}
	

	  componentWillMount() {
    this.getPurchase();
    this.getTotal();
  }

  getTotal() {
    // const {first_date, last_date } = this.state;
    // const keyword = this.props.keyword;
    // const process_ = this.state.process;

    // fetch(process.env.REACT_APP_HOST+"/order/total/"+(process_ === "refund" ? "refund" : ""), {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   },
    //   body: JSON.stringify({first_date, last_date, process_, keyword})
    //   })
    //   .then(response => {
    //     if(response.status === 401) {
    //       return Promise.all([401])
    //     } else {
    //       return Promise.all([response.status, response.json()]);
    //     }
    //   })
    //   .then(data => {
    //     const status = data[0];
    //     if(status === 200) {
    //       this.setState({total: Math.ceil(data[1][0].total/listCount)})
    //     } else {
    //       alert('로그인 하고 접근해주세요')
    //       this.props.history.push('/login')
    //     }
    //   });
  }

  getPurchase() {
    // const {first_date, last_date } = this.state;
    // const keyword = this.props.keyword;
    // const page = this.props.pageNumbers;
    // const process_ = this.state.process;
    // fetch(process.env.REACT_APP_HOST+"/order/list"+(process_ === "refund" ? "/refund" : ""), {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
    //   },
    //   body: JSON.stringify({first_date, last_date, page, process_, keyword})
    // })
    // .then(response => {
    //   if(response.status === 401) {
    //     return Promise.all([401])
    //   } else {
    //     return Promise.all([response.status, response.json()]);
    //   }
    // })
    // .then(data => {
    //   let status = data[0];
    //   if(status === 200) {
    //     let orderData = data[1];
    //     this.setState({orderData})
    //   } else {
    //     alert('로그인 하고 접근해주세요')
    //     this.props.history.push('/login')
    //   }
    // });
  }

  tabClick(cost) {
    this.setState({
      cost
    }, () => {
      // this.getTotal();
      // this.getOrder();
    });
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  searchPurchase() {
    // this.getOrder();
    // this.getTotal();
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

  
  render() {
    var data = this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

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
                </div>
              </div>
							<div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
								<Button color="primary">검색</Button>
								<Button color="ghost-primary">초기화</Button>
							</div>
            </div>
            
            <div className="list-card">
              <div className="list-title">
                <span>
                  매입목록 (총 <span style={{color: "#1B8EB7"}}>{data.length}</span> 개)
                </span>
								<div style={{float: 'right'}}>
									<Button color="primary" onClick={() => {this.props.history.push(`/purchase/create`)}}>추가하기</Button>
								</div>
              </div>
              <div className="list-menu">
              </div>
              <div className="list-box" style={{marginTop: 20}}>
                <Nav tabs>
                    <NavItem>
                      <NavLink active={this.state.cost === "all"} onClick={() => this.tabClick("all")} href="#">전체</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={this.state.cost === "laborCost"} onClick={() => this.tabClick("laborCost")} href="#">인건비</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={this.state.cost === "managementCost"} onClick={() => this.tabClick("managementCost")} href="#">관리비</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={this.state.cost === "materialCost"} onClick={() => this.tabClick("materialCost")} href="#">재료비</NavLink>
                    </NavItem>
                  </Nav>
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th className="list-hidden">#</th>
                      <th>날짜</th>
											<th>
												{this.state.cost === 'all' ? "항목명" : null}
												{this.state.cost === 'laborCost' ? "항목명 (인건비)" : null}
												{this.state.cost === 'managementCost' ? "항목명 (관리비)" : null}
												{this.state.cost === 'materialCost' ? "항목명 (재료비)" : null}
											</th>
                      <th>금액 (원)</th>
                      <th>비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => {
                      this.state.count++
                      return (<tr style={{cursor: 'pointer'}} key={this.state.count} onClick={() => {this.props.history.push(``)}}>
                        <td className="list-hidden">{e.id}</td>
												<td>{this.getDate(e.date)}</td>
												<td>{e.name}</td>
												<td>{this.numberWithCommas(e.price)}</td>
												<td>{e.remarks}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </Table>
                
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

}

export default List;
