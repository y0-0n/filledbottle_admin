import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, } from 'reactstrap';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
registerLocale('ko', ko)

let d = {id: '', name: '',};

class CreateProduce extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
        image: null,
        sProduct: [d],
        selectedFile : null,
        precipitation : 0,
        snowfall : 0,
        temperatures : 0,
        minTemperatures : 0,
        maxTemperatures : 0,
    };
  }
  componentWillMount() {
  }

  render() {
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
                            <select name="weather">
                                <option value="맑음">맑음</option>
                                <option value="구름조금">구름조금</option>
                                <option value="구름많음">구름많음</option>
                                <option value="흐림">흐림</option>
                                <option value="비">비</option>
                                <option value="눈">눈</option>
                                <option value="비/눈">비/눈</option>
                            </select>
                        </td>
                        <th style={{width : 150}}>강수량</th>
                        <td style={{width : 300}}>
                            <Row>
                                <Col xs="10">{this.state.precipitation}</Col>
                            </Row>                          
                        </td>
                        <th style={{width : 150}}>적설량</th>
                        <td style={{width : 300}}>
                            <Row>
                                <Col xs="10">{this.state.snowfall}</Col>
                            </Row> 
                        </td>
                      </tr>
                      <tr>
                        <th>기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{this.state.temperatures}</Col>
                            </Row> 
                        </td>
                        <th>최저 기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{this.state.minTemperatures}</Col>
                            </Row> 
                        </td>
                        <th>최고 기온</th>
                        <td>
                            <Row>
                                <Col xs="10">{this.state.maxTemperatures}</Col>
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
                            </td>
                            <th style={{width : 150}}>영농과정</th>
                            <td>
                            </td>
                          </tr>
                          <tr>
                            <th>작업명</th>
                            <td>
                            </td>
                            <th>작업내용</th>
                            <td>
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

export default CreateProduce;