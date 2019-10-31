import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0
      }    
    }]
  }  
}
  
class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      classifiedData: {}
    };
    
    this.classify = this.classify.bind(this);
  }

  getOrderSummary(callback) {
    fetch(process.env.REACT_APP_HOST+"/order_summary", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data}, () => {callback()})})
  }

  classify() {
    this.state.data.map((e, i) => {
      let classifiedData = this.state.classifiedData;

      if(this.state.classifiedData[e['order_id']] === undefined) {
        classifiedData[e['order_id']] = {};
        classifiedData[e['order_id']][e['product_id']] = e.quantity;

        this.setState({
          classifiedData
        })
      } else {
        if(classifiedData[e['order_id']][e['product_id']] === undefined)
          classifiedData[e['order_id']][e['product_id']] = e.quantity;
        else
        classifiedData[e['order_id']][e['product_id']] += e.quantity;

        this.setState({
          classifiedData
        })
      }

      return 0;
    })
  }

  componentWillMount() {
    this.getOrderSummary(this.classify);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        {
          Object.entries(this.state.classifiedData).map((e, i) => {

            let data = Object.values(e[1]);
            let labels = Object.keys(e[1]);
            let bar = {
              labels,
              datasets: [
                {
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data,
                },
              ],
            };
            return (
              <Col key={i} md="6" xs="12" sm="12">
                <Card>
                  <CardHeader>
                    {e[0]}
                  </CardHeader>
                  <CardBody className="card-body">
                    <div className="chart-wrapper">
                      <Bar data={bar} options={options} />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )
          })
        }
        </Row>
      </div>
    )
  }
}

export default Sales;