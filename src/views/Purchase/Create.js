import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroup, InputGroupAddon } from 'reactstrap';
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
      last_date: (new Date(new Date().getTime() + 60 * 60 * 24 * 1000 * 30 * 4)),
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
    this.setState({ image: this.state.image })
  }

  handleFileInput_multiple() {
    console.log(this.refs.file_detail.files)
    let imgList = [];
    for (var i = 0; i < this.refs.file_detail.files.length; i++) {
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
        this.setState({ imageDetail: imgList })
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
      formData.append('file', new File([u8arr], this.state.image.name, { type: mime }));
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
            this.setState({ familyData: data[1] });
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
    this.setState({ category: e.target.value })
    console.log(this.state.category)
  }

  changeDiscount(e) {
    this.setState({ discount: e.target.value })
    console.log(this.state.discount)
  }

  changePrice(e) {
    this.setState({ price: e.target.value })
  }

  changeDiscountPrice(e) {
    this.setState({ discount_price: e.target.value })
  }

  changeSalePeriod(e) {
    this.setState({ sale_period: e.target.value })
  }

  changeVAT(e) {
    this.setState({ vat: e.target.value })
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <div className="form-card">
                <div className="form-title">분류</div>
                <div className="form-innercontent" >
                  <select style={{width: "80%"}}>
                    <option>인건비</option>
                    <option>관리비</option>
                    <option>재료비</option>
                  </select>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상세내용</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">날짜</label>
                    <div className="sell-input">
                      <DatePicker
                        className="datepicker"
                        dateFormat="yyyy년 MM월 dd일"
                        locale="ko"
                        selected={this.state.first_date}
                        onChange={(first_date) => { this.setState({ first_date }) }}
                      />
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">항목명</label>
                    <div className="sell-input">
                      <Input style={{width:"30%"}}></Input>
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">금액</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input placeholder="숫자만 입력" onChange={this.changeDiscountPrice.bind(this)} />
                        <InputGroupAddon addonType="append">
                          원
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">비고</label>
                    <div className="sell-input">
                      <Input style={{width:"30%"}}></Input>
                    </div>
                  </div>
                </div>
              </div>
            <Button color="primary" style={{width: "100%"}}>추가하기</Button>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateProduct;

