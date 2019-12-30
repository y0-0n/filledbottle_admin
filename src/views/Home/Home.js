import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';                                                                                                                           
import { Card, CardBody, CardHeader, Row, Col, Table } from 'reactstrap';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/ko";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Bar } from 'react-chartjs-2';

const localizer = momentLocalizer(moment);



const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

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
      events: [],
      bar:{},
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
    this.getOrder(moment().startOf('month')._d, moment().endOf('month')._d);
    //this.getOnlyOrder();
    this.getIncome();
    this.chart();
  }

  getIncome() {
    fetch(process.env.REACT_APP_HOST+"/order/income/"+((new Date()).getMonth()+1), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
        let this_income = data[1][0].sum;
        if(this_income === null) this_income = 0;
        this.setState({this_income});
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    })

    fetch(process.env.REACT_APP_HOST+"/order/income/"+(new Date()).getMonth(), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
        let last_income = data[1][0].sum;
        if(last_income === null) last_income = 0;
        this.setState({last_income});
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    })
  }

  chart(){
    const bar = {
      labels: ['저번 달 매출', '이번 달 매출'],
      datasets: [
        {
          label: 'Cost',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [30],
        },
      ],
    };
    this.setState(bar);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  getOrder(first_date, last_date) {
    const process_ = 'all', keyword = '', page = 'all';

    fetch(process.env.REACT_APP_HOST+"/order/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({first_date, last_date, page, process_, keyword})
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

  getOnlyOrder() {
    fetch(process.env.REACT_APP_HOST+"/order/1/order/a", {
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
        this.setState({orderData})
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    });
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
    this.bar = {
      labels: ['저번 달', '이번 달'],
      datasets: [
        {
          label: '매출',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [this.state.last_income, this.state.this_income],
        },
      ],
    };
    
    this.options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }

    var data = this.state.orderData;
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
              startAccessor={'start'}
              endAccessor={'end'}
              style={{ height: 800, 'minWidth': 500 }}
              events={this.state.events}
              messages={this.messages}
              culture='ko'
              onNavigate={(date) => {this.getOrder(moment(date).startOf('month'), moment(date).endOf('month'))}}
              onSelectEvent={(e, s) => this.props.history.push(`/main/sales/order/${e.resource}`)}
            />
            </div>
          </CardBody>
        </Card>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                최근 주문
              </CardHeader>
              <CardBody>
                <div>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>출하일</th>
                        <th>고객</th>
                        <th>총액</th>
                      </tr>
                    </thead>
                    <tbody>
                    {data.map((e, i) => {
                        return (<tr style={{cursor: 'pointer'}} key={e.id} onClick={() => {this.props.history.push(`/main/sales/order/${e.id}`)}}>
                          <td>{e.id}</td>
                          <td>{this.getDate(e.date)}</td>
                          <td>{e.name}</td>
                          <td>{this.numberWithCommas(e.price)}</td>
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col>          
            <Card>
              <CardHeader>
                매출
              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar data={this.bar} options={this.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
