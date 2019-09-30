import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Form, FormGroup, Label, Input,} from 'reactstrap';
import axios from 'axios';

class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      telephone: '',
      cellphone: '',
      address: '',
      
    }
    this.state = {
      selectedFile : null,
    };
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
      .then(data => {this.props.history.push('/main/customer/list');});
  }

  handleFileInput(e){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        selectedFile : [reader.result],
      });
    }.bind(this);

    console.log(url)
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
    console.log(this.state.selectedFile)
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Form onSubmit={(e) => {e.preventDefault(); this.addCustomer(this.form)}}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    고객 정보
                  </CardHeader>
                  <CardBody>
                    <Label>고객명</Label>
                    <Input onChange={(e) => this.form.name=e.target.value}/>
                    <Label>전화번호</Label>
                    <Input onChange={(e) => this.form.telephone=e.target.value}/>
                    <Label>핸드폰번호</Label>
                    <Input onChange={(e) => this.form.cellphone=e.target.value}/>
                    <Label>주소</Label>
                    <Input onChange={(e) => this.form.address=e.target.value}/>
                    <Label>사진</Label>
                    <input ref="file" type="file" name="file" onChange={e =>{this.handleFileInput(e);}}/>
                    <img style={{height: 500, width: 500}} src={this.state.selectedFile} />
                    <Button onClick={() => this.handlePost()}>사진 업로드</Button>
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

