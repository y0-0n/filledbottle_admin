import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, CardFooter, Pagination, PaginationItem, PaginationLink, InputGroup, InputGroupAddon} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";

const listCount = 15;

class Produce extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
  
  getTotal() {
    let {keyword, first_date, last_date} = this.state;

    fetch(process.env.REACT_APP_HOST+"/api/produce/total/", {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

  search() {
    let {keyword} = this;
    this.setState({keyword, page: 1}, () => {
      this.getList();
      this.getTotal();
    })
  }

  getList() {
    let {page, keyword, first_date, last_date} = this.state;

    fetch(process.env.REACT_APP_HOST+"/api/produce/list/", {
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
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
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
    let {data} = this.state;

    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Produce.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                    <Col>생산관리</Col>
                    <Col md="2" xs="3" sm="3">
                    <div style={{ pointer: 'cursor', width : 140}}>
                      <DatePicker
                        dateFormat="yyyy년 MM월 dd일"
                        locale="ko"
                        selected={this.state.first_date}
                        onChange={(first_date) => { this.setState({ first_date }) }}
                      />
                    </div>
                  </Col>
                  ~
                  <Col md="2" xs="3" sm="3">
                    <DatePicker
                      dateFormat="yyyy년 MM월 dd일"
                      locale="ko"
                      selected={this.state.last_date}
                      onChange={(last_date) => { this.setState({ last_date }) }}
                    />
                  </Col>
                  <Col md="3" xs="6" sm="6">
                    <InputGroup>
                      <Input onChange={(e) => { this.keyword = e.target.value }} />
                      <InputGroupAddon addonType="append">
                        <Button block color="primary" onClick={() => { this.search() }}><i className="fa fa-search"></i></Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="card-body">
                <Row>
                  <Col></Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.props.history.push('/produce/create'); }}>생산 등록</Button>
                  </Col>
                </Row>
                <Table striped>
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>생산품</th>
                        <th>영농과정</th>
                        <th>작업명</th>
                        <th>재배 면적</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, i) => {
                        return <tr style={{cursor: 'pointer'}} onClick={() => { this.props.history.push('/main/produce/'+e.id); }}>
                          <td>{this.getDate(e.created_date)}</td>
                          <td>{e.productName}</td>
                          <td>{e.process}</td>
                          <td>{e.name}</td>
                          <td>{e.area}</td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
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

export default Produce;
