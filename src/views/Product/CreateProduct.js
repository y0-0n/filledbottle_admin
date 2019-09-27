

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      grade: '',
      weight: '',
      price: '',
      selectedFile : null,
    };
  }

  componentWillMount() {
  }

  addProduct(form) {
    //const {name} = form;
    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {this.props.history.push('/main/product/list');});
  }

  handleFileInput(e){
    this.setState({
      selectedFile : e.target.files[0],
    })
  }

  handlePost(){
    const formData = new FormData();

    return axios.post("/api/upload", formData).then(res => {
      alert('성공')
    }),(err=> {
      alert('실패')
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="4" xs="12" sm="6">
            <Form onSubmit={(e) => {e.preventDefault(); this.addProduct(this.form)}}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    상품 등록하기
                  </CardHeader>
                  <CardBody>
                    <Label>상품명</Label>
                    <Input onChange={(e) => this.form.name=e.target.value} />
                    <Label>등급</Label>
                    <Input onChange={(e) => this.form.grade=e.target.value} />
                    <Label>무게</Label>
                    <Input onChange={(e) => this.form.weight=e.target.value} />
                    <Label>단가</Label>
                    <Input onChange={(e) => this.form.price=e.target.value} />
                    <Label>사진</Label>
                    <Input type="file" name="file" onChange={e => this.handleFileInput(e)}/>
                    <Button onClick={this.handlePost()}>사진 업로드</Button>
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

export default CreateProduct;

