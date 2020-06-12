import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroup, InputGroupAddon} from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.form = {
      category: '',
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
      category: 'category1',
      discount: 'discount1',
      sale_period: 'sale_period1',
      vat: 'vat1',
      price: 0,
      discount_price: 0,
      first_date: new Date(),
      last_date: (new Date(new Date().getTime() + 60*60*24*1000*30*4)),
      userCategoryData : []
    };
  }

  componentWillMount() {
    //this.getProductFamily();
    this.getUserFamilyCategory();
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
      formData.append('file', new File([u8arr], this.state.image.name, {type: mime}));
    } else {
      formData.append('file', this.state.image);
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
						this.setState({ userCategoryData: data[1],}, () => {
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
  }

  changeDiscountPrice(e) {
    this.setState({discount_price: e.target.value})
  }

  changeSalePeriod(e) {
    this.setState({sale_period: e.target.value})
  }

  changeVAT(e) {
    this.setState({vat: e.target.value})
  }

  render() {
    var userCategoryData = this.state.userCategoryData;
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <div className="form-card">
                <div className="form-title">카테고리</div>
                <div className="form-innercontent">
                    <Input onChange={(e) => {
                      this.form.productFamily = e.target.value;
                    }} type='select' name="family">
                      {userCategoryData.map((e, i) => {
                        return <option key={i} value={e.id}>{e.name}</option>
                      })}
                    </Input>
                </div>
              </div>
              
              <div className="form-card">
                <div className="form-title">품목군</div>
                <div className="form-innercontent">
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
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상품명</div>
                <div className="form-innercontent">
                  <Input required onChange={(e) => this.form.name = e.target.value} placeholder="상품명 입력"/>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">판매가</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">판매가</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input type="number" placeholder="숫자만 입력" required onChange={(e) => this.form.price = e.target.value/*this.changePrice.bind(this)*/} />
                        <InputGroupAddon addonType="append">
                          원
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="sell-list">
                    <div className="sell-content">
                      <label className="sell-label">할인</label>
                      <div className="category-input-toggle">
                        <Input type="radio" name="discount" id="discount1" value="discount1" defaultChecked onChange={this.changeDiscount.bind(this)}/>
                        <label for="discount1">설정함</label>
                        <Input type="radio" name="discount" id="discount2" value="discount2" onChange={this.changeDiscount.bind(this)}/>
                        <label for="discount2">설정안함</label>
                      </div>
                    </div>
                  { this.state.discount === 'discount1' ?
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
                      <label className="sell-label total-discount">할인가</label>
                      <div className="sell-input total-discount">
                        {this.state.price - this.state.discount_price} 원 ( {this.state.discount_price} 원 할인 )
                      </div>
                    </div>
                    :
                    <div></div>
                  }
                  </div>
                  <div className="sell-list">
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
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">부가세</label>
                    <div className="category-input-toggle">
                      <Input type="radio" name="vat" id="vat1" value="vat1" defaultChecked onChange={this.changeVAT.bind(this)}/>
                      <label for="vat1">과세상품</label>
                      <Input type="radio" name="vat" id="vat2" value="vat2" onChange={this.changeVAT.bind(this)}/>
                      <label for="vat2">비과세상품</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">재고수량</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <InputGroup>
                      <Input placeholder="숫자만 입력"/>
                      <InputGroupAddon addonType="append">개</InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>
              </div>

              <div className="form-card">
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
              </div>

              <div className="form-card">
                <div className="form-title">상품이미지</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">대표이미지</label>
                    <div className="sell-input">
                      <div className="add-image">
                        <i className="fa fa-plus"></i>
                      </div>
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">추가이미지</label>
                    <div className="sell-input">
                      <div className="add-image">
                        <i className="fa fa-plus"></i>
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

