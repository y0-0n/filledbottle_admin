import React, { Component } from 'react';

import { Badge, Card, CardBody, CardHeader, CardFooter, Table, Pagination, PaginationItem, PaginationLink, Row, Col } from 'reactstrap';

const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      page: 1,
    }
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
		const {page} = this.state;
		
    fetch(process.env.REACT_APP_HOST + "/api/admin/suggestion/list/", {
      method: 'POST',
      headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({page})
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

  getTotal() {
    fetch(process.env.REACT_APP_HOST + "/api/admin/suggestion/total/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          this.setState({ total: Math.ceil(data[1][0].total / listCount) })
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth() + 1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x) {
    this.setState({
      page: x,
    }, () => {
      this.getList();
    });
  }

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    let { data } = this.state
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Suggestions.css"></link>
        <Card>
          <CardHeader>
            <Row>
              <Col>건의사항</Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div>
              <Table hover>
                <thead>
                  <tr>
                    <th className="list-hidden">#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th className="list-hidden">등록일</th>
                    <th>답변현황</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d) => {
                    return (
                      <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => { this.props.history.push(`/admin/suggestion/detail/${d.id}`) }}>
                        <td className="list-hidden">{d.id}</td>
                        <td>{d.title}</td>
                        <td>{d.name}</td>
                        <td className="list-hidden">{this.getDate(d.created_date)}</td>
                        <td>{d.answer !== null ? <Badge color="success">답변 완료</Badge> : <Badge color="secondary">답변 준비중</Badge>}</td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </Table>
            </div>
          </CardBody>
          <CardFooter>
            <Pagination style={{ justifyContent: 'center' }}>
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
      </div>
    )
  }
}

export default List;
