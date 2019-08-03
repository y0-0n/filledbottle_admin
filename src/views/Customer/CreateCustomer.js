import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sdata: [],
      search: false
    };
    this.form = {

    }
  }

  componentWillMount() {
  }

  addCustomer(form) {
    //const {name, delegate, telephone, cellphone, address, manager} = this.form;
    fetch(process.env.REACT_APP_HOST+"/customer", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {this.props.history.push('/customer/list');});
  }

  searchCustomer() {
    let result = this.state.data.filter(word => word.name.indexOf(this.state.keyword) !== -1)

    this.setState({sdata: result, search: true});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="4" xs="12" sm="6">
            <Form onSubmit={(e) => {e.preventDefault(); this.addCustomer(this.form)}}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    거래처 추가하기
                  </CardHeader>
                  <CardBody>
                    <Label>거래처명</Label>
                    <Input onChange={(e) => this.form.name=e.target.value} />
                    <Label>대표자명</Label>
                    <Input onChange={(e) => this.form.delegate=e.target.value} />
                    <Label>전화번호</Label>
                    <Input onChange={(e) => this.form.telephone=e.target.value}/>
                    <Label>핸드폰번호</Label>
                    <Input onChange={(e) => this.form.cellphone=e.target.value}/>
                    <Label>주소</Label>
                    <Input onChange={(e) => this.form.address=e.target.value}/>
                    <Label>담당자</Label>
                    <Input onChange={(e) => this.form.manager=e.target.value}/>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">추가하기</Button>
                  </CardFooter>
                </Card>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CreateCustomer;

