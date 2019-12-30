import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Button, Card, CardBody, CardHeader, Col, Row, Input, Table, CardFooter, Pagination, PaginationItem, PaginationLink, } from 'reactstrap';
import '../../css/Table.css';

const listCount = 5;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      number: 1,
    };
  }

  componentWillMount() {
  }
  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/api/manufacture", {
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

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <Row className="">
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>관광 상세 검색</Col>
                  <Col md="2" xs="3" sm="3">
                    <Button block color="primary" onClick={() => { this.props.history.push('/activity/create'); }}>관광 등록</Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr>
                      <th style={{ textAlign: "center" }}>날짜</th>
                      <td>
                        <div style={{ pointer: 'cursor', width: 140 }}>
                          <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            locale="ko"
                            selected={this.state.first_date}
                            onChange={(first_date) => { this.setState({ first_date }) }}
                          />
                        </div>
                      </td>
                      <td style={{ width: 30 }}>~</td>
                      <td>
                        <div style={{ pointer: 'cursor' }}>
                          <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            locale="ko"
                            selected={this.state.last_date}
                            onChange={(last_date) => { this.setState({ last_date }) }}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ textAlign: "center" }}>참가자명</th>
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
                <Button block color="primary" onClick={() => { }}>검색</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Row>
                  <Col>관광목록 보기</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ overflow: 'scroll' }}>
                  <Table style={{ minWidth: 600 }} hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>참가자명</th>
                        <th>날짜</th>
                        <th>금액</th>
                        <th>체험내용</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                  <Pagination>
                    {this.state.number === 1 ? '' :
                      <PaginationItem>
                        <PaginationLink previous onClick={() => { this.countPageNumber(this.state.number - 1) }} />
                      </PaginationItem>
                    }
                    {this.state.number === 1 ? arr.forEach(x => arr1.push(x + 2)) : null}
                    {this.state.number === 2 ? arr.forEach(x => arr1.push(x + 1)) : null}
                    {this.state.number !== 1 && this.state.number !== 2 ? arr.forEach(x => arr1.push(x)) : null}
                    {arr1.map((e, i) => {
                      if (this.state.total >= this.state.number + e)
                        return (<PaginationItem key={i} active={this.state.number === this.state.number + e}>
                          <PaginationLink onClick={() => { this.countPageNumber(this.state.number + e) }}>
                            {this.state.number + e}
                          </PaginationLink>
                        </PaginationItem>)
                      return null;
                    })}
                    {this.state.number === this.state.total ? '' :
                      <PaginationItem>
                        <PaginationLink next onClick={() => { this.countPageNumber(this.state.number + 1) }} />
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