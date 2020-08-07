import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Badge, InputGroup, InputGroupAddon } from 'reactstrap';

//고객정보 가져오기 위해 임의의 id를 사용함

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        product : [{name : '사과', stock: 10, quantity: 1, price : 10000, tax: false, }]
    };
  }

  componentWillMount() {
    this.getDetail();
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST + "/customer/" + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => { this.setState({ data: data[0] }) });
  }

  numberWithCommas(x) {
    if (!x) {
      console.log('Cannot convert');
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let { data } = this.state;
    var total_price = 0;
    var total_supply = 0;
    var total_vat = 0;
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div className="form-card">
            <div className="form-title">고객 정보</div>
            <div className="form-innercontent">
                <Table className="ShowTable">
                    <tbody>
                        <tr>
                            <th>고객명</th>
                            <td>{data.name}</td>
                            <th>사업자등록번호</th>
                            <td>{data.crNumber}</td>
                        </tr>
                        <tr>
                            <th>연락처1</th>
                            <td>{data.cellphone}</td>
                            <th>연락처2</th>
                            <td>{data.telephone}</td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td colSpan="3">{data.address} {data.address_detail} ({data.postcode})</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
        <div className="form-card">
            <div className="form-title">미수금 품목</div>
            <div className="form-innercontent">
                <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                <Table>
                    <thead>
                    <tr>
                        <th>품목명</th>
                        <th>재고</th>
                        <th>수량</th>
                        <th>판매 단가</th>
                        <th>공급가액</th>
                        <th>부가세</th>
                        <th>과세</th>
                        <th>미수금액</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.product.map((e, i) =>{
                                total_price += e['price'];
                                total_supply += Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']);
                                total_vat += Math.round(e['tax'] ? e['price'] * 1 / 11 : 0);
                                return (
                                    <tr key={i}>
                                        <td>{e.name}</td>
                                        <td>{e.stock}</td>
                                        <td>{e.quantity}</td>
                                        <td>{this.numberWithCommas(e.price / e.quantity)}</td>
                                        <td>{this.numberWithCommas(Math.round(e.tax ? e.price * 10 / 11 : e.price))}</td>
                                        <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                                        <td style={{ textAlign: 'center' }}><Input name='tax' type='checkbox' checked={e.tax || false} disabled /></td>
                                        <td>{this.numberWithCommas(e.price)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr style={{backgroundColor: 'lightgrey'}}>
                            <th>미수금 총합</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{this.numberWithCommas(total_supply)}</th>
                            <th>{this.numberWithCommas(total_vat)}</th>
                            <th></th>
                            <th>{this.numberWithCommas(total_price)}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </Table>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Detail;
