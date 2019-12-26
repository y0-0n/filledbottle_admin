

import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, Badge } from 'reactstrap';
import '../../css/Table.css';

class ProductModify extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      image: null,
    };
  }

  componentWillMount() {
    this.getProduct();
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST + "/product/" + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data[0] })
        this.form = {
          name: data[0].name,
          grade: data[0].grade,
          weight: data[0].weight,
          price: data[0].price_shipping,
        };
      });
  }

  /*handleFileInput(e){
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
  }*/

  modifyProduct(e) {
    e.preventDefault();

    let c = window.confirm('이 품목을 수정하시겠습니까?')

    if (c) {
      let formData = new FormData();
      //formData.append('file', this.state.img);
      for (let [key, value] of Object.entries(this.form)) {
        formData.append(key, value);
      }
      fetch(process.env.REACT_APP_HOST + "/product/modify/" + this.props.match.params.id, {
        method: 'PUT',
        'Content-Type': 'multipart/form-data',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData
      })
        .then(response => {
          if (response.status === 401) {
            return Promise.all([401])
          } else {
            return Promise.all([response.status, response.json()]);
          }
        })
        .then(data => {
          let status = data[0];
          if (status === 200) {
            alert('수정됐습니다.');
            this.props.history.push('/main/product/' + this.props.match.params.id);
          } else {
            alert('수정에 실패했습니다.');
          }
        });
    }
  }

  render() {
    var data = this.state.data;
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <form encType="multipart/form-data" onSubmit={this.modifyProduct.bind(this)}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    품목 수정하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th style={{ width: '10%' }}>사진</th>
                          <td style={{ width: '40%' }}>
                            <img style={{ width: '90%' }} alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
                          </td>
                          <th style={{ width: '10%' }} >품목명</th>
                          <td style={{ width: '40%' }}>
                            <Input defaultValue={data.name} onChange={(e) => this.form.name = e.target.value} />
                          </td>
                        </tr>
                        <tr>
                          <th>등급</th>
                          <td >
                            <Input defaultValue={data.grade} onChange={(e) => this.form.grade = e.target.value} />
                          </td>
                          <th>상태</th>
                          <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                        </tr>
                        <tr>
                          <th>무게</th>
                          <td>
                            <Input defaultValue={data.weight} onChange={(e) => this.form.weight = e.target.value} />
                          </td>
                          <th>판매 단가</th>
                          <td >
                            <Input defaultValue={data.price_shipping} onChange={(e) => this.form.price = e.target.value} />
                          </td>
                        </tr>
                        <tr>
                          <th>품목군</th>
                          <td colSpan="3" >
                            <Input defaultValue={data.productFamily} onChange={(e) => this.form.productFamily = e.target.value} />                            
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">수정하기</Button>
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

export default ProductModify;

