import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Input, } from 'reactstrap';
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
    formData.append('file', this.state.img);
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST+"/customer", {
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
        this.props.history.push('/main/customer/list');
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
                        <th>강수량</th>
                        <td>
                            <Row>
                                <Col xs="10"><Input onChange={(e) => {this.setState({precipitation: e.target.value})}}/></Col>
                                <Col xs="2">mm</Col>
                            </Row>                          
                        </td>
                        <th>적설량</th>
                        <td>
                            <Row>
                                <Col xs="10"><Input onChange={(e) => {this.setState({snowfall: e.target.value})}}/></Col>
                                <Col xs="2">cm</Col>
                            </Row>
                        </td>
                      </tr>
                      <tr>
                        <th>기온</th>
                        <td>
                            <Row>
                                <Col xs="10"><Input onChange={(e) => {this.setState({temperatures: e.target.value})}}/></Col>
                                <Col xs="2">°C</Col>
                            </Row>
                        </td>
                        <th>최저 기온</th>
                        <td>
                            <Row>
                                <Col xs="10"><Input onChange={(e) => {this.setState({minTemperatures: e.target.value})}}/></Col>
                                <Col xs="2">°C</Col>
                            </Row>
                        </td>
                        <th>최고 기온</th>
                        <td>
                            <Row>
                                <Col xs="10"><Input onChange={(e) => {this.setState({maxTemperatures: e.target.value})}}/></Col>
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
                    {
                      this.state.sProduct.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <th>품목</th>
                            <td>
                              <Row>                                
                                {<Popup
                                  trigger={
                                    <Col sm="10">
                                      <Input name='name' value={this.state.sProduct[i].name} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} readOnly />
                                    </Col>
                                  }
                                  modal>
                                  {close => <ProductModal i6ndex={i} close={close}
                                    selectProduct={(data) => {
                                      let { sProduct } = this.state;

                                      let val = Object.assign({}, sProduct[i]);
                                      val['id'] = data['id'];
                                      val['name'] = data['name'];

                                      sProduct[i] = val;
                                      this.setState({ sProduct });
                                    }}
                                  />}
                                </Popup>}
                                <Col sm="2"><Button onClick={() => {this.props.history.push(`/product/create`)}}>신규</Button></Col>
                              </Row>
                            </td>
                            <th>영농과정</th>
                            <td>
                              <Input/>                      
                            </td>
                          </tr>
                            )
                          }, this)
                        }
                          <tr>
                            <th>작업명</th>
                            <td>
                              <Input/>
                            </td>
                            <th>작업내용</th>
                            <td>
                              <Input/>
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
            </Card>
          </Col>
        </Row>
        <Button block color="primary" onClick={() => {
        }}>생산 추가하기</Button>
      </div>
    )
  }
}

export default CreateProduce;