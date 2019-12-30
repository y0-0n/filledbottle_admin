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
  
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      orderData: [],
      productData: {}
    };
    this.classify = this.classify.bind(this);
  }

  getStock() {
    fetch(process.env.REACT_APP_HOST+"/stock", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(stockData => {this.setState({stockData})})
  }

  getOrder(callback) {
    fetch(process.env.REACT_APP_HOST+"/order_product", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(orderData => {this.setState({orderData}, () => {
        callback();
      })});
  }

  classify() {
    this.state.orderData.map((e, i) => {
      let productData = this.state.productData;

      if(this.state.productData[e['product_id']] === undefined) {
        productData[e['product_id']] = e.quantity;
        this.setState({
          productData
        })
      } else {
        productData[e['product_id']] += e.quantity;
        this.setState({
          productData
        })
      }

      return 0;
    })
  }

  componentWillMount() {
    this.getStock();
    this.getOrder(this.classify);
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
                  data: [this.state.productData[e['product_id']], e.quantity, 0, this.state.productData[e['product_id']]-e.quantity > 0 ? this.state.productData[e['product_id']]-e.quantity : 0],// 주문 / 재고 / 생산 중 / 생산 필요
                },
              ],
            };
            return (
              <Col key={i} md="6" xs="12" sm="12">
                <Card>
                  <CardHeader>
                    {e.id}
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

export default List;