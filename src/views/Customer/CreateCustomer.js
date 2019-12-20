import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table,} from 'reactstrap';
import '../../css/Table.css';

class CreateCustomer extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name: '',
      telephone: '',
      cellphone: '',
      address: '',
      crNumber:'',
    }
  }

  componentWillMount() {
  }

  handlePost(e) {
    e.preventDefault();
    let formData = new FormData();
    for (let [key, value] of Object.entries(this.form)) {
      formData.append(key, value);
    }

    fetch(process.env.REACT_APP_HOST+"/customer", {
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
        this.props.history.push('/main/customer/list');
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
            <form onSubmit={this.handlePost.bind(this)}>
              <FormGroup>
                <Card>
                  <CardHeader>
                    고객 정보
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                    <tbody>
                      <tr>
                        <th>기업(고객)명</th>
                        <td>
                          <Input onChange={(e) => this.form.name=e.target.value}/>
                        </td>
                        <th>전화번호</th>
                        <td>
                          <Input onChange={(e) => this.form.telephone=e.target.value}/>
                        </td>
                      </tr>
                      <tr>
                        <th>핸드폰번호</th>
                        <td>
                          <Input onChange={(e) => this.form.cellphone=e.target.value}/>
                        </td>
                        <th>주소</th>
                        <td>
                          <Input onChange={(e) => this.form.address=e.target.value}/>
                        </td>
                      </tr>
                      <tr>
                        <th>사업자등록번호</th>
                        <td colSpan="3">
                          <Input onChange={(e) => this.form.crNumber=e.target.value}/>
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

export default CreateCustomer;

