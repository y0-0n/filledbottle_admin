

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Input, Table } from 'reactstrap';
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
    };

    this.state = {
      image : null,
      selectedFile : null,
    };
  }

  componentWillMount() {
  }

  /*addProduct(form) {
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
  }*/

  handleFileInput(e){
    var file = this.refs.file.files[0];
    var reader = new FileReader();

    reader.onloadend = function (e) {
      this.setState({
        image : [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({img});
  }

  handlePost(){
    let formData = new FormData();
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    formData.append('file', this.state.img);
    for (let [key, value] of Object.entries(this.form)) {
      //console.log(`${key}: ${value}`);
      formData.append(key, value);
    }

    return axios.post(process.env.REACT_APP_HOST+"/product", formData, config).then(res => {
      alert('성공');
      this.props.history.push('/main/product/list');
    }).catch(err=> {
      alert('실패')
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <form enctype="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    상품 등록하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                    <tbody>
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
                        <td colSpan="3" className="TableRight">
                        <img style={{height: 500, width: 500}} src={this.state.image} /> <br></br>
                        <input ref="file" type="file" name="file" onChange={e =>{this.handleFileInput(e);}}/> 
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

export default CreateProduct;

