import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';
import ReactToPrint from "react-to-print";

const product_mockup = [{name : "사과", weight: "10kg", quantity: 3, price: 990, tax : 100},{name : "포도", weight: "30kg", quantity: 30, price: 990, tax : 100}]
const order_mockup = {name: "정소원", telephone : "010-8888-2222", cellphone : "070-2222-1111", address : "서울특별시 성북구", crNumber : "100-22-33333", comment : "안전배송 부탁드립니다."}

class Transaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}]
      },
      userInfo: {}
    };
  }

  componentWillMount() {
    this.getData(this.props.match.params.id);
    this.getUserInfo();
  }

  numberWithCommas(x) {
    if(!x) {
      console.log('Cannot convert');
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getData(id) {
    fetch(process.env.REACT_APP_HOST+"/order/detail/"+id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      const status = data[0];
      if(status === 200) {
        this.setState({data: data[1]})
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      } else if(status === 400) {
        alert('존재하지 않는 주문입니다.');
        this.props.history.push('/main/sales/list')
      }
    });
  }

  getUserInfo() {
    fetch(process.env.REACT_APP_HOST+"/api/auth/info", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      const status = data[0];
      if(status === 200) {
        this.setState({userInfo: data[1][0]})
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      } else if(status === 400) {
        alert('존재하지 않는 주문입니다.');
        this.props.history.push('/main/sales/list')
      }
    });
  }

  render() {
    let {orderInfo, productInfo} = this.state.data;
    orderInfo = orderInfo[0];
    let {userInfo} = this.state;
    var total_price = 0 ;
    var total_num = 0;
    return (
      <div>
        <link rel="stylesheet" type="text/css" href="css/Transaction.css"></link>
        <div className="post-card">
          <div className="post-title">
            인쇄화면
          </div>
          <div className="transaction" ref={el => (this.componentRef = el)}>
            <table className="detail">
              <tbody>
                <tr>
                  <td rowSpan="5" width="30px" style={{backgroundColor : "#E6E6E6"}}>공급자</td>
                  <td width="170px">사업자등록번호</td>
                  <td width="200px">{userInfo.crNumber}</td>
                  <td rowSpan="5" width="30px" style={{backgroundColor : "#E6E6E6"}}>공급받는자</td>
                  <td width="170px">사업자등록번호</td>
                  <td width="200px">{orderInfo.crNumber}</td>
                </tr>
                {/* <tr>
                  <td>상호(법인명)</td>
                  <td>{userInfo.name}</td>
                  <td>상호(법인명)</td>
                  <td>{orderInfo['name']}</td>
                </tr> */}
                <tr>
                  <td>주소</td>
                  <td>{userInfo.address}</td>
                  <td>주소</td>
                  <td>{orderInfo['address']}</td>
                </tr>
                <tr>
                  <td>연락처</td>
                  <td>{userInfo.phone}</td>
                  <td>연락처</td>
                  <td>{orderInfo['cellphone']}</td>
                </tr>
                <tr>
                  <td>담당자</td>
                  <td>{userInfo.name}</td>
                  <td>담당자</td>
                  <td>{orderInfo['name']}</td>
                </tr>
              </tbody>
            </table>

            <table id="content">
              <tbody>
                <tr style={{backgroundColor : "#E6E6E6"}}>
                  <td width="50px">No.</td>
                  <td width="400px">상품명</td>
                  {/* <td width="150px">무게</td> */}
                  {/*<td width="120px">제조사<br></br>(원산지)</td>*/}
                  <td width="50px">수량</td>
                  <td width="50px">단가</td>
                  <td width="100px">공급가액</td>
                  <td width="100px">부가세</td>
                  <td width="100px">총액</td>
                  <td width="150px">환불</td>
                </tr>
                {productInfo.map((e, i) => {
                  total_price += e['price'];
                  total_num += e['quantity'];
                  console.warn(e)
                  return (<tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e['name']}</td>
                    {/* <td>{e['weight']}</td> */}
                    {/*<td>{e['tel']}</td>*/}
                    <td>{e['quantity']}</td>
                    <td>{this.numberWithCommas(e['price'] / e['quantity'])}</td>
                    <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']))}</td>
                    <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                    <td>{this.numberWithCommas(e['price'])}</td>
                    <td width="150px">{e.refund ? "환불" : ""}</td>
                  </tr>
                  )
                })}
              </tbody>              
            </table>
            <table id="pay">
              <tbody>
                <tr colSpan="4" style={{backgroundColor : "#E6E6E6"}}>
                  <td width="650px">{/*결제수단 : 외상거래*/}</td>
                  <td width="200px">총 주문수량 : {this.numberWithCommas(total_num)}</td>
                  <td width="150px">총 금액 : {this.numberWithCommas(total_price)}</td>
                </tr>
                <tr colSpan="4" style={{backgroundColor : "#E6E6E6"}}>
                  <td colSpan="2">이전 잔액 : 0원 </td>
                  <td colSpan="2">총 잔액 : 0원</td>
                </tr>
              </tbody>
            </table>

            <table id="inf">
              <tbody>
                <tr>
                  <td width="125px">입금 정보</td>
                  <td width="475px"></td>
                  <td width="125px">배송 <br></br> 요청사항</td>
                  <td width="275px">{order_mockup['comment']}</td>
                </tr>
              </tbody>
            </table>
            
          </div>
          <div className="post-footer">
          <ReactToPrint
            trigger={() => <Button color="primary" style={{width: "100%"}}>인쇄</Button>}
            content={() => this.componentRef}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Transaction;