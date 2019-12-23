import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Input, FormGroup, CardFooter} from 'reactstrap';
import Popup from "reactjs-popup";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
import ProductModal from '../Order/ProductModal';
registerLocale('ko', ko)

let d = {id: '', name: '',};

class CreateProduce extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.form = {
      weather: '맑음',
      rain : 0,
      snow : 0,
      temperatures : 0,
      minTemp : 0,
      maxTemp : 0,
      product_id: 0,
      process: '',
      name: '',
      content: '',
      area: 0,
      expected: 0
    }

    this.state = {
        image: null,
        selectedFile: null,
        name: ''//제품명
    };
  }
  componentWillMount() {
  }

  handleFileInput(e){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        image : [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({img});
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    /*formData.append('file', this.state.img);*/
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST+"/api/produce", {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData
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
      if(status === 200) {
        alert('등록됐습니다.');
        this.props.history.push('/main/produce');
      } else {
        alert('등록에 실패했습니다.');
      }
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <form onSubmit={this.handlePost.bind(this)}>
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
                        <Input defaultValue={this.form.weather} onChange={(e) => {this.form.weather = e.target.value}} type='select' name="weather">
                          <option value="맑음">맑음</option>
                          <option value="구름조금">구름조금</option>
                          <option value="구름많음">구름많음</option>
                          <option value="흐림">흐림</option>
                          <option value="비">비</option>
                          <option value="눈">눈</option>
                          <option value="비/눈">비/눈</option>
                        </Input>
                      </td>
                      <th>강수량</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={this.form.rain} onChange={(e) => {this.form.rain = e.target.value}}/></Col>
                          <Col xs="2">mm</Col>
                        </Row>                          
                      </td>
                      <th>적설량</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={this.form.snow} onChange={(e) => {this.form.snow = e.target.value}}/></Col>
                          <Col xs="2">cm</Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={this.form.temperatures} onChange={(e) => {this.form.temperatures = e.target.value}}/></Col>
                          <Col xs="2">°C</Col>
                        </Row>
                      </td>
                      <th>최저 기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={this.form.minTemp} onChange={(e) => {this.form.minTemp = e.target.value}}/></Col>
                          <Col xs="2">°C</Col>
                        </Row>
                      </td>
                      <th>최고 기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={this.form.maxTemp} onChange={(e) => {this.form.maxTemp = e.target.value}}/></Col>
                          <Col xs="2">°C</Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
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
                      <th style={{width: '10%'}}>품목</th>
                      <td style={{width: '40%'}}>
                        <Row>                                
                          {<Popup
                            trigger={
                              <Col sm="10">
                                <Input name='name' value={this.state.name} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} readOnly />
                              </Col>
                            }
                            modal>
                            {close => <ProductModal close={close}
                              selectProduct={(data) => {
                                this.form.product_id = data.id;
                                this.setState({name: data.name});
                              }}
                            />}
                          </Popup>}
                          <Col sm="2"><Button onClick={() => {this.props.history.push(`/product/create`)}}>신규</Button></Col>
                        </Row>
                      </td>
                      <th style={{width: '10%'}}>영농과정</th>
                      <td style={{width: '40%'}}>
                        <Input defaultValue={this.form.process} onChange={(e) => {this.form.process = e.target.value}}/>
                      </td>
                    </tr>
                    <tr>
                      <th>작업명</th>
                      <td>
                        <Input defaultValue={this.form.name} onChange={(e) => {this.form.name = e.target.value}}/>
                      </td>
                      <th>작업내용</th>
                      <td>
                        <Input defaultValue={this.form.content} onChange={(e) => {this.form.content = e.target.value}}/>
                      </td>
                    </tr>
                    <tr>
                      <th>재배 면적</th>
                      <td>
                        <Input defaultValue={this.form.area} onChange={(e) => {this.form.area = e.target.value}}/>
                      </td>
                      <th>예상 생산량</th>
                      <td>
                        <Input defaultValue={this.form.expected} onChange={(e) => {this.form.expected = e.target.value}}/>
                      </td>
                    </tr>
                    <tr>
                      <th>작업사진</th>
                      <td colSpan="3">
                        <img alt="작업 사진" style={{height: 500, width: 500}} src={this.state.image} /> <br></br>
                        <input ref="file" type="file" name="file"  accept="image/*" onChange={e =>{this.handleFileInput(e);}}/> 
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button block color="primary">추가하기</Button>
              </CardFooter>
            </Card>
            </form>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col md="10" xs="10" sm="10">재작년 영농일지</Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th style={{width: '20%'}}>품목</th>
                          <td style={{width: '30%'}}>
                          </td>
                          <th style={{width: '20%'}}>영농과정</th>
                          <td style={{width: '30%'}}>
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
                          <th>재배 면적</th>
                          <td>
                          </td>
                          <th>예상 생산량</th>
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
              <Col>
                <Card>
                  <CardHeader>
                    <Row>
                      <Col md="10" xs="10" sm="10">작년 영농일지</Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th style={{width: '20%'}}>품목</th>
                          <td style={{width: '30%'}}>
                          </td>
                          <th style={{width: '20%'}}>영농과정</th>
                          <td style={{width: '30%'}}>
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
                          <th>재배 면적</th>
                          <td>
                          </td>
                          <th>예상 생산량</th>
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
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateProduce;