import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import _fetch from '../../../fetch';
import { Badge, Button, Input, InputGroup, InputGroupAddon, Table,  } from 'reactstrap';
import ProductFamily from "../../common/ProductFamily";
import DatePicker from "react-datepicker";

const CreateProduct = () => {
  let {id} = useParams();

  const [data, setData] = useState([])
  const [shippingDate, setShippingDate] = useState([])
  const [shippingEndDate, setShippingEndDate] = useState([])
  const [gap, setGap] = useState([])
  const [category, setCategory] = useState([])
  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [discountPrice, setDiscountPrice] = useState([])
  const [productFamily, setProductFamily] = useState([])
  const [state, setState] = useState([])
  const [vat, setVat] = useState([])
  const [additional, setAdditional] = useState([])
  const [gapCheck, setGapCheck] = useState([])
  const [weight, setWeight] = useState([])
  const [weightUnit, setWeightUnit] = useState([])
  const [shippingCheck, setShippingCheck] = useState([])

  useEffect(() => {
    setData(
      {
        shippingDate : shippingDate,
        shippingEndDate : shippingDate,
        gap : gap,
        category: category,
        name: name,
        price: price,
        discount_price: discountPrice,
        productFamily: productFamily,
        state: state,
        vat: vat,
        additional: additional,
        gapCheck: gapCheck,
        weight: weight,
        weight_unit: weightUnit,
        shippingCheck :shippingCheck
      }
    );
  }, [shippingDate, shippingDate, gap, category, name, price, discountPrice, productFamily, state, vat, additional, gapCheck, weight, weightUnit, shippingCheck])
  return (
    <div className = "animated fadeIn align-items-center" >
      <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
          <form encType="multipart/form-data" >
            <ProductFamily />
            <div className="form-card" id="section2">
              <div className="form-title">상품명 <span style={{ color: "#FA5858" }}>*</span></div>
              <div className="form-innercontent">
                <Input required name="name" value={data.name} onChange={(e) => setName(e.target.value)} placeholder="상품명 입력" />
              </div>
            </div>

            <div className="form-card" id="section3">
              <div className="form-title">가격</div>
              <div className="form-innercontent">
                <div className="sell-list">
                  <label className="sell-label">판매가 <span style={{ color: "#FA5858" }}>*</span></label>
                  <div className="sell-input">
                    <InputGroup>
                      <Input type="number" placeholder="숫자만 입력" required value={data.price} name="price" onChange={(e) => setPrice(e.target.value)} />
                      <InputGroupAddon addonType="append">
                        원
                        </InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>
                <div className="sell-list">
                  <div className="sell-content">
                    <label className="sell-label">할인</label>
                    <div className="sell-input">
                      <InputGroup>
                        <Input value={0} type="number" placeholder="숫자만 입력" required value={data.discountPrice} name="discount_price" onChange={(e) => setDiscountPrice(e.target.value)} />
                        <InputGroupAddon addonType="append">
                          원
                          </InputGroupAddon>
                      </InputGroup>
                      <div className="sell-discount" style={{ marginTop: "20px" }}>
                        <label className="sell-label total-discount">할인가</label>
                        <div className="sell-input total-discount">
                          {price - discountPrice} 원 ( {discountPrice} 원 할인 )
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
 
                <div className="sell-list">
                  <label className="sell-label">중량</label>
                  <div className="sell-input">
                    <InputGroup>
                      <Input style={{ width: "30%" }} value={data.weight} name="weight" onChange={(e) => setWeight(e.target.value)}></Input>
                      <InputGroupAddon addonType="append">
                        <select name="weightUnit" onChange={(e) => setWeightUnit(e.target.value)}>
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
                      <Input style={{ width: "30%" }}></Input>
                      <InputGroupAddon addonType="append">
                        개
                        </InputGroupAddon>
                    </InputGroup>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card" id="section4">
              <div className="form-title">GAP 인증 여부 <span style={{ color: "#FA5858" }}>*</span></div>
              <div className="form-innercontent">
                <div className="sell-input">
                  <div className="search-input">
                    <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="1" onChange={(e) => setGapCheck(e.target.value)} defaultChecked />인증</label>
                    <label className="search-input-label"><input className="search-input-checkbox" name="gapCheck" type="radio" value="2" onChange={(e) => setGapCheck(e.target.value)}/>인증하지 않음</label>
                  </div>
                  {gapCheck === "1" ? <Input required name="gap" value={data.gap} onChange={(e) => setGap(e.target.value)} placeholder="GAP 인증번호"/> : null}
                </div>
              </div>
            </div>

            <div className="form-card" id="section5">
              <div className="form-title">품목상태 <span style={{ color: "#FA5858" }}>*</span></div>
              <div className="form-innercontent">
                <div className="sell-input">
                  <div className="search-input">
                    <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={1} onChange={(e) => setState(e.target.value)} defaultChecked />판매중</label>
                    <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={2} onChange={(e) => setState(e.target.value)} />품절</label>
                    <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" value={3} onChange={(e) => setState(e.target.value)} />판매중지</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card" id="section6">
              <div className="form-title">출하일</div>
              <div className="form-innercontent">
                <div className="search-input">
                  <label className="search-input-label"><input className="search-input-checkbox" name="shippingCheck" type="radio" value="1" onChange={(e) => setShippingCheck(e.target.value)} defaultChecked />설정</label>
                  <label className="search-input-label"><input className="search-input-checkbox" name="shippingCheck" type="radio" value="2" onChange={(e) => setShippingCheck(e.target.value)}/>설정하지 않음</label>
                </div>
                {shippingCheck === "1" ?
                  <div>
                    <div className="sell-list">
                      <label className="sell-label">출하 시작일</label>
                      <div className="sell-input">
                        <DatePicker
                          className="datepicker"
                          dateFormat="yyyy년 MM월 dd일"
                          locale="ko"
                          // selected={this.state.data.shippingDate}
                          // onChange={(shippingDate) => { data.shippingDate = shippingDate; this.setState({ data }) }}
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
                          // selected={this.state.data.shippingEndDate}
                          // onChange={(shippingEndDate) => { data.shippingEndDate = shippingEndDate; this.setState({ data }) }}
                        />
                      </div>
                    </div>
                  </div>
                  : null}
              </div>
            </div>

            <div className="form-card" id="section7">
              <div className="form-title">추가사항</div>
              <div className="form-innercontent">
                <div className="sell-input">
                  <div className="search-input">
                    <textarea style={{ width: '100%', height: '100px' }} type="text" name="additional" value={data.additional} onChange={(e) => setAdditional(e.target.value)} onBlur={() => { this.scrollToNext(8) }}></textarea>
                  </div>
                </div>
              </div>
            </div>
            <Button block outline color="primary">추가하기</Button>

          </form>
      </div >
  );
};

export default CreateProduct;