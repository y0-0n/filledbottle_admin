import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Label } from 'reactstrap';

const bar = {
  labels: ['주문', '재고', '생산 중', '생산 필요'],
  datasets: [
    {
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81],
    },
  ],
}; 

const options = {
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
  
class Stock extends Component {
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
        <Row>
          <Col md="6" xs="6" sm="6">
            <Card>
              <CardHeader>
                재고
              </CardHeader>
              <CardBody className="card-body">
                <div className="chart-wrapper">
                  <Bar data={bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Stock;
