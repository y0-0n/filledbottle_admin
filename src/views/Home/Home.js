import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';                                                                                                                           
import { Card, CardBody, CardHeader } from 'reactstrap';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";

const localizer = momentLocalizer(moment);

/*

  GET /order/state

  -> this.state.orderData

  id : 주문 번호
  date : 출하 일자
  name : 고객 이름
  orderDate : 주문 일자

*/

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
      events: []
    };
    this.messages = {
      today: '오늘',
      previous: '이전',
      next: '다음',
      month: '월',
      week: '주',
      day: '일',
      agenda: '일정'
    }
  }

  componentWillMount() {
    this.getOrder();
  }

  getOrder() {
    fetch(process.env.REACT_APP_HOST+"/order/all/all/a", {
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
        let status = data[0];
        if(status === 200) {
          let orderData = data[1];
          this.setState({orderData}, () => {
            let events = [];
            this.state.orderData.map((e, i) => {
              let {name, date, id} = this.state.orderData[i];
              let event = {
                start: date,
                end: date,
                allDay: true,
                title: name + "님 주문",
                resource: id
              };
              events.push(event);
              this.setState({events});
              return null;
            });
            return null;
          });
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            일정
          </CardHeader>
          <CardBody>
            <div style={{overflow: 'scroll', height: 850}}>
            <Calendar
              selectable
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 800, 'minWidth': 800 }}
              events={this.state.events}
              messages={this.messages}
              culture='ko'
              onSelectEvent={(e, s) => this.props.history.push(`/main/sales/order/${e.resource}`)}
            />
            </div>
          </CardBody>
        </Card>
        {/*<Row>
          <Col>
            <Card style={{height: 200}}>
              <CardHeader>
                최근 주문
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card style={{height: 200}}>
              <CardHeader>
                이번달 매출
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>*/}
      </div>
    )
  }
}

export default Home;
