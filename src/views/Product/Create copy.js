import React, {Component} from 'react';
import {Button, Col, Row, Input, Table, InputGroup, InputGroupAddon} from 'reactstrap';
import DatePicker from "react-datepicker";
import FamilySelector from "./FamilySelector";
import {handleState} from '../common';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '/assets/img/plusImage.jpg',
      imageDetailPlus: '/assets/img/plusImage.jpg',
      imageDetail: [],
      imageDetailFile: [],
      imageDetailName : [],
      familyData: [],
      data: {
        detail_file: [],
        shippingDate : '',
        shippingEndDate : '',
        gap : '',
        category: 1,
        name: '',
        price: 0,
        discount_price: 0,
        productFamily: 0,
        state: 1,
        vat: '1',
        additional: '',
        gapCheck: '1',
        weight: 0,
        weight_unit: '',
        shippingCheck :'1'
      },
      checkCategory: true,
      category: 'category1',
      discount: 'discount1',
      sale_period: 'sale_period1',
      discount_price: 0,
      price: 0,
      shipping_date: new Date(),
      first_date: new Date(),
      last_date: (new Date(new Date().getTime() + 60*60*24*1000*30*4)),
      userCategoryData : []
    };
  }

  componentWillMount() {
    //this.getProductFamily();
    this.getUserFamilyCategory();
  }
  
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
    for(var i = 0; i < this.refs.file_detail.files.length; i++ ) {
      var file = this.refs.file_detail.files[i];
      //var canvasImg = document.createElement("img");
      var reader = new FileReader();
      reader.onload = (e) => {
        imgList.push(e.target.result);
        this.setState({imageDetail: imgList});
      };
      reader.readAsDataURL(file);
      imgFileList.push(file);
      imgFileNameList.push(file.name);
      this.setState({imageDetailFile: imgFileList, imageDetailName: imgFileNameList})
    }
  }

  convertDateFormat(date) {
    if(date === '') alert('출하 날짜를 입력해주세요') 
    else return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.imageFile);
    this.state.imageDetailFile.forEach((e) => {
      formData.append('file_detail', e);
    })
    for (let [key, value] of Object.entries(this.state.data)) {
      formData.append(key, value);
    }
    formData.set('shippingDate', this.convertDateFormat(this.state.data.shippingDate));
    formData.set('shippingEndDate', this.convertDateFormat(this.state.data.shippingEndDate));

    if(this.state.data.category === 1 && this.state.data.productFamily=== 0) alert('품목군을 선택해주세요')
    else { fetch(process.env.REACT_APP_HOST + "/product", {
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
          this.props.history.push('/main/product/list/primary');
        } else {
          alert('등록에 실패했습니다.');
        }
      });
    }
  }

  getUserFamilyCategory() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyCategory", {
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
              this.getProductFamily();
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
    fetch(process.env.REACT_APP_HOST + "/api/product/allFamily/"+this.state.category, {
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

  receiveStateFromChild = (category_value, productFamily_value) => {
    let {data} = this.state;
    data.category = category_value;
    data.productFamily = productFamily_value;

    this.setState({
      data
    })
  }

  scrollToNext(next) {
    var location = document.querySelector("#section"+next).offsetTop;
    window.scrollTo({top:location, behavior:'smooth'});
  }

  render() {
    let {data} = this.state;
    console.log(this.state)
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <FamilySelector receiveStateFromChild={this.receiveStateFromChild} />
              <div className="form-card" id="section2">
                <div className="form-title">상품명 <span style={{color : "#FA5858"}}>*</span></div>
                <div className="form-innercontent">
                  <Input required name="name" value={data.name} onChange={handleState.bind(this)} placeholder="상품명 입력" onBlur={()=>{this.scrollToNext(3)}}/>
                </div>
              </div>

              <div className="form-card" id="section3">
                <div className="form-title">가격</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">판매가 <span style={{color : "#FA5858"}}>*</span></label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input type="number" placeholder="숫자만 입력" required value={data.price} name="price" onChange={handleState.bind(this)}/>
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
                          <Input value={0} type="number" placeholder="숫자만 입력" required value={data.discount_price} name="discount_price" onChange={handleState.bind(this)} />
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
                  {/* { this.state.discount === 'discount1' ?
                    <div className="sell-discount">
                      <label className="sell-label">할인</label>
                      <div className="sell-input">
                        <InputGroup>
                          <Input placeholder="숫자만 입력" onChange={this.changeDiscountPrice.bind(this)}/>
                          <InputGroupAddon addonType="append">
                            원
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      
                    </div>
                    :
                    <div></div>
                  } */}
                  </div>
                  {/*<div className="sell-list">
                    <div className="sell-content">
                      <label className="sell-label">판매기간</label>
                      <div className="category-input-toggle">
                        <Input type="radio" name="sale_period" id="sale_period1" value="sale_period1" defaultChecked onChange={this.changeSalePeriod.bind(this)}/>
                        <label for="sale_period1">설정함</label>
                        <Input type="radio" name="sale_period" id="sale_period2" value="sale_period2" onChange={this.changeSalePeriod.bind(this)}/>
                        <label for="sale_period2">설정안함</label>
                      </div>
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
                  </div>*/}
                  {/* <div className="sell-list">
                    <label className="sell-label">부가세</label>
                    <div className="category-input-toggle">
                      <Input type="radio" name="vat" id="vat1" value="1" defaultChecked onChange={this.changeVAT.bind(this)}/>
                      <label htmlFor="vat1">과세상품</label>
                      <Input type="radio" name="vat" id="vat2" value="0" onChange={this.changeVAT.bind(this)}/>
                      <label htmlFor="vat2">면세상품</label>
                    </div>
                  </div> */}
                  <div className="sell-list">
                    <label className="sell-label">중량</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input style={{width: "30%"}} value={data.weight} name="weight" onChange={handleState.bind(this)}></Input>
                        <InputGroupAddon addonType="append">
                        <select name="weight_unit" onChange={handleState.bind(this)} onBlur={()=>{this.scrollToNext(4)}}>
                          <option selected disabled value="">단위</option>
                          <option value="kg">kg</option>
                          <option value="되">되</option>
                          <option value="밀">말</option>
                          <option value="근">근</option>
                        </select>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">최소 판매 수량</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input style={{width: "30%"}}></Input>
                        <InputGroupAddon addonType="append">
                          개
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="form-card">
                <div className="form-title">재고수량</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <InputGroup>
                      <Input placeholder="숫자만 입력"/>
                      <InputGroupAddon addonType="append">개</InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>
              </div> */}

              <div className="form-card" id="section4">
                <div className="form-title">GAP 인증 여부 <span style={{color : "#FA5858"}}>*</span></div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="1" onChange={handleState.bind(this)} defaultChecked/>인증</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="2" onChange={handleState.bind(this)} onClick={()=>{this.scrollToNext(5)}}/>인증하지 않음</label>
                    </div>
                    {this.state.data.gapCheck ==="1" ? <Input required name="gap" value={data.gap} onChange={handleState.bind(this)} placeholder="GAP 인증번호" onBlur={()=>{this.scrollToNext(5)}}/> : null}
                  </div>
                </div>
              </div>

              <div className="form-card" id="section5">
                <div className="form-title">품목상태 <span style={{color : "#FA5858"}}>*</span></div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={1} onChange={handleState.bind(this)} onClick={()=>{this.scrollToNext(6)}} defaultChecked/>판매중</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={2} onChange={handleState.bind(this)} onClick={()=>{this.scrollToNext(6)}} />품절</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={3} onChange={handleState.bind(this)} onClick={()=>{this.scrollToNext(6)}} />판매중지</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card" id="section6">
                <div className="form-title">출하일</div>
                <div className="form-innercontent">
                  <div className="search-input">
                    <label className="search-input-label"><input className="search-input-checkbox" name="shippingCheck" type="radio" value="1" onChange={handleState.bind(this)} defaultChecked/>설정</label>
                    <label className="search-input-label"><input className="search-input-checkbox" name="shippingCheck" type="radio" value="2" onChange={handleState.bind(this)} onClick={()=>{this.scrollToNext(7)}}/>설정하지 않음</label>
                  </div>
                  { this.state.data.shippingCheck === "1" ?
                  <div>
                    <div className="sell-list">
                      <label className="sell-label">출하 시작일</label>
                      <div className="sell-input">
                        <DatePicker
                            className="datepicker"
                            dateFormat="yyyy년 MM월 dd일"
                            locale="ko"
                            selected={this.state.data.shippingDate}
                            onChange={(shippingDate) => {data.shippingDate = shippingDate; this.setState({data})}}
                          />
                      </div>
                    </div>
                    <div className="sell-list">
                      <label className="sell-label">출하 종료일</label>
                      <div className="sell-input">
                          <DatePicker
                            className="datepicker"
                            dateFormat="yyyy년 MM월 dd일"
                            locale="ko"
                            selected={this.state.data.shippingEndDate}
                            onChange={(shippingEndDate) => {data.shippingEndDate = shippingEndDate; this.setState({data})}}
                            onBlur={()=>{this.scrollToNext(7)}}
                          />
                      </div>
                    </div>
                  </div>
                  : null }
                </div>
              </div>

              <div className="form-card" id="section7">
                <div className="form-title">추가사항</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <textarea style={{width: '100%', height: '100px'}} type="text" name="additional" value={data.additional} onChange={handleState.bind(this)} onBlur={()=>{this.scrollToNext(8)}}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card" id="section8">
                <div className="form-title">상품이미지</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">대표이미지</label>
                    <div className="sell-input">
                      <div style={{paddingBottom: '10px', cursor: 'pointer'}}>
                        <input ref="file" type="file" name="file" onChange={e => {
                          this.handleFileInput(e);
                        }} style={{display: "none"}}/>
                        <div id="imageFile" className="add-image" onClick={() => document.all.file.click()}>
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
                          <input ref="file_detail" type="file" name="file_detail" onClick={() => this.refs.file_detail.value = null} onChange={e => {
                            this.handleFileInput_multiple(e);
                          }} style={{display: "none"}} multiple/>
                          <div className="add-image-list">
                            <Table>
                              <tbody>
                                <tr>
                                  <th>파일명</th>
                                  <th style={{width: '100px'}}>삭제</th>
                                </tr>
                                {this.state.imageDetailName.map((e,i) => {
                                  return <tr key={i}>
                                    <td>{this.state.imageDetailName[i]}</td>
                                    <td>
                                      <Button color="danger" onClick={() => { 
                                        let { imageDetailName, imageDetailFile, imageDetail } = this.state;
                                        imageDetailName.splice(i,1);
                                        imageDetailFile.splice(i,1);
                                        imageDetail.splice(i,1);
                                        this.setState({imageDetailName, imageDetailFile, imageDetail});
                                      }}>x</Button>
                                    </td>
                                  </tr>
                                })}
                              </tbody>
                            </Table>
                          </div>
                          <div id="imageFile" className="add-image" onClick={() => document.all.file_detail.click()}>
                            <img style={{width:"300px"}} src={this.state.imageDetailPlus} />
                          </div>
                        </div>
                        {this.state.imageDetail.map((e, i) => {
                          return <img key={i} id="imageFile" alt="상세 사진1" style={{
                            width: "300px",
                            display: "inline-block",
                            border: '1px',
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
              <Button block outline color="primary">추가하기</Button>

            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateProduct;