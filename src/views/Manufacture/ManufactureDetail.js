import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Input } from 'reactstrap';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
import '../../css/Table.css';
registerLocale('ko', ko)

//vos = value of supply (공급가액)
//vat = value added tax (부가세))
let d = {id: '', name: '', grade:'', weight:'', price: 0, quantity: 0};

class ManufactureDetail extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
      sProduct1: [d],//소모 상품
      sProduct2: [d],//생산 상품
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">소모 상품</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                        <th>상품명</th>
                        <th>등급</th>
                        <th>무게</th>
                        <th>단가</th>
                        <th>소모재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.sProduct1.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>{this.state.sProduct1[i].name}</td>
                            <td>{this.state.sProduct1[i].grade}</td>
                            <td>{this.state.sProduct1[i].weight}</td>
                            <td>{this.state.sProduct1[i].price}</td>
                            <td>{this.state.sProduct1[i].quantity}</td>
                          </tr>
                        )
                      }, this)
                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">생산 상품</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                        <th>상품명</th>
                        <th>등급</th>
                        <th>무게</th>
                        <th>단가</th>
                        <th>생산재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.sProduct2.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>{this.state.sProduct2[i].name}</td>
                            <td>{this.state.sProduct2[i].grade}</td>
                            <td>{this.state.sProduct2[i].weight}</td>
                            <td>{this.state.sProduct2[i].price}</td>
                            <td>{this.state.sProduct2[i].quantity}</td>
                          </tr>
                        )
                      }, this)
                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ManufactureDetail;