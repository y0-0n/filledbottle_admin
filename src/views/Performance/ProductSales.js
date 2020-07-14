/*global daum*/
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup } from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : 0,
      month : 0,
      productSales : [],
    }
  }

  componentWillMount() {
    this.setState({
      year : 2020,
      month : 7,
      productSales : [{name : '당근', quantity : 8, sales_price : 1000000}, {name : '양파', quantity : 20, sales_price : 330000}],
    })
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div>
          <div className="form-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              {this.state.year}년 {this.state.month}월
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">품목별 판매량</div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table className="ListTable" style={{ minWidth: 600 }} hover>
                      <thead>
                        <tr>
                          <th>순위</th>
                          <th>품목명</th>
                          <th>판매 수량</th>
                          <th>판매 금액 (원)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.productSales.map((e, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{e.name}</td>
                              <td>{e.quantity}</td>
                              <td>{e.sales_price}</td>
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

