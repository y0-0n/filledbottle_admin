import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';                                                                                                                           
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
const localizer = momentLocalizer(moment);

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
    fetch(process.env.REACT_APP_HOST+"/order/", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(orderData => {this.setState({orderData}, () => {
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
          this.setState({events})
        })
      })});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            일정
          </div>
          <div className="card-body">
            <Calendar
              selectable
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "70vh" }}
              events={this.state.events}
              messages={this.messages}
              culture='ko'
              onDoubleClickEvent={(e, s) => this.props.history.push(`/main/sales/order/${e.resource}`)}
            />
          </div>
        </div>
        <Row>
          <Col>
            <div className="card" style={{height: 200}}>
              <div className="card-header">
                최근 주문
              </div>
              <div className="card-body">
              </div>
            </div>
          </Col>
          <Col>
            <div className="card" style={{height: 200}}>
              <div className="card-header">
                최근 고객
              </div>
              <div className="card-body">
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
