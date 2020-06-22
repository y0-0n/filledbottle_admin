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
      image: '/assets/img/plusImage.jpg',
      imageDetailPlus: '/assets/img/plusImage.jpg',
      imageDetail: [],
      imageDetailFile: [],
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

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.imageFile);

    this.state.imageDetailFile.forEach((e) => {
			formData.append('file_detail', e);
		})
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
                      this.form.category = e.target.value;
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

              <div className="form-card">
                <div className="form-title">품목상태</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio" checked/>판매중</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio"/>품절</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio"/>판매중지</label>
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
                      <div style={{paddingBottom: '10px', cursor: 'pointer'}}>
                        <input ref="file" type="file" name="file" onChange={e => {
                          this.handleFileInput(e);
                        }} style={{display: "none"}}/>
                        <div id="imageFile" className="add-image" onClick={() => document.all.file.click()}>
                          <img src={this.state.image} />
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
                            <img src={this.state.imageDetailPlus} />
                          </div>
                        </div>
                        {this.state.imageDetail.map((e, i) => {
                          return <img key={i} id="imageFile" alt="상세 사진1" style={{
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

