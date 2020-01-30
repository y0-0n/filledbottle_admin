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
    this.getList();
	}
	
  getList() {
    fetch(process.env.REACT_APP_HOST+"/api/plant", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
			console.log(data)
      let status = data[0];
      if(status === 200)
        this.setState({data: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }


  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row>
        <Col md="12" xs="12" sm="12">
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
