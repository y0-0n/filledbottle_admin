import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';
import '../../css/Transaction.css'
import ReactToPrint from "react-to-print";

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
    fetch(process.env.REACT_APP_HOST+"/order/orderDetail/"+id, {
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
    let userInfo = this.state.userInfo;
    var total_price = 0 ;
    var total_num = 0;
    return (
      <Card>
        <CardHeader>
          인쇄 화면
        </CardHeader>
        <CardBody>      
          <div className="transaction" ref={el => (this.componentRef = el)}>
            <table className="detail">
              <tr>
                <td rowspan="5" width="30px">공급자</td>
                <td width="170px">사업자등록번호</td>
                <td width="200px"></td>
                <td rowspan="5" width="30px">공급받는자</td>
                <td width="170px">사업자등록번호</td>
                <td width="200px"></td>
              </tr>
              <tr>
                <td>상호(법인명)</td>
                <td>{userInfo.name}</td>
                <td>상호(법인명)</td>
                <td>{orderInfo.name}</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>서울 성북구 정릉로</td>
                <td>주소</td>
                <td>{orderInfo['address']}</td>
              </tr>
              <tr>
                <td>연락처/FAX</td>
                <td>{userInfo.phone} / </td>
                <td>연락처/FAX</td>
                <td>{orderInfo['telephone']} / {orderInfo['cellphone']}</td>
              </tr>
              <tr>
                <td>담당자/연락처</td>
                <td>채윤병</td>
                <td>담당자/연락처</td>
                <td>{orderInfo['name']}</td>
              </tr>
            </table>
            
            <table id="content">
              <tr>
                <td width="50px">No.</td>
                <td width="200px">상품명</td>
                <td width="150px">무게</td>
                {/*<td width="120px">제조사<br></br>(원산지)</td>*/}
                <td width="50px">수량</td>
                <td width="50px">단가</td>
                <td width="100px">공급가액</td>
                <td width="100px">부가세</td>
                <td width="100px">총액</td>
              </tr>              
              {productInfo.map((e, i) => {
                total_price += e['price'];
                total_num += e['quantity'];
                return(<tr key={i}>
                  <td>{i+1}</td>
                  <td>{e['name']}</td>
                  <td>{e['weight']}</td>
                  {/*<td>{e['tel']}</td>*/}
                  <td>{e['quantity']}</td>
                  <td>{this.numberWithCommas(e['price']/e['quantity'])}</td>
                  <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 10 / 11 : e['price']))}</td>
                  <td>{this.numberWithCommas(Math.round(e['tax'] ? e['price'] * 1 / 11 : 0))}</td>
                  <td>{this.numberWithCommas(e['price'])}</td>
                </tr>
                )
                
              })}
              
            </table>

            <table id="pay">
              <tr colspan="4">
                <td width="450px">결제수단 : 외상거래</td>
                <td width="200px">총 주문수량 : {this.numberWithCommas(total_num)}</td>
                <td width="150px">총 금액 : {this.numberWithCommas(total_price)}</td>
              </tr>
              <tr colspan="4">
                <td colspan="2">이전 잔액 : 0원 </td>
                <td colspan="2">총 잔액 : 0원</td>
              </tr>
            </table>

            <table id="inf">
              <tr>
                <td width="125px">입금 정보</td>
                <td width="275px"></td>
                <td width="125px">배송 요청사항</td>
                <td width="275px"></td>
              </tr>
            </table>
          </div>
        </CardBody>
        <CardFooter>
          <ReactToPrint
            trigger={() => <Button>인쇄</Button>}
            content={() => this.componentRef}
          />
        </CardFooter>
      </Card>
    )
  }
}

export default Transaction;