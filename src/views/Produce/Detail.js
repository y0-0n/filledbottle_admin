import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, } from 'reactstrap';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

let d = {id: '', name: '',};

class Detail extends Component {
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
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
         <link rel="stylesheet" type="text/css" href="css/ProduceDetail.css"></link>
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
                        <th>날씨</th>
                        <td>
                          {data.weather}
                        </td>
                        <th>강수량</th>
                        <td>{data.rain} mm</td>
                        <th>적설량</th>
                        <td>{data.snow} cm</td>
                      </tr>
                      <tr>
                        <th>기온</th>
                        <td>{data.temperatures} °C</td>
                        <th>최저 기온</th>
                        <td>{data.min_temp} °C</td>
                        <th>최고 기온</th>
                        <td>{data.max_temp} °C</td>
                      </tr>
                    </tbody>
                    </Table>
              </CardBody>
              <CardFooter>
                  <Button color="primary" onClick={() => {this.props.history.push(`/main/produce/edit/`+this.props.match.params.id)}} style={{marginLeft : '10px'}}>수정</Button>
                  <Button color="primary" onClick={() => {}} style={{marginLeft : '10px'}}>생산 취소</Button>
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
                        <th>품목</th>
                        <td>
                          {data.productName}
                        </td>
                        <th>영농과정</th>
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
                        <th>재배 면적</th>
                        <td>
                          {data.area}
                        </td>
                        <th>예상 생산량</th>
                        <td>
                          {data.expected_output}
                        </td>
                      </tr>
                      <tr>
                        <th>작업사진</th>
                        <td colSpan="3">
                          <img style={{width: '90%'}} alt="작업 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
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

export default Detail;