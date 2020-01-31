import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button} from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    this.getStockDetail(this.props.match.params.id);
  }

  getStockDetail(id) {
    fetch(process.env.REACT_APP_HOST+"/api/stock/"+id, {
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
    });
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
    let {data} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>{data[0] !== undefined ? data[0].name : null} 재고 내역</Col>
                </Row>                
              </CardHeader>
              <CardBody className="card-body">
                <Table striped>
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>수정 수량</th>
                        <th>현재 수량</th>
												<th>기록</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((d) => {
                        return (
                          <tr key={d.id}>
                            <td>{this.getDate(d.date)}</td>
                            <td>{d.change}</td>
                            <td>{d.quantity}</td>
														<td>{d.memo}</td>
                          </tr>
                        )
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

export default Detail;
