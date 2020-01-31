import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table } from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import Popup from "reactjs-popup";

class Create extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name : '',
      plant : '',
      type : '',
      quantity: 0,
      cost : 0,
    };

    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col md="9" lg="9" xl="8">
            <form>
              <FormGroup>
                <Card>
                  <CardHeader>
                      재고 입고 등록하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th>품목명</th>
                          <td colSpan="3">
                            <Input onChange={(e) => this.form.name = e.target.value} />
                          </td>
                        </tr>
                        <tr>
                          <th>창고</th>
                          <td>
                            <Input defaultValue={this.form.plant} onChange={(e) => {this.form.plant = e.target.value}} type='select'>
                              <option value="1">1번</option>
                              <option value="2">2번</option>
                              <option value="3">3번</option>
                            </Input>
                          </td>
                          <th>유형</th>
                          <td>
                            <Input defaultValue={this.form.type} onChange={(e) => {this.form.type = e.target.value}} type='select'>
                              <option value="외주생산">외주생산</option>
                              <option value="자가생산">자가생산</option>
                              <option value="상품매입">상품매입</option>
                            </Input>
                          </td>
                        </tr>
                        <tr>
                          <th>입고수량</th>
                          <td >
                            <Input onChange={(e) => this.form.quantity = e.target.value} />
                          </td>
                          <th>매입원가</th>
                          <td >
                            <Input onChange={(e) => this.form.cost = e.target.value} />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">추가하기</Button>
                  </CardFooter>
                </Card>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Create;

