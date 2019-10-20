import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';

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
      credentials: 'include',
      cache: 'no-cache',
    })
      .then(response => {
        return Promise.all([response.status, response.json()]);
      })
      .then(data => {
        let status = data[0];
        if(status === 200)
          this.setState({data: data[1]});
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  modifyStock(id, quantity) {
    console.warn(quantity)
    fetch(process.env.REACT_APP_HOST+`/stock/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {quantity}
      )
    })
      .then(response => response.json())
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
                        <th>제품명</th>
                        <th>등급</th>
                        <th>무게</th>
                        <th>수량</th>
                        <th style={{width: 100}}>업데이트</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((d) => {
                        return (
                          <tr key={d.id}>
                            <td>{d.name}</td>
                            <td>{d.grade}</td>
                            <td>{d.weight}</td>
                            <td style={{width: 200}}><Input defaultValue={d.quantity} onChange={(e) => {d.quantity = e.target.value;}}/></td>
                            <td><Button onClick={()=>{this.modifyStock(d.id, d.quantity)}} color="primary" >수정</Button></td>
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
