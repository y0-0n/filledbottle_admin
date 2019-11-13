import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';

class StockDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
  }

  render() {
    let {data} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                재고 내역
              </CardHeader>
              <CardBody className="card-body">
                <Table striped>
                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>제품명</th>
                        <th>수정</th>
                        <th>수량</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((d) => {
                        return (
                          <tr key={d.id}>
                            <td>{d.date}</td>
                            <td>{d.name}</td>
                            <td>{d.modifyNum}</td>
                            <td>{d.totalNum}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default StockDetail;
