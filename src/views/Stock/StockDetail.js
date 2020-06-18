import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
		const {productId, plantId} = this.props.match.params;
		this.getStockDetail(plantId, productId);
  }

  getStockDetail(plantId, productId) {
    fetch(process.env.REACT_APP_HOST+"/api/stock/"+plantId+"/"+productId, {
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
    console.log("ss",data)
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div className="form-card">
          <div className="form-title">
            재고 등록
            <Button color="primary" style={{float: "right"}} onClick={() => {this.props.history.push(`/main/manage/stock/edit/${this.props.match.params.plantId}/${this.props.match.params.productId}`)}}>수정</Button>
          </div>
          <div className="form-innercontent">
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">품목명</label>
                <div className="sell-input">
                </div>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">구분</label>
                <div className="sell-input">
                </div>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">재고수</label>
                <div className="sell-input">
                </div>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">유통기한</label>
                <div className="sell-input">
                </div>
              </div>
            </div>
            <div className="sell-list">
              <div className="sell-content">
                <label className="sell-label">제조일자</label>
                <div className="sell-input">
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      {data.map((d, i) => {
                        return (
                          <tr key={i}>
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
