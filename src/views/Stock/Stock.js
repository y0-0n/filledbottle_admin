import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input, Label } from 'reactstrap';

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
  
class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: []
    };
    this.bar = {
      labels: ['주문', '재고', '생산 중', '생산 필요'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [0, 0, 0, 0],// 주문 / 재고 / 생산 중 / 생산 필요
        },
      ],
    };

  }

  getStock() {
    fetch(process.env.REACT_APP_HOST+"/stock", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(stockData => {this.setState({stockData})})
  }

  componentWillMount() {
    this.getStock();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        {
          this.state.stockData.map((e, i) => {
            let bar = {
              labels: ['주문', '재고', '생산 중', '생산 필요'],
              datasets: [
                {
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  borderColor: 'rgba(255,99,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: [0, e.quantity, 0, 0],// 주문 / 재고 / 생산 중 / 생산 필요
                },
              ],
            };
            return (
              <Col md="6" xs="12" sm="12">
                <Card>
                  <CardHeader>
                    {e.id}
                  </CardHeader>
                  <CardBody className="card-body">
                    <div key={i} className="chart-wrapper">
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

export default Stock;