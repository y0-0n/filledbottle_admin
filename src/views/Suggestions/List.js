import React, { Component } from 'react';

import { Button, Badge, Card, CardBody, CardHeader, CardFooter, Table, Pagination, PaginationItem, PaginationLink, Row, Col } from 'reactstrap';

const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}],
      number: 1,
    }
  }

  componentWillMount() {
    this.getSuggestion();
  }

  getSuggestion() {
    fetch(process.env.REACT_APP_HOST + "/api/suggestion/" + this.state.number, {
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
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  getTotal() {
    fetch(process.env.REACT_APP_HOST + "/api/suggestion/total/", {
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
      number: x,
    }, () => {
      this.getSuggestion();
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
              <Col>
                <div style={{float : "right"}}>
                  <Button color="primary" onClick={() => { this.props.history.push('/main/suggestions/write'); }}>글쓰기</Button>
                </div>
              </Col>
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
                      <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => { this.props.history.push(`/main/suggestions/${d.id}`) }}>
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
      </div>
    )
  }
}

export default List;
