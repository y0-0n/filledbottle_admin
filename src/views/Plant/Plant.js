import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class Plant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.form = {

    }
  }
  componentWillMount() {
    this.findPlant();
  }

  findPlant() {
    fetch("http://localhost:4000/plant", {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {this.setState({data})})
  }

  addPlant(form) {
    const {name} = this.form;
    fetch("http://localhost:4000/plant", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name
      })
    })
      .then(response => response.json())
      .then(data => {console.warn(data); this.findPlant()});
  }

  deletePlant(id) {
    let c = window.confirm('Are you sure you wish to delete this item?')
    if (c) {
      fetch("http://localhost:4000/plant", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(data => {this.findPlant()});
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="4" xs="12" sm="6">
          <Form onSubmit={(e) => {e.preventDefault(); this.addPlant(this.form)}}>
            <FormGroup>
              <Card>
                <CardHeader>
                  공장 추가하기
                </CardHeader>
                <CardBody>
                  <Label>공장 이름</Label>
                  <Input onChange={(e) => this.form.name=e.target.value} />
                </CardBody>
                <CardFooter>
                  <Button block outline color="primary">추가하기</Button>
                </CardFooter>
              </Card>
            </FormGroup>
          </Form>
        </Col>
        {
          data.map(function (e) {
          return (
            <Col key={e.id} md="4" xs="12" sm="6">
              <Card>
                <CardHeader>
                  {e.name}
                </CardHeader>
                <CardBody>
                  <Button block outline color="primary" onClick={() => alert('준비중입니다.')}>공장 상세보기</Button>
                </CardBody>
                <CardFooter>
                  <Button block color="ghost-danger" onClick={() => this.deletePlant(e.id)}>공장 삭제하기</Button>
                </CardFooter>
              </Card>
            </Col>)
          }.bind(this))
        }
        </Row>
      </div>
    )
  }
}

export default Plant;
