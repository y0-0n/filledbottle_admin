import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input,  Table, } from 'reactstrap';



class RegisterDetail extends Component {
  constructor(props) {
    super(props);
    this.form = {
        name: '',
        department: '',
        position: '',
        cellphone: '',
        ID: '',
        password: '',
      }
  }
	
  componentWillMount() {
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    fetch(process.env.REACT_APP_HOST+"", {
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
        this.props.history.push('/main/registerdetail');
      } else {
        alert('등록에 실패했습니다.');
      }
    });
  }

  render() {
    return (
        <div className="animated fadeIn">
            <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
            <link rel="stylesheet" type="text/css" href="css/RegisterDetail.css"></link>
            <Row>
                <Col md="12" xs="12" sm="12">
                    <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
                        <FormGroup>
                            <Card>
                                <CardHeader>
                                    직원 추가
                                </CardHeader>
                                <CardBody>
                                <Table className="ShowTable">
                                    <tbody>
                                        <tr>
                                            <th>직원명</th>
                                            <td colSpan='3'>
                                            <Input required onChange={(e) => this.form.name=e.target.value}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>부서</th>
                                            <td colSpan='3'>
                                            <Input onChange={(e) => this.form.department=e.target.value}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>직책</th>
                                            <td colSpan='3'>
                                            <Input onChange={(e) => this.form.position=e.target.value}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>전화번호</th>
                                            <td colSpan='3'>
                                            <Input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"  placeholder={ "000-0000-0000" } onChange={(e) => this.form.cellphone=e.target.value} required/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>아이디</th>
                                            <td>
                                                <Row>
                                                    <Input required onChange={(e) => this.form.ID=e.target.value} style={{width: "80%", marginLeft:"16px", marginRight: "8px"}}/>
                                                    <Button block color="primary" style={{width: "15%"}}>중복확인</Button>
                                                </Row>
                                            </td>
                                            <th>비밀번호</th>
                                            <td>
                                            <Input required onChange={(e) => this.form.password=e.target.value}/>
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
    );
  }
}

export default RegisterDetail;