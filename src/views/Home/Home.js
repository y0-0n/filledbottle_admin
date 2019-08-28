import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            홈
          </div>
          <div className="card-body">
            <Calendar
              localizer={localizer}
              events={[]}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100vh" }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
