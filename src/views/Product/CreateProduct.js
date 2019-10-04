

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input, Table } from 'reactstrap';
import axios from 'axios';
import '../../css/Table.css';

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

    this.state = {
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
          <Col>
            <Form onSubmit={(e) => {e.preventDefault(); this.addProduct(this.form)}}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    상품 등록하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tr>
                        <th>상품명</th>
                        <td>
                          <Input onChange={(e) => this.form.name=e.target.value} />
                        </td>
                        <th>등급</th>
                        <td className="TableRight">
                          <Input onChange={(e) => this.form.grade=e.target.value} />
                        </td>
                      </tr>
                      <tr>
                        <th>무게</th>
                        <td>
                          <Input onChange={(e) => this.form.weight=e.target.value} />
                        </td>
                        <th>단가</th>
                        <td className="TableRight">
                          <Input onChange={(e) => this.form.price=e.target.value} />
                        </td>
                      </tr>
                      <tr className="TableBottom">
                        <th>사진</th>
                        <td colspan="3" className="TableRight">
                          <img style={{height: 500, width: 500}} src={this.state.selectedFile} /> <br></br>
                        <input ref="file" type="file" name="file" onChange={e =>{this.handleFileInput(e);}}/> 
                        </td>
                      </tr>
                    </Table>
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

