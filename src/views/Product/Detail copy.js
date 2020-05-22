import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import DatePicker from "react-datepicker";


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.getProduct();
    console.log(this.props.match.params.id)
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST + "/product/" + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then(data => { this.setState({ data: data[0] }) });
  }

  deactivateProduct(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/product/deactivate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(_ => { this.getProduct() });
    }
  }

  activateProduct(id) {
    let c = window.confirm('이 품목을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/product/activate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
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
            this.getProduct()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data">
              <div className="form-card">
                <div className="form-title">카테고리</div>
                <div className="form-innercontent">
                  <div className="category-">
                    <div className="category-input-toggle">
                      <Input type="radio" name="category" id="category1" value="category1" defaultChecked/>
                      <label for="category1">카테고리명 검색</label>
                      <Input type="radio" name="category" id="category2" value="category2"/>
                      <label for="category2">카테고리명 선택</label>
                    </div>
                  </div>
                  { this.state.category === 'category1' ? 
                    <div className="category-content">
                      <Input placeholder="카테고리명 입력"/>
                    </div>
                  :
                    <div className="category-content category-list">
                      <div className="category-ul">
                      {data.familyName}
                      </div>
                    </div>
                  }
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">상품명</div>
                <div className="form-innercontent">
                  {data.name}
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">판매가</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">판매가</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input placeholder={data.price_shipping} disabled/>
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
                        <Input type="radio" name="discount" id="discount1" value="discount1" defaultChecked/>
                        <label for="discount1">설정함</label>
                        <Input type="radio" name="discount" id="discount2" value="discount2"/>
                        <label for="discount2">설정안함</label>
                      </div>
                    </div>
                  { this.state.discount === 'discount1' ?
                    <div className="sell-discount">
                      <label className="sell-label">할인</label>
                      <div className="sell-input">
                        <InputGroup>
                          <Input placeholder="숫자만 입력"/>
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
                        <Input type="radio" name="sale_period" id="sale_period1" value="sale_period1" defaultChecked/>
                        <label for="sale_period1">설정함</label>
                        <Input type="radio" name="sale_period" id="sale_period2" value="sale_period2"/>
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
                      <Input type="radio" name="vat" id="vat1" value="vat1" defaultChecked/>
                      <label for="vat1">과세상품</label>
                      <Input type="radio" name="vat" id="vat2" value="vat2"/>
                      <label for="vat2">면세상품</label>
                      <Input type="radio" name="vat" id="vat3" value="vat3"/>
                      <label for="vat3">영세상품</label>
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
                <div className="form-title">상품이미지</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">대표이미지</label>
                    <div className="sell-input">
                      <img alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">추가이미지</label>
                    <div className="sell-input">
                      <img alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                      <img alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                      <img alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                    </div>
                  </div>
                </div>
              </div>

            </form>
            <Button style={{width: "100%"}} color="primary" onClick={() => { this.props.history.push(`/main/product/edit/${this.props.match.params.id}`) }}>수정하기</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Detail;
