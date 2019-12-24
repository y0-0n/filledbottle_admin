import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Input, } from 'reactstrap';
import Popup from "reactjs-popup";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
import ProductModal from '../Order/ProductModal';
registerLocale('ko', ko)

let d = { id: '', name: '', };

class ProduceModify extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.form = {
      //weather: '맑음',
      rain : 0,
      snow : 0,
      temperatures : 0,
      minTemp : 0,
      maxTemp : 0,
      product_id: 0,
      process: '',
      name: '',
      content: '',
      previous_id: null,
    }

    this.state = {
      data: {},
      image: null,
      sProduct: [d],
      selectedFile: null,
      productName: '',//제품명
    };
  }
  componentWillMount() {
    this.getDetail();
  }

  getDetail() {
    console.log('A')
    fetch(process.env.REACT_APP_HOST + "/api/produce/" + this.props.match.params.id, {
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
      this.form.weather = data[1][0].weather
      if (status === 200)
        this.setState({ data: data[1][0] });
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    })
  }

  handleFileInput(e) {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        image: [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({ img });
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.img);
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST + "/customer", {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData
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
        if (status === 200) {
          alert('등록됐습니다.');
          this.props.history.push('/main/customer/list');
        } else {
          alert('등록에 실패했습니다.');
        }
      });
  }

  render() {
    const { data } = this.state
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
                      <th style={{ width: 150 }}>날씨</th>
                      <td style={{ width: 300 }}>
                        <Input value={this.form.weather} onChange={(e) => {
                          this.form.weather = e.target.value;
                          this.forceUpdate();
                        }} type='select' name="weather">
                          <option value="맑음">맑음</option>
                          <option value="구름조금">구름조금</option>
                          <option value="구름많음">구름많음</option>
                          <option value="흐림">흐림</option>
                          <option value="비">비</option>
                          <option value="눈">눈</option>
                          <option value="비/눈">비/눈</option>
                        </Input>
                      </td>
                      <th style={{ width: 150 }}>강수량</th>
                      <td style={{ width: 300 }}>
                        <Row>
                          <Col xs="10"><Input defaultValue={data.rain} onChange={(e) => { this.form.rain = e.target.value }} /></Col>
                          <Col xs="2">mm</Col>
                        </Row>
                      </td>
                      <th style={{ width: 150 }}>적설량</th>
                      <td style={{ width: 300 }}>
                        <Row>
                          <Col xs="10"><Input defaultValue={data.snow} onChange={(e) => { this.form.snow = e.target.value }} /></Col>
                          <Col xs="2">cm</Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <th>기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={data.temperatures} onChange={(e) => { this.form.temperatures = e.target.value }} /></Col>
                          <Col xs="2">°C</Col>
                        </Row>
                      </td>
                      <th>최저 기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={data.min_temp} onChange={(e) => { this.form.min_temp = e.target.value }} /></Col>
                          <Col xs="2">°C</Col>
                        </Row>
                      </td>
                      <th>최고 기온</th>
                      <td>
                        <Row>
                          <Col xs="10"><Input defaultValue={data.max_temp} onChange={(e) => { this.form.max_temp = e.target.value }} /></Col>
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
                      <th style={{ width: 150 }}>품목</th>
                      <td>
                        <Row>
                          {<Popup
                            trigger={
                              <Col sm="10">
                                <Input name='name' defaultValue={data.productName} onChange={(e) => { this.state.productName = e.target.value }} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} readOnly />
                              </Col>
                            }
                            modal>
                            {close => <ProductModal  close={close} login={()=>{this.props.history.push('/login')}}
                                selectProduct={(d) => {
                                  const {id, name} = d;
                                  this.form.product_id = id;
                                  let val = Object.assign({}, data);
                                  val.productName = name;
                                  this.setState({ data: val });
                                }}
                            />}
                          </Popup>}
                          <Col sm="2"><Button onClick={() => { this.props.history.push(`/product/create`) }}>신규</Button></Col>
                        </Row>
                      </td>
                      <th style={{ width: 150 }}>영농과정</th>
                      <td>
                        <Input defaultValue={data.process} onChange={(e) => { this.form.process = e.target.value }} />
                      </td>
                    </tr>
                    <tr>
                      <th>작업명</th>
                      <td>
                        <Input defaultValue={data.name} onChange={(e) => { this.form.name = e.target.value }} />
                      </td>
                      <th>작업내용</th>
                      <td>
                        <Input defaultValue={data.content} onChange={(e) => { this.form.content = e.target.value }} />
                      </td>
                    </tr>
                    <tr>
                      <th>작업사진</th>
                      <td colSpan="3">
                        <img alt="작업 사진" style={{ height: 500, width: 500 }} src={this.state.image} /> <br></br>
                        <input ref="file" type="file" name="file" accept="image/*" onChange={e => { this.handleFileInput(e); }} />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Button block color="primary" onClick={() => {
        }}>생산 수정하기</Button>
      </div>
    )
  }
}

export default ProduceModify;