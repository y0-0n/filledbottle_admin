import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';
import './Transaction.css'
import ReactToPrint from "react-to-print";

class Transaction extends Component {
  render() {

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
                <td>채운 병</td>
                <td>상호(법인명)</td>
                <td>vantavlack</td>
              </tr>
              <tr>
                <td>주소</td>
                <td>서울 성북구 정릉로</td>
                <td>주소</td>
                <td>서울 성북구 정릉로</td>
              </tr>
              <tr>
                <td>연락처/FAX</td>
                <td></td>
                <td>연락처/FAX</td>
                <td></td>
              </tr>
              <tr>
                <td>담당자/연락처</td>
                <td>(배송)채윤병</td>
                <td>담당자/연락처</td>
                <td>이광현</td>
              </tr>
            </table>
            
            <table id="content">
              <tr>
                <td width="50px">No.</td>
                <td width="200px">상품명</td>
                <td width="150px">규격(단위)</td>
                <td width="120px">제조사(원산지)</td>
                <td width="50px">수량</td>
                <td width="50px">단가</td>
                <td width="80px">공급가액</td>
                <td width="50px">세액</td>
                <td width="50px">총액</td>
              </tr>
              <tr>
                <td>No.</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </table>

            <table id="pay">
              <tr colspan="4">
                <td width="500px">결제수단 : 외상거래</td>
                <td width="150px">총 주문수량 : 3개</td>
                <td width="150px">총 금액 : 0원</td>
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