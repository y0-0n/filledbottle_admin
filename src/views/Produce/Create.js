import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Input, FormGroup, CardFooter} from 'reactstrap';
import Popup from "reactjs-popup";
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import DatePicker from "react-datepicker";
import ProductModal from '../Modal/ProductModal';
import ProduceModal from '../Modal/ProduceModal';
registerLocale('ko', ko)

let d = {id: '', name: '',};
const API_KEY = 'f31d683f2713e2ac1404a885e2c23d0f';




class Create extends Component {
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
      previous_id: null,
      area : 0,
      expected : 0
    }

    this.state = {
      image_previous: null,
      image_last: null,
      image: null,
      selectedFile: null,
      productName: '',//제품명
      date: new Date(),
      loading: true,
			weatherInfo: null,
			ip: ''
    };
  }
  componentWillMount() {
    const publicIp = require('public-ip');
 
    (async () => {
      this.setState({ ip : await publicIp.v4()})
      this.getCoord();
    })();
	}

	componentDidMount() {
    
	}
	
	getCoord() {
    fetch(process.env.REACT_APP_HOST + `/api/geolocation/?ip=${this.state.ip}`, {
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
        if (status === 200) {
          this._getWeather(data[1].geoLocation.lat,data[1].geoLocation.long)
          
				}
        else {
					console.warn(data[0]);
          alert('위치정보 받아오기 오류');
        }
      });
	}

  _getWeather(latitude,longitude) {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}?lang=ko`,
    {
      method: 'GET',
      headers: {
      },
    })
    .then(response => response.json()) // 응답값을 json으로 변환
    .then(data => {
      console.warn(data)
      this.setState({
        weatherInfo : data,
        loading: false
      })
    })
  }

  handleFileInput() {
    var file = this.refs.file.files[0];
    var canvasImg = document.createElement("img");
    var reader = new FileReader();
    reader.readAsDataURL(file);

    // img resize
    reader.onload = function (e) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var url = e.target.result;
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0,300,300);
        var dataurl = canvas.toDataURL('image/png');
        this.setState({
          image: dataurl
        });
        console.log(dataurl)
      }.bind(this);
      img.src = url;

      canvas.width = 300;
      canvas.height = 300;

    }.bind(this);
    this.setState({image : this.state.image})
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();

    // base64 -> file object 변환
    // reference -> https://helloinyong.tistory.com/233
    var arr = this.state.image.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    formData.append('file', new File([u8arr], this.state.image.name, {type : mime}));
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    console.log(typeof(this.form.area))

    if ( this.form.product_id === 0 || this.form.process === '' ||
          this.form.name === ''     || this.form.content === '' ||
          this.form.area === 0      || this.form.expected === 0   ) {
      alert("필수입력란(*)을 모두 입력해주세요")
    }
    else {
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
  }


  render() {
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Produce.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">날씨</Col>
                </Row>
              </CardHeader>
              <CardBody>
                {this.state.loading ? <div>현재 날씨 정보를 불러오는 중입니다.</div>
                :
                <Table className="ShowTable">
                  <tbody>
                    <tr>
                      <th>날씨</th>
                      <td>

                        <Input defaultValue={this.state.weatherInfo.currently.summary} onChange={(e) => {this.form.weather = e.target.value}} name="weather"></Input>
                      </td>
                      <th>강수량</th>
                      <td>
                        <Row>
                          <Col xs="8"><Input defaultValue={this.state.weatherInfo.daily.data[0].precipIntensity} onChange={(e) => {this.form.rain = e.target.value}}/></Col>
                          <Col xs="4">mm</Col>
                        </Row>
                      </td>
                      <th>적설량</th>
                      <td>
                        <Row>
                          <Col xs="8"><Input defaultValue={this.form.snow} onChange={(e) => {this.form.snow = e.target.value}}/></Col>
                          <Col xs="4">cm</Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <th>현재 기온</th>
                      <td>
                        <Row>
                          <Col xs="9"><Input defaultValue={Math.ceil((this.state.weatherInfo.currently.temperature - 32)/1.8)} onChange={(e) => {this.form.temperatures = e.target.value}}/></Col>
                          <Col xs="3">°C</Col>
                        </Row>
                      </td>
                      <th>최저 기온</th>
                      <td>
                        <Row>
                          <Col xs="9"><Input defaultValue={Math.ceil((this.state.weatherInfo.daily.data[0].temperatureMin - 32)/1.8)} onChange={(e) => {this.form.minTemp = e.target.value}}/></Col>
                          <Col xs="3">°C</Col>
                        </Row>
                      </td>
                      <th>최고 기온</th>
                      <td>
                        <Row>
                          <Col xs="9"><Input defaultValue={Math.ceil((this.state.weatherInfo.daily.data[0].temperatureMax - 32)/1.8)} onChange={(e) => {this.form.maxTemp = e.target.value}}/></Col>
                          <Col xs="3">°C</Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                }
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <Row>
									<Col>영농일지</Col>
                  {/*
                    <Col>
                      {<Popup
                        trigger={
                          <Col>
                            <div style={{float: "right"}}>
                              <Button onClick={() => {}} block color="primary">불러오기</Button>
                            </div>
                          </Col>
                        }
                        modal>
                        {close => <ProduceModal close={close} login={()=>{this.props.history.push('/login')}}
                          selectProduce={(data) => {
                            const {name, process, productName, productId, area, expected, content} = data;
                            console.log(data)
                            this.form.previous_id = data.id;
                            /this.form.name = name;
                            //this.form.process = process;
                            //this.form.content = content;
                            this.form.product_id = productId;
                            this.form.area = area;
                            this.form.expected = expected;
                            this.setState({productName})
                          }}
                        />}
                      </Popup>
                    </Col>*/}
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="ShowTable">
                  <tbody>
                    <tr>
                      <th>날짜<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <div style={{pointer: 'cursor'}}>
                          <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            locale="ko"
                            selected={this.state.date}
                            onChange={(date) => {this.setState({date})}}
                          />
                        </div>
                      </td>
                      <th>품목<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <Row>
                          <Col>
                            {<Popup
                              trigger={
                                <Input name='name' value={this.state.productName} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} readOnly />
                              }
                              modal>
                              {close => <ProductModal  close={close} login={()=>{this.props.history.push('/login')}}
                                selectProduct={(data) => {
                                  const {id, name} = data;
                                  this.form.product_id = id;
                                  this.setState({ productName: name });
																}}
																createProduct={() => {this.props.history.push('/product/create')}}
                              />}
                            </Popup>}
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <th>영농과정<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <Input defaultValue={this.form.process} placeholder="자유롭게 적어주세요" onChange={(e) => {this.form.process = e.target.value}}/>
                      </td>
                      <th>작업명<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <Input defaultValue={this.form.name} onChange={(e) => {this.form.name = e.target.value}}/>
                      </td>
                    </tr>
                    <tr>
                      <th>작업내용<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <Input defaultValue={this.form.content} onChange={(e) => {this.form.content = e.target.value}}/>
                      </td>
                      <th>재배 면적<span style={{color : "#FA5858"}}> *</span></th>
                      <td>
                        <Input type="number" defaultValue={this.form.area} placeholder="단위 : ha (1ha = 10,000㎡)"onChange={(e) => {this.form.area = e.target.value}}/>
                      </td>
                    </tr>
                    <tr>
                      <th>예상 생산량<span style={{color : "#FA5858"}}> *</span></th>
                      <td colSpan="3">
                        <Input type="number" defaultValue={this.form.expected} placeholder="단위 : kg" onChange={(e) => {this.form.expected = e.target.value}}/>
                      </td>
                    </tr>
                      <th>작업사진</th>
                      <td colSpan="3">
                        <div style={{paddingBottom: '10px'}}>
                          <input ref="file" type="file" name="file" onChange={e => {
                            this.handleFileInput(e);
                          }} style={{display: "none"}}/>
                          <img src='/assets/img/upload.jpg' border='0' style={{width: '10%', marginLeft: 10}}
                               onClick={() => document.all.file.click()}/>
                        </div>
                        <div>
                          <img id = "imageFile" alt="작업사진" style={{
                            display: "inline-block",
                            border: '1px',
                            borderStyle: 'dashed',
                            borderColor: '#c8ced3'
                          }} src ={this.state.image}/>
                        </div>
                      </td>
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button block color="primary" onClick={this.handlePost.bind(this)}>추가하기</Button>
              </CardFooter>
            </Card>
            {/*<Row>
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
                          <th>품목</th>
                          <td>
                          </td>
                          <th>영농과정</th>
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
                              <img alt="작업 사진" style={{height: 500, width: 500}} src={this.state.image_previous} /> <br></br>
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
                          <th>품목</th>
                          <td>
                          </td>
                          <th>영농과정</th>
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
                              <img alt="작업 사진" style={{height: 500, width: 500}} src={this.state.image_last} /> <br></br>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
						</Row>*/}
          </Col>
				</Row>
      </div>
    )
  }
}

export default Create;
