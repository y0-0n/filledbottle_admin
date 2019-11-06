import React, { Component } from 'react';

import { Button, Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';


class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{}]
    }
  }

  componentWillMount() {
    this.getSuggestion();
  }

  getSuggestion() {
    fetch(process.env.REACT_APP_HOST+"/api/suggestion", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
      if(status === 200)
        this.setState({data: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    })
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
    let {data} = this.state
    return (
      <Card>
        <CardHeader>
          건의사항
          <Button color="primary" style={{float: 'right', width: '10%'}} onClick={()=> {this.props.history.push('/main/suggestions/write');}}>글쓰기</Button>
        </CardHeader>
        <CardBody>
          <div style={{ overflow: 'scroll' }}>
            <Table style={{ minWidth: 600 }} hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>등록일</th>
                  <th>답변현황</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => {
                  return (
                    <tr key={d.id} style={{ cursor: 'pointer' }}>
                      <td>{d.id}</td>
                      <td>{d.title}</td>
                      <td>{d.name}</td>
                      <td>{this.getDate(d.created_date)}</td>
                      <td>{d.answer !== null ? <Badge color="success">답변 완료</Badge> : <Badge color="secondary">답변 준비중</Badge>}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </Table>
          </div>
        </CardBody>

      </Card>
    )
  }
}

export default Suggestions;
