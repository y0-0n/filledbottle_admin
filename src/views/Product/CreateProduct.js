

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table } from 'reactstrap';
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
    };
  }

  componentWillMount() {
  }

  handleFileInput(e){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        image : [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({img});
  }

  handlePost(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.img);
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST+"/product", {
      method: 'POST',
      'Content-Type': 'multipart/form-data',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: formData
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      let status = data[0];
      if(status === 200) {
        alert('등록됐습니다.');
        this.props.history.push('/main/product/list');
      } else {
        alert('등록에 실패했습니다.');
      }
    });
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
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
                        <img alt="제품 사진" style={{height: 500, width: 500}} src={this.state.image} /> <br></br>
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

