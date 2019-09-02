import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';                                                                                                                           
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      events: [{
        start: new Date(),
        end: new Date(),
        title: "주문건",
        resource: 3
      },
      {
        start: new Date(),
        end: new Date(),
        title: "주문건",
        resource: 3
      },
      {
        start: new Date(),
        end: new Date(),
        title: "주문건",
        resource: 3
      },
      {
        start: new Date(),
        end: new Date(),
        title: "주문건",
        resource: 3
      },
      {
        start: new Date(),
        end: new Date(),
        title: "주문건",
        resource: 3
      }]
    };
  }

  componentWillMount() {
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
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "70vh" }}
              events={this.state.events}
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
