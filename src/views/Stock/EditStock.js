import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

class EditStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.getStock();
  }

  getStock() {
    fetch(process.env.REACT_APP_HOST+"/stock", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})})
  }

  render() {
    let {data} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                재고 관리
              </CardHeader>
              <CardBody className="card-body">
                <Table striped>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>제품 id</th>
                        <th>공장 id</th>
                        <th>수량</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(function (e) {
                        return (
                          <tr key={e.id}>
                            <th scope="row">{e.id}</th>
                            <td>{e["product_id"]}</td>
                            <td>{e["plant_id"]}</td>
                            <td>{e.quantity}</td>
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

export default EditStock;
