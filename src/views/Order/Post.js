import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter} from 'reactstrap';
import ReactToPrint from "react-to-print";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        orderInfo: [{}],
        productInfo: [{}],
      },
      userInfo: {}
    };
  }

  componentWillMount() {
    this.getData(this.props.match.params.id);
    this.getUserInfo();
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
    return (
      <Card>
        <link rel="stylesheet" type="text/css" href="css/Post.css"></link>
        <CardHeader>
          인쇄 화면
        </CardHeader>
        <CardBody>
          <div id="post" ref={el => (this.componentRef = el)}>
            <table>
              <tbody>
                <tr>
                  <td colSpan="7">우체국 택배</td>
                </tr>
                <tr>
                  <td rowSpan="4" className="stylecenter">보내는 분</td>
                  <td className="stylecenter widthnar">성명</td>
                  <td className="widthlong">{userInfo.name}</td>
                  <td className="stylecenter widthnar">내용물</td>
                  <td colSpan="3" className="styleright widthlong">
                    {productInfo[0].name} {productInfo.length - 1 === 0 ? null : "외" + (productInfo.length - 1) + "건"}
                  </td>
                </tr>
                <tr>
                  <td className="stylecenter widthnar">전화</td>
                  <td className="widthlong">{userInfo.phone}</td>
                  <td colSpan="4" id="notice">안심소포로 접수한 경우에는 표기하신 내용물 가액의 범위에서 (300만원 이내)
                실 손해액을 배상받으실 수 있습니다. (우편법 제38조)</td>
                </tr>
                <tr>
                  <td rowSpan="2" className="stylecenter widthnar">주소</td>
                  <td rowSpan="2">{userInfo.address}</td>
                  <td className="stylecenter widthnar">착불소포</td>
                  <td className="styleright widthnar">원</td>
                  <td className="stylecenter widthnar">안심</td>
                  <td className="styleright widthnar">만원</td>
                </tr>
                <tr>
                  <td className="stylecenter">파손주의</td>
                  <td className="stylecenter">취급주의</td>
                  <td className="stylecenter">대금교환</td>
                  <td className="stylecenter styleright">만원</td>
                </tr>
                <tr>
                  <td rowSpan="3" className="stylecenter">받는 분</td>
                  <td className="stylecenter widthnar">성명</td>
                  <td colSpan="5" className="widthlong">{orderInfo.name}</td>
                </tr>
                <tr>
                  <td className="stylecenter widthnar">전화</td>
                  <td colSpan="5" className="widthlong">{orderInfo['telephone']} / {orderInfo['cellphone']}</td>
                </tr>
                <tr>
                  <td className="stylecenter widthnar">주소</td>
                  <td colSpan="5" className="widthlong">{orderInfo['address']}</td>
                </tr>
              </tbody>

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

export default Post;