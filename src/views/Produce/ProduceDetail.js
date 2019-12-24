import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, } from 'reactstrap';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
registerLocale('ko', ko)

let d = {id: '', name: '',};

class ProduceDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    }
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST+"/api/produce/"+this.props.match.params.id, {
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
          this.setState({ data: data[1][0] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  componentWillMount() {
    this.getDetail();
  }

  render() {
    const {data} = this.state
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">날씨</Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Table className="ShowTable">
                    <tbody>
                      <tr>
                        <th style={{width : 150}}>날씨</th>
                        <td style={{width : 300}}>
                          {data.weather}
                        </td>
                        <th style={{width : 150}}>강수량</th>
                        <td style={{width : 300}}>
                            <Row>
                                <Col xs="10">{data.rain}</Col>
                            </Row>                          
                        </td>
                        <th style={{width : 150}}>적설량</th>
                        <td style={{width : 300}}>
                            <Row>
                                <Col xs="10">{data.snow}</Col>
                            </Row> 
                        </td>
                      </tr>
                      <tr>
                        <th>기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{data.temperatures}</Col>
                            </Row> 
                        </td>
                        <th>최저 기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{data.min_temp}</Col>
                            </Row> 
                        </td>
                        <th>최고 기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{data.max_temp}</Col>
                            </Row> 
                        </td>
                      </tr>
                    </tbody>
                    </Table>
              </CardBody>
              <CardFooter>
                  <Button onClick={() => {this.props.history.push(`/main/produce/edit/:id`)}} style={{marginLeft : '10px'}}>수정</Button>
                  <Button onClick={() => {}} style={{marginLeft : '10px'}}>생산 취소</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">영농일지</Col>
                </Row>
              </CardHeader>
              <CardBody>
              <Table className="ShowTable">
                    <tbody>
                        <tr>
                            <th style={{width : 150}}>품목</th>
                            <td>
                              {data.productName}
                            </td>
                            <th style={{width : 150}}>영농과정</th>
                            <td>
                              {data.process}
                            </td>
                          </tr>
                          <tr>
                            <th>작업명</th>
                            <td>
                              {data.name}
                            </td>
                            <th>작업내용</th>
                            <td>
                              {data.content}
                            </td>
                          </tr>
                          <tr>
                            <th>작업사진</th>
                            <td colSpan="3">
                              <img alt="작업 사진" style={{height: 500, width: 500}} src={this.state.image} /> <br></br>
                            </td>
                          </tr>
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

export default ProduceDetail;