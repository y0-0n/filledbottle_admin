import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table } from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import Popup from "reactjs-popup";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      grade: '',
      weight: '',
      price: '',
      productFamily: 'NULL'
    };

    this.state = {
      image: '/assets/img/noimage.jpg',
			familyData: [],
			data: [],
    };
  }

  componentWillMount() {
    this.productFamily = '품목군 없음'
    this.getProductFamily();
  }

  handleFileInput(e) {
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        image: [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({ img });
  }

  handleClick(e) {
    this.setState({
      image: '/assets/img/noimage.jpg'
    });
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', this.state.img);
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST + "/product", {
      method: 'POST',
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
          alert('등록됐습니다.');
          this.props.history.push('/main/product/list');
        } else {
          alert('등록에 실패했습니다.');
        }
      });
  }

  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList/all", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
        if (status === 200)
          this.setState({ familyData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12" xl="8">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    품목 등록하기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th>품목명<span style={{color : "#FA5858"}}>*</span></th>
                          <td>
                            <Input required onChange={(e) => this.form.name = e.target.value} />
                          </td>
                        </tr>
                        <tr>
                          <th>품목군</th>
                          <td>
                            {/*<Popup
                              trigger={<Input value={this.productFamily} style={{ cursor: 'pointer', backgroundColor: '#ffffff' }} onChange={() => { console.log('S') }} readOnly />}
                              modal>
                              {close => <ProductFamilyModal close={close} login={() => { this.props.history.push('/login') }}
                                selectProductFamily={(data) => {
                                  let { name, id } = data;
                                  this.productFamily = name;
                                  this.form.productFamily = id;
                                  this.forceUpdate();
                                  //set, for instance, comment[1] to "some text"
                                }} />}
                            </Popup>*/}
														<Input onChange={(e) => {this.form.productFamily = e.target.value;}} type='select' name="family">
															<option value='NULL'>품목군 없음</option>
															{this.state.familyData.map((e, i) => {
																return <option key={i} value={e.id}>{e.name}</option>
															})}
														</Input>
                          </td>
                        </tr>
                        <tr>
                          <th>사진</th>
                          <td>
                            <div style={{paddingBottom: '10px'}}>
                              <input ref="file" type="file" name="file" onChange={e => { this.handleFileInput(e); }} style={{display: "none"}} />
														  <img src='/assets/img/upload.jpg' border='0' style={{width: '10%', marginLeft: 10}} onClick={() => document.all.file.click()}/>
                            </div>
                            <div>
                              <img alt="품목 사진" style={{ width: '30%', height: '50%', display: "inline-block", border: '1px', borderStyle: 'dashed', borderColor: '#c8ced3'}} src={this.state.image}/>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th>판매 단가<span style={{color : "#FA5858"}}>*</span></th>
                          <td>
                            <Row>
                              <Col xs="9">
                                <Input type="number" required onChange={(e) => this.form.price = e.target.value} />
                              </Col>
                              <Col xs="3">원</Col>
                            </Row>
                          </td>
                        </tr>
                        {/*<tr>
                          <th>등급</th>
                          <td >
                            <Input onChange={(e) => this.form.grade = e.target.value} />
                          </td>
                          <th>무게</th>
                          <td>
                            <Input onChange={(e) => this.form.weight = e.target.value} />
                          </td>
                        </tr>*/}
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

