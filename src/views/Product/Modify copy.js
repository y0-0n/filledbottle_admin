

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, Badge ,InputGroup, InputGroupAddon } from 'reactstrap';
import DatePicker from "react-datepicker";
import { lastIndexOf } from 'core-js/fn/array';
import spinner from '../../assets/img/brand/loading_ani.gif'

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '/assets/img/plusImage.jpg', //대표 이미지 파일 경로
      imageDetail: [], //상세 이미지 파일 경로
      imageDetailFile: [], //상세 이미지 파일 객체
      imageDetailName: [], //상세 이미지 파일명

      familyData: [],
      userCategoryData : [],
      data: {detail_file: []},

      checkCategory: true,
      
      //discount: 'discount1', //할인여부
      //sale_period: 'sale_period1', //할인기간
      //vat: 'vat1', //부가세
      gap : '' //gap인증여부
    };

    this.form={
      category: '',
      productFamily : '',
      name: '',
      price : 0,
      discount_price : 0,
      state : '',
      shippingDate : '',
      additional : '',
      gap : '',
    }
  }

  componentWillMount() {
    this.getProduct();
    this.getUserFamilyCategory();
  }

  // blob 만드는 부분
  // handleFileInput() {
  //   var file = this.refs.file.files[0];
  //   var canvasImg = document.createElement("img");
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   // img resize
  //   reader.onload = function (e) {
  //     var canvas = document.createElement("canvas");
  //     var ctx = canvas.getContext("2d");
  //     var url = e.target.result;
  //     var img = new Image();
  //     img.onload = function () {
  //       ctx.drawImage(img, 0, 0, 300, 300);
  //       var dataurl = canvas.toDataURL('image/png');
  //       this.setState({
  //         image: dataurl
  //       });
  //       console.log(dataurl)
  //     }.bind(this);
  //     img.src = url;

  //     canvas.width = 300;
  //     canvas.height = 300;

  //   }.bind(this);
  //   this.setState({image: this.state.image})
  // }

  // handleFileInput_multiple() {
  //   console.log(this.refs.file_detail.files)
  //   let imgList = [];
  //   for(var i = 0; i < this.refs.file_detail.files.length; i++ ) {
  //     var file = this.refs.file_detail.files[i];
  //     //var canvasImg = document.createElement("img");
  //     var reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     // img resize
  //     reader.onload = function (e) {
  //       var canvas = document.createElement("canvas");
  //       var ctx = canvas.getContext("2d");
  //       var url = e.target.result;
  //       var img = new Image();
  //       imgList.push(url);
  //       this.setState({imageDetail: imgList})
  //       img.src = url;
  //       canvas.width = 300;
  //       canvas.height = 300;
  
  //     }.bind(this);
  //   }
  // }

  handleFileInput(e) {
    var file = e.target.files[0];
    var canvasImg = document.createElement("img");
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({image: reader.result})
    }
    reader.readAsDataURL(file);
    this.setState({imageFile: file});
  }

  handleFileInput_multiple(e) {
    let imgList = this.state.imageDetail, imgFileList = this.state.imageDetailFile, imgFileNameList = this.state.imageDetailName;
    console.log(imgList,imgFileList, imgFileNameList)
    //console.warn(this.refs.file_detail.files)
    for(var i = 0; i < this.refs.file_detail.files.length; i++ ) {
      var file = this.refs.file_detail.files[i];
      //console.warn(file)
      //var canvasImg = document.createElement("img");
      var reader = new FileReader();
      reader.onload = (e) => {
        imgList.push(e.target.result);
        this.setState({imageDetail: imgList});
        //console.warn(imgList)
      };
      reader.readAsDataURL(file);
      imgFileList.push(file);
      imgFileNameList.push(file.name);
      this.setState({imageDetailFile: imgFileList, imageDetailName: imgFileNameList})
    }
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST + "/product/" + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then(data => {
        data[0].detail_file = data[0].detail_file.split('|');
        this.form.productFamily = data[0].family;
        this.form.name = data[0].name;
        this.form.price = data[0].price_shipping;
        this.form.discount_price = data[0].discount_price;
        this.form.state = data[0].state;
        this.form.shippingDate = data[0].shippingDate;
        this.form.additional = data[0].additional;
        this.setState({
          price: data[0].price_shipping,
          additional: data[0].additional, 
          discount_price: data[0].discount_price, 
          imageFile: process.env.REACT_APP_HOST + "/static/"+data[0].file_name, 
          image : process.env.REACT_APP_HOST + "/static/" + data[0].file_name,
          imageDetailFile : data[0].detail_file,
          shippingDate: data[0].shippingDate,
        }, ()=> {
        })
        this.setState({ data: data[0], category: data[0].categoryId }, () => {
          this.getProductFamily();
          this.createFile();
          this.createMultipleFile();

        });
      });
  }

  // handleFileInput(e){
  //   var file = this.refs.file.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onloadend = function (e) {
  //     this.setState({
  //       image : [reader.result],
  //     });
  //   }.bind(this);

  //   let img = e.target.files[0];

  //   this.setState({img});
  // }

  modifyProduct(e) {
    e.preventDefault();

    let c = window.confirm('이 품목을 수정하시겠습니까?')

    if (c) {
      let formData = new FormData();
      //formData.append('file', this.state.img);
      formData.append('file', this.state.imageFile);

      this.state.imageDetailFile.forEach((e) => {
        formData.append('file_detail', e);
      })
  
      for (let [key, value] of Object.entries(this.form)) {
        formData.append(key, value);
      }
      fetch(process.env.REACT_APP_HOST + "/product/modify/" + this.props.match.params.id, {
        method: 'PUT',
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
            alert('수정됐습니다.');
            this.props.history.push('/main/product/' + this.props.match.params.id);
          } else {
            alert('수정에 실패했습니다.');
          }
        });
    }
  }

  getUserFamilyCategory() {
    fetch(process.env.REACT_APP_HOST + "/api/product/userFamilyCategory", {
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
        if (status === 200){
          if(data[1].length !== 0) {
            // this.props.checkCategoryId(data[1][0].id)
            this.setState({ userCategoryData: data[1], category: data[1][0].id}, () => {
              // this.getProductFamily();
            });
          } else {
            this.setState({
              checkCategory: false
            })
          }
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList/"+this.state.category, {
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
          this.setState({ familyData: data[1] });
          this.form.productFamily = data[1][0].id;
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  handleClick = ({ target: { name, value } }) => {
    let {data} = this.state;
    data[name] = value
    this.setState(data);
    console.log(this.state)
  };


  changeState(e) {
    let {data} = this.state;
    data.state = parseInt(e.target.value);
    this.setState({data})
    this.form.state = e.target.value;
  }
  
  async createFile(){
    let response = await fetch(`${this.state.imageFile}`);
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    this.setState({imageFile: file});
    console.log(this.state.imageFile)
  }

  async createMultipleFile(){
    let imgFileList = [], imgFileNameList = this.state.imageDetailName;
    for(var i = 0; i < this.state.imageDetailFile.length; i++){
      let response = await fetch(process.env.REACT_APP_HOST + `/static/${this.state.imageDetailFile[i]}`);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let fileName = this.state.data.detail_file[i].substring(29,this.state.data.detail_file[i].length)
      let file = new File([data], fileName , metadata);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      imgFileList.push(file)
      imgFileNameList.push(fileName)
    }
    this.setState({imageDetailFile:imgFileList, imageDetailName: imgFileNameList});
  }

  render() {
    var userCategoryData = this.state.userCategoryData;
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
      <link rel="stylesheet" type="text/css" href="css/ProductDetail.css"></link>
      <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.modifyProduct.bind(this)}>
              <div className="form-card">
                <div className="form-title">카테고리</div>
                <div className="form-innercontent">
                    <Input onChange={(e) => {
                      this.setState({category: e.target.value}, ()=> {
                        this.getProductFamily();
                      });
                    }} type='select' name="family">
                      {userCategoryData.map((e, i) => {
                        return <option selected={e.id === data.categoryId} key={i} value={e.id}>{e.name}</option>
                      })}
                    </Input>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">품목군</div>
                <div className="form-innercontent">
                  <Input defaultValue={data.familyName} onChange={this.handleClick} type='select' name="family">
                      {this.state.familyData.map((e, i) => {
                        return <option key={i} value={e.id} selected={e.id === data.family}>{e.name}</option>
                      })}
                  </Input>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상품명</div>
                <div className="form-innercontent">
                  <Input name="name" defaultValue={data.name} onChange={this.handleClick}/>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">판매가</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">판매가</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input defaultValue={data.price_shipping} name="price_shipping" value={this.state.data.price_shipping} onChange={this.handleClick}/>
                        <InputGroupAddon addonType="append">
                          원
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="sell-list">
                    <div className="sell-content">
                      <label className="sell-label">할인</label>
                      {/* <div className="category-input-toggle">
                        <Input type="radio" name="discount" id="discount1" value="discount1" defaultChecked onChange={this.changeDiscount.bind(this)}/>
                        <label for="discount1">설정함</label>
                        <Input type="radio" name="discount" id="discount2" value="discount2" onChange={this.changeDiscount.bind(this)}/>
                        <label for="discount2">설정안함</label>
                      </div> */}
                      <div className="sell-input">
                        <InputGroup>
                          <Input type="number" placeholder="숫자만 입력" required defaultValue={data.discount_price} name="discount_price" value={this.state.data.discount_price} onChange={this.handleClick} />
                          <InputGroupAddon addonType="append">
                            원
                          </InputGroupAddon>
                        </InputGroup>
                        <div className="sell-discount" style={{marginTop: "20px"}}>
                          <label className="sell-label total-discount">할인가</label>
                          <div className="sell-input total-discount">
                            {this.state.data.price_shipping - this.state.data.discount_price} 원 ( {this.state.data.discount_price} 원 할인 )
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">GAP 인증 여부</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="1" onChange={this.handleClick} defaultChecked/>인증</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="2" onChange={this.handleClick} />인증하지 않음</label>
                    </div>
                    <Input required name="gap" value={this.state.data.gap} onChange={this.handleClick} placeholder="GAP 인증번호"/>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">품목상태</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={1} onChange={this.handleClick} checked={data.state===1 || data.state==="1"} />판매중</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={2} onChange={this.handleClick} checked={data.state===2 || data.state==="2"} />품절</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={3} onChange={this.handleClick} checked={data.state===3 || data.state==="3"} />판매중지</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">출하일</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <Input style={{width : '500px'}} name="shippingDate" defaultValue={data.shippingDate} onChange={this.handleClick} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">추가사항</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <textarea style={{width: '100%', height: '100px'}} type='text' name="additional" value={data.additional} onChange={this.handleClick} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상품이미지</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">
                      대표이미지
                      <p style={{color: "#D3D3D3", fontSize: "0.9em"}}>* 수정하려면 <br></br> 이미지를 클릭하세요.</p>
                    </label>
                    <div className="sell-input">
                      <div style={{paddingBottom: '10px', cursor: 'pointer'}}>
                        <input ref="file" type="file" name="file" onChange={e => {
                          this.handleFileInput(e);
                        }} style={{display: "none"}}/>
                        <div id="imageFile" className="add-image" onClick={() => document.all.file.click()}>
                          {/* <img style={{width:"300px"}} alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} /> */}
                          <img style={{width:"300px"}} src={this.state.image} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">
                      상세이미지
                      <p style={{color: "#D3D3D3", fontSize: "0.9em"}}>* 이미지 다중선택 가능</p>
                    </label>
                    
                    <div className="sell-input">
                      <div className="sell-image">
                        
                        <div style={{paddingBottom: '10px', cursor: 'pointer'}}>
                          <input ref="file_detail" type="file" name="file_detail" onChange={e => {
                            this.handleFileInput_multiple(e);
                          }} style={{display: "none"}} multiple/>
                          <div className="add-image-list">
                            <Table>
                              <tbody>
                                <tr>
                                  <th style={{width: '750px'}}>파일명</th>
                                  <th>삭제</th>
                                </tr>
                                {this.state.imageDetailName.map((e,i) => {
                                  return <tr key={i}>
                                    <td>{this.state.imageDetailName[i]}</td>
                                    <td>
                                      <Button color="danger" onClick={() => { 
                                        let { imageDetailName, imageDetailFile, imageDetail, data } = this.state;
                                        if(i < this.state.data.detail_file.length) {
                                          imageDetailName.splice(i,1);
                                          data.detail_file.splice(i,1);
                                          imageDetailFile.splice(i,1);
                                        }
                                        else {
                                          imageDetailName.splice(i,1);
                                          imageDetail.splice(i-this.state.data.detail_file.length, 1);
                                          imageDetailFile.splice(i,1);
                                        }
                                        this.setState({imageDetailName, imageDetailFile, imageDetail, data});
                                      }}>x</Button>
                                    </td>
                                  </tr>
                                })}
                              </tbody>
                            </Table>
                            <div style={{textAlign: 'center'}}>
                                {/*<img src={spinner} />*/}
                                {this.state.imageDetailName.length === 0 ?<p>이미지가 존재하지 않습니다.</p> : null}
                            </div>
                          </div>
                          <div id="imageFile" className="add-image" onClick={() => document.all.file_detail.click()}>
                            <img style={{width:"300px"}} src='/assets/img/plusImage.jpg' />
                          </div>
                        </div>
                        {data.detail_file.map((e, i) => {
												  return <img key={i} alt="품목 사진" style={{width: "100%"}} src={process.env.REACT_APP_HOST + '/static/' + e} />
											  })}
                        {this.state.imageDetail.map((e, i) => {
                          return <img key={i} id="imageFile" alt="상세 사진1" style={{
                            display: "inline-block",
                            border: '1px',
                            width: '300px',
                            borderStyle: 'dashed',
                            borderColor: '#c8ced3',
                            marginBottom: '10px'
                          }} src={this.state.imageDetail[i]}/>
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button color="primary" style={{width: "100%"}}>수정하기</Button>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Modify;

