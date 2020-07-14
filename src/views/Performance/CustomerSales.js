/*global daum*/
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup } from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : 0,
      month : 0,
      customerSales : [],
    }
  }

  componentWillMount() {
    this.setState({
      year : 2020,
      month : 7,
      customerSales : [{name : '김철수', quantity: 10, order_price : 1900000}, {name : '김영희', quantity : 2, order_price : 30000}],
    })
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div>
          <div className="form-card sales-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              {this.state.year}년 {this.state.month}월
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">고객별 판매량</div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table className="ListTable" style={{textAlign: 'center'}} hover>
                      <thead>
                        <tr>
                          <th>순위</th>
                          <th>고객명</th>
                          <th>주문 수량</th>
                          <th>주문 금액 (원)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.customerSales.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{e.name}</td>
                              <td>{e.quantity}</td>
                              <td>{e.order_price}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }


}

export default List;

