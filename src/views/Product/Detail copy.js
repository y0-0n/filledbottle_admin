import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import DatePicker from "react-datepicker";


class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {detail_file: []}
    };
  }

  componentWillMount() {
    this.getProduct();
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
        this.setState({price: data[0].price_shipping, discount_price: data[0].discount_price})
				this.setState({ data: data[0] })
			});
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
                  {data.categoryName}
                </div>
              </div>
              
              <div className="form-card">
                <div className="form-title">품목군</div>
                <div className="form-innercontent">
                  {data.familyName}
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
                        <Button style={{marginTop: '10px'}} onClick={() => { this.props.history.push('/main/product/list/calculator'); }} color="primary">원가계산기</Button>
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
                          <Input type="number" placeholder="숫자만 입력" disabled placeholder={data.discount_price} />
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
                  </div>*/}
                  <div className="sell-list">
                    <label className="sell-label">부가세</label>
                    <div className="category-input-toggle">
                      <Input type="radio" name="vat" id="vat1" disabled checked={data.tax === 1}/>
                      <label htmlFor="vat1">과세상품</label>
                      <Input type="radio" name="vat" id="vat2" disabled checked={data.tax === 0}/>
                      <label htmlFor="vat2">면세상품</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">품목상태</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio" value="1" checked={data.state===1} />판매중</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio" value="2" checked={data.state===2} />품절</label>
                      <label className="search-input-label"><input className="search-input-checkbox" name="product_state" type="radio" value="3" checked={data.state===3} />판매중지</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">출하일</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      {data.shippingDate}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-card">
                <div className="form-title">추가사항</div>
                <div className="form-innercontent">
                  <div className="sell-input">
                    <div className="search-input">
                      {data.detail}
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
                      <img style={{width: '500px'}} alt="품목 사진" src={data.file_name ? process.env.REACT_APP_HOST+"/static/" + data.file_name : '318x180.svg'} />
                    </div>
                  </div>
                  <div className="sell-list">
                    <label className="sell-label">상세이미지</label>
                    <div className="sell-input">
											{this.state.data.detail_file.map((e, i) => {
												return <img style={{width: '100%'}} key={i} alt="품목 사진" src={process.env.REACT_APP_HOST+"/static/" + e} />
											})}
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
