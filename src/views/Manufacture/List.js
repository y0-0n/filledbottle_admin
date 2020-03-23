import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, CardFooter, Pagination, PaginationItem, PaginationLink, Input, Badge, InputGroupAddon, InputGroup } from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

const listCount = 5;

class Manufacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufactureData: [],
      page: 1,
      keyword: '',
      first_date: (new Date(new Date().getTime() - 60*60*24*1000*30)),
      last_date: new Date(),
    };
    this.keyword = '';
  }

  componentWillMount() {
    this.getList();
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate(), ho = d.getHours(), min = d.getMinutes(), sec = d.getSeconds();

    return year + "년 " + month + "월 " + date + "일 " + ho + ":" + min + ":" + sec;
  }

  getTotal() {
    let {keyword, first_date, last_date} = this.state;

    fetch(process.env.REACT_APP_HOST+"/api/manufacture/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        keyword, first_date, last_date
      })
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

  getList() {
    let {page, keyword, first_date, last_date} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/manufacture/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        page, keyword, first_date, last_date
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
          this.setState({ manufactureData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  searchManufacture() {
    let {keyword} = this;
    this.setState({keyword, page: 1}, () => {
      this.getList();
      this.getTotal();
    })
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x){
    this.setState({
      page: x,
    }, () => {
      this.getList();
    });
  }

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Manufacture.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                    <Col md="3" xs="2" sm="3">제조관리</Col>
                    <Col md="9" xs="10" sm="9">
										<span className="search">
											<InputGroup>
												<Input onChange={(e) => { this.keyword = e.target.value }} />
												<InputGroupAddon addonType="append">
													<Button block color="primary" onClick={() => { this.searchOrder() }}><i className="fa fa-search"></i></Button>
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
              <CardBody className="card-body">
                <Row>
                  <Col></Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.props.history.push('/manufacture/create'); }}>제조 등록</Button>
                  </Col>
                </Row>
                <Table striped>
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>제조제품명</th>
                        <th>제조수량</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.manufactureData.map((e,i) => {
                        return <tr key={e.id}style={{cursor: 'pointer'}} onClick={() => { this.props.history.push('/main/manufacture/'+e.id); }}>
                          <td>{this.getDate(e.date)}</td>
                          <td>{e.title}</td>
                          <td>{e.total}</td>
													<td>{e.set ? <Badge color="primary">처리</Badge> : <Badge color="danger">취소</Badge>}</td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                <div style={{width: "100%", textAlign : "center"}}>{this.state.manufactureData.length === 0 ? <span >"현재 식품 가공 목록이 없습니다."</span> : null}</div>
                </CardBody>
                <CardFooter>
                  <Pagination style={{justifyContent: 'center'}}>
                    {this.state.page === 1 ? '' :
                      <PaginationItem>
                        <PaginationLink previous onClick={() => { this.countPageNumber(this.state.page - 1) }} />
                      </PaginationItem>
                    }
                    {this.state.page === 1 ? arr.forEach(x => arr1.push(x + 2)) : null}
                    {this.state.page === 2 ? arr.forEach(x => arr1.push(x + 1)) : null}
                    {this.state.page !== 1 && this.state.page !== 2 ? arr.forEach(x => arr1.push(x)) : null}
                    {arr1.map((e, i) => {
                      if (this.state.total >= this.state.page + e)
                        return (<PaginationItem key={i} active={this.state.page === this.state.page + e}>
                          <PaginationLink onClick={() => { this.countPageNumber(this.state.page + e) }}>
                            {this.state.page + e}
                          </PaginationLink>
                        </PaginationItem>)
                      return null;
                    })}
                    {this.state.page === this.state.total ? '' :
                      <PaginationItem>
                        <PaginationLink next onClick={() => { this.countPageNumber(this.state.page + 1) }} />
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

export default Manufacture;
