

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, Badge ,InputGroup, InputGroupAddon } from 'reactstrap';
import DatePicker from "react-datepicker";

class Modify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '/assets/img/plusImage.jpg',
      imageDetailPlus: '/assets/img/plusImage.jpg',
      imageDetail: [],
      imageDetailFile: [],
      familyData: [],
      checkCategory: true,
      discount: 'discount1',
      sale_period: 'sale_period1',
      vat: 'vat1',
      price: 0,
      userCategoryData : [],
      data: {detail_file: []},
      discount_price: 0,
    };

    this.form={
      productFamily : ''
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
    let imgList = [], imgFileList = [];
    console.warn(this.refs.file_detail.files)
    for(var i = 0; i < this.refs.file_detail.files.length; i++ ) {
      var file = this.refs.file_detail.files[i];
      console.warn(file)
      //var canvasImg = document.createElement("img");
      var reader = new FileReader();
      reader.onload = (e) => {
        imgList.push(e.target.result);
        this.setState({imageDetail: imgList});
        console.warn(imgList)
      };
      reader.readAsDataURL(file);
      imgFileList.push(file)
      this.setState({imageDetailFile: imgFileList})
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
        data[0].detail_file = data[0].detail_file.split('|')
        console.warn(data[0])
        this.form.productFamily = data[0].family;
        this.form.name = data[0].name;
        this.form.price = data[0].price_shipping;
        this.form.discount_price = data[0].discount_price;
        this.setState({price: data[0].price_shipping, discount_price: data[0].discount_price})
        this.setState({ data: data[0], category: data[0].categoryId }, () => {
          this.getProductFamily();
        });
      });
  }

  /*handleFileInput(e){
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
  }*/

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
            //this.props.checkCategoryId(data[1][0].id)
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
        if (status === 200)
          this.setState({ familyData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  changeCategory(e) {
    this.setState({category: e.target.value})
    console.log(this.state.category)
  }

  changeDiscount(e) {
    this.setState({discount: e.target.value})
    console.log(this.state.discount)
  }

  changePrice(e) {
    this.setState({price: e.target.value})
    this.form.price = e.target.value;
  }

  changeDiscountPrice(e) {
    this.setState({discount_price: e.target.value});
    this.form.discount_price = e.target.value;
  }

  changeSalePeriod(e) {
    this.setState({sale_period: e.target.value})
  }

  changeVAT(e) {
    this.setState({vat: e.target.value})
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
                      this.form.category = e.target.value;
                      this.setState({category: e.target.value}, ()=> {
                        this.getProductFamily()
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
                  <Input defaultValue={data.familyName} onChange={(e) => {
                      this.form.productFamily = e.target.value;
                    }} type='select' name="family">
                      {this.state.familyData.map((e, i) => {
                        return <option key={i} value={e.id} selected={e.id === data.family}>{e.name}</option>
                      })}
                  </Input>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상품명</div>
                <div className="form-innercontent">
                  <Input defaultValue={data.name} onChange={(e) => this.form.name = e.target.value}/>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">판매가</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">판매가</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input defaultValue={data.price_shipping} onChange={this.changePrice.bind(this)}/>
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
                          <Input type="number" placeholder="숫자만 입력" required defaultValue={data.discount_price} onChange={this.changeDiscountPrice.bind(this)} />
                          <InputGroupAddon addonType="append">
                            원
                          </InputGroupAddon>
                        </InputGroup>
                        <div className="sell-discount" style={{marginTop: "20px"}}>
                          <label className="sell-label total-discount">할인가</label>
                          <div className="sell-input total-discount">
                            {this.state.price - this.state.discount_price} 원 ( {this.state.discount_price} 원 할인 )
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    {/* <div className="sell-list">
                    <div className="sell-content">
                      <label className="sell-label">판매기간</label>
                    </div>
                    { this.state.sale_period === 'sale_period1' ?
                    <div className="sell-discount">
                      <label className="sell-label">기간설정</label>
                      <div className="sell-input">
                        <DatePicker
                          className="datepicker"
                          dateFormat="yyyy년 MM월 dd일"
                          locale="ko"
                          selected={this.state.first_date}
                          onChange={(first_date) => { this.setState({ first_date }) }}
                        />
                        &nbsp;~&nbsp;
                        <DatePicker
                          className="datepicker"
                          dateFormat="yyyy년 MM월 dd일"
                          locale="ko"
                          selected={this.state.last_date}
                          onChange={(last_date) => { this.setState({ last_date }) }}
                        />
                      </div>
                    </div>
                    :
                    <div></div>
                  }
                  </div> */}
                  {/* <div className="sell-list">
                    <label className="sell-label">부가세</label>
                    <div className="category-input-toggle">
                      <Input type="radio" name="vat" id="vat1" value="vat1" defaultChecked onChange={this.changeVAT.bind(this)}/>
                      <label for="vat1">과세상품</label>
                      <Input type="radio" name="vat" id="vat2" value="vat2" onChange={this.changeVAT.bind(this)}/>
                      <label for="vat2">비과세상품</label>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* <div className="form-card">
                <div className="form-title">품목상태</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" type="checkbox" checked/>판매중</label>
                      <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>품절</label>
                      <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매중지</label>
                    </div>
                  </div>
                </div>
              </div> */}

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
                          <img style={{width:"300px"}} alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
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
                          <div id="imageFile" className="add-image" onClick={() => document.all.file_detail.click()}>
                            <img style={{width:"300px"}} src={this.state.imageDetailPlus} />
                          </div>
                        </div>
                        {/* {console.log(data)} */}
                        {data.detail_file.map((e, i) => {
												  return <img alt="품목 사진" src={"http://211.62.225.216:4000/static/" + e} />
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

