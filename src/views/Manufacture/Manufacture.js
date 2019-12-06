import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, } from 'reactstrap';

class Manufacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufactureData: [],
    };
  }

  componentWillMount() {
    this.getList();
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  getList() {
    fetch(process.env.REACT_APP_HOST+"/api/manufacture", {
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
          this.setState({ manufactureData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  render() {
    console.log(this.state.manufactureData);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                    <Col>제조관리</Col>
                    <Col md="2" xs="3 " sm="3">
                        <Button block color="primary" onClick={() => { this.props.history.push('/manufacture/create'); }}>제조 등록하기</Button>
                    </Col>
                </Row>
              </CardHeader>
              <CardBody className="card-body">
                <Table striped>
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>제조 제품명</th>
                        <th>제조 수량</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.manufactureData.map((e,i) => {
                        return <tr style={{cursor: 'pointer'}} onClick={() => { this.props.history.push('/main/manufacture/'+e.id); }}>
                          <td>{e.date}</td>
                          <td>{e.title}</td>
                          <td>{e.total}</td>
                          <td></td>
                        </tr>
                      })}
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Manufacture;
