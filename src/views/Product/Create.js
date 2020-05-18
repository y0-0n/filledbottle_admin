import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table} from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import Popup from "reactjs-popup";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      grade: '',
      weight: '',
      price: '',
      productFamily: 'NULL'
    };

    this.state = {
      image: '/assets/img/noimage.jpg',
      imageDetail: ['/assets/img/noimage.jpg'],
      familyData: [],
      data: [],
      checkCategory: true,
    };
  }

  componentWillMount() {
    this.getProductFamily();
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
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 300, 300);
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
    this.setState({image: this.state.image})
  }

  handleFileInput_multiple() {
    console.log(this.refs.file_detail.files)
    let imgList = [];
    for(var i = 0; i < this.refs.file_detail.files.length; i++ ) {
      var file = this.refs.file_detail.files[i];
      //var canvasImg = document.createElement("img");
      var reader = new FileReader();
      reader.readAsDataURL(file);
      // img resize
      reader.onload = function (e) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var url = e.target.result;
        var img = new Image();
        imgList.push(url);
        this.setState({imageDetail: imgList})
        img.src = url;
        canvas.width = 300;
        canvas.height = 300;
  
      }.bind(this);
    }
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();

    // base64 -> file object 변환
    // reference -> https://helloinyong.tistory.com/233
    if (this.state.image !== '/assets/img/noimage.jpg') {
      var arr = this.state.image.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
				u8arr = new Uint8Array(n);
				
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
			}
			console.warn(this.state.image)
      formData.append('file', new File([u8arr], this.state.image.name, {type: mime}));
    } else {
      formData.append('file', this.state.image);
		}
		
		if (this.state.imageDetail[0] !== '/assets/img/noimage.jpg') {
			this.state.imageDetail.forEach((e) => {
				var arr = e.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				formData.append('file_detail', new File([u8arr], e.name, {type: mime}));
			})
    } else {
      formData.append('file_detail', this.state.imageDetail[0]);
    }
    for (let [key, value] of Object.entries(this.form)) {
			formData.append(key, value);
		}
		
    fetch(process.env.REACT_APP_HOST + "/product", {
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
          this.props.history.push('/main/product/list');
        } else {
          alert('등록에 실패했습니다.');
        }
      });
  }


  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList/all", {
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
          if (data[1].length !== 0) {
            this.setState({familyData: data[1]});
            this.form.productFamily = data[1][0].id
          } else {
            this.setState({
              checkCategory: false
            })
            alert('품목군 추가를 해주세요');
            this.props.history.push('/main/registerdetail')
          }
        } else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    품목 등록하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                      <tr>
                        <th>품목명<span style={{color: "#FA5858"}}>*</span></th>
                        <td>
                          <Input required onChange={(e) => this.form.name = e.target.value}/>
                        </td>
                      </tr>
                      <tr>
                        <th>품목군</th>
                        <td>
                          {/*<Popup
                              trigger={<Input value={this.productFamily} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} onChange={() => { console.log('S') }} readOnly />}
                              modal>
                              {close => <ProductFamilyModal close={close} login={() => { this.props.history.push('/login') }}
                                selectProductFamily={(data) => {
                                  let { name, id } = data;
                                  this.productFamily = name;
                                  this.form.productFamily = id;
                                  this.forceUpdate();
                                  //set, for instance, comment[1] to "some text"
                                }} />}
                            </Popup>*/}
                          {this.state.checkCategory ?
                            <Input onChange={(e) => {
                              this.form.productFamily = e.target.value;
                            }} type='select' name="family">
                              {this.state.familyData.map((e, i) => {
                                return <option key={i} value={e.id}>{e.name}</option>
                              })}
                            </Input>
                            :
                            <div style={{textAlign: "left", padding: 10}}>
                              <div style={{display: "table-cell"}}>
                                <i style={{marginRight: 10}} class="fa fa-exclamation-circle"></i>
                              </div>
                              <div style={{display: "table-cell"}}>
                                품목군을 설정해서 품목 관리를 시작하세요. <br></br>
                                ( 우측상단의 회원정보 또는 품목군 추가하기 버튼을 통해 설정이 가능합니다. )
                              </div>
                              <div style={{display: "table-cell", paddingLeft: 50, verticalAlign: "middle"}}>
                                <Button color="primary" onClick={() => {
                                  this.props.history.push('/main/registerdetail')
                                }}>품목군 추가하기</Button>
                              </div>
                            </div>
                          }
                        </td>
                      </tr>
                      <tr>
                        <th>판매 단가<span style={{color: "#FA5858"}}>*</span></th>
                        <td>
                          <Row>
                            <Col xs="9">
                              <Input type="number" required onChange={(e) => this.form.price = e.target.value}/>
                            </Col>
                            <Col xs="3">원</Col>
                          </Row>
                        </td>
                      </tr>
                      <tr>
                        <th>대표 사진</th>
                        <td>
                          <div style={{paddingBottom: '10px'}}>
                            <input ref="file" type="file" name="file" onChange={e => {
                              this.handleFileInput(e);
                            }} style={{display: "none"}}/>
                            <img src='/assets/img/upload.jpg' border='0' style={{width: '10%', marginLeft: 10}}
                                 onClick={() => document.all.file.click()}/>
                          </div>
                          <div>
                            <img id="imageFile" alt="품목 사진" style={{
                              display: "inline-block",
                              border: '1px',
                              borderStyle: 'dashed',
                              borderColor: '#c8ced3',
                              maxWidth: '100%'
                            }} src={this.state.image}/>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          상세 사진
                          <p style={{color: "#D3D3D3", fontSize: "0.9em"}}>* 이미지 다중선택 가능</p>
                        </th>
                        <td>
                          <div style={{paddingBottom: '10px'}}>
                            <input ref="file_detail" type="file" name="file_detail" onChange={e => {
                              this.handleFileInput_multiple(e);
                            }} style={{display: "none"}} multiple/>
                            <img src='/assets/img/upload.jpg' border='0' style={{width: '10%', marginLeft: 10}}
                                onClick={() => document.all.file_detail.click()}/>
                          </div>
                          {this.state.imageDetail.map((e, i) => {
                            return <img key={i} id="imageFile" alt="상세 사진1" style={{
                              display: "inline-block",
                              border: '1px',
                              borderStyle: 'dashed',
															borderColor: '#c8ced3'
                            }} src={this.state.imageDetail[i]}/>
                          })}
                        </td>
                      </tr>
                      {/*<tr>
                          <th>등급</th>
                          <td >
                            <Input onChange={(e) => this.form.grade = e.target.value} />
                          </td>
                          <th>무게</th>
                          <td>
                            <Input onChange={(e) => this.form.weight = e.target.value} />
                          </td>
                        </tr>*/}
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">추가하기</Button>
                  </CardFooter>
                </Card>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateProduct;

