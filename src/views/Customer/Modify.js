import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, Badge} from 'reactstrap';

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.getCustomer();
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+"/customer/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({data: data[0]});
        this.form = {
          name: data[0].name,
          telephone: data[0].telephone,
          cellphone: data[0].cellphone,
          crNumber: data[0].crNumber,
          address: data[0].address,
        }    
      });
  }

  handlePost(e) {
    e.preventDefault();
    let c = window.confirm('이 상품을 수정하시겠습니까?')
    if(c) {
      let formData = new FormData();
      for (let [key, value] of Object.entries(this.form)) {
        formData.append(key, value);
      }
  
      fetch(process.env.REACT_APP_HOST+"/customer/modify/"+this.props.match.params.id, {
        method: 'PUT',
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
          this.props.history.push('/main/customer/'+this.props.match.params.id);
        } else {
          alert('등록에 실패했습니다.');
        }
      });  
    }
  }

  render() {
    let {data} = this.state;

    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/CustomerDetail.css"></link>
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
                          <th>고객명</th>
                          <td>
                            <Input defaultValue={data.name} onChange={(e) => this.form.name=e.target.value}/>
                          </td>
                          <th>상태</th>
                          <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                        </tr>
                        <tr>
                          <th>핸드폰번호</th>
                          <td>
                            <Input defaultValue={data.telephone} onChange={(e) => this.form.cellphone=e.target.value}/>
                          </td>
                          <th>전화번호</th>
                          <td>
                            <Input defaultValue={data.cellphone} onChange={(e) => this.form.telephone=e.target.value}/>
                          </td>
                        </tr>
                        <tr>
                          <th>사업자등록번호</th>
                          <td>
                            <Input defaultValue={data.crNumber} onChange={(e) => this.form.crNumber=e.target.value}/>
                          </td>
                          <th>주소</th>
                          <td>
                            <Input defaultValue={data.address} onChange={(e) => this.form.address=e.target.value}/>
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

export default Modify;

