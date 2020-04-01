import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup, Badge} from 'reactstrap';

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

  sample6_execDaumPostcode() {
    new window.daum.Postcode({
        oncomplete: function(data) {
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수
            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }
            if(data.userSelectedType === 'R'){
                if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                    extraAddr += data.bname;
                }
                if(data.buildingName !== '' && data.apartment === 'Y'){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if(extraAddr !== ''){
                    extraAddr = ' (' + extraAddr + ')';
                }
                //document.getElementById("sample6_extraAddress").value = extraAddr;
								addr += extraAddr;
            } else {
                //document.getElementById("sample6_extraAddress").value = '';
            }
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
  }

  handlePost(e) {
    e.preventDefault();
    let c = window.confirm('이 상품을 수정하시겠습니까?')
    if(c) {
      let formData = new FormData();
      this.form.address = document.getElementById("sample6_address").value+" "+document.getElementById("sample6_detailAddress").value;
		  this.form.postcode = document.getElementById("sample6_postcode").value;
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
                        </tr>
                        <tr>
                          <th>상태</th>
                          <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                        </tr>
                        <tr>
                          <th>연락처 1</th>
                          <td>
                            <Input defaultValue={data.cellphone} onChange={(e) => this.form.cellphone=e.target.value}/>
                          </td>
                        </tr>
                        <tr>
                          <th>연락처 2</th>
                          <td>
                            <Input defaultValue={data.telephone} onChange={(e) => this.form.telephone=e.target.value}/>
                          </td>
                        </tr>
                        <tr>
                          <th>사업자등록번호</th>
                          <td>
                            <Input defaultValue={data.crNumber} onChange={(e) => this.form.crNumber=e.target.value}/>
                          </td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td colSpan="3">
                            <Row style={{marginBottom: '10px'}}>
                              <Col lg="6" md="6" sm="6">
                                <div style={{marginBottom: '10px', marginLeft: '5px'}}>{data.address}</div>
                                <InputGroup required>
                                  <Input type="text" id="sample6_postcode" placeholder="우편번호" readOnly/>                            
                                  <InputGroupAddon addonType="append">
                                    <Button block color="primary" onClick={() => {this.sample6_execDaumPostcode()}}>우편번호찾기</Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </Col>
                            </Row>
                            <Row style={{marginBottom: '10px'}}>
                              <Col>
                                <Input type="text" id="sample6_address" placeholder="주소" readOnly/>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6" md="6" sm="6" style={{paddingRight: '0px'}}>
                                <Input type="text" id="sample6_detailAddress" placeholder="상세주소"/>
                              </Col>
                            </Row>
                            {/*<Input onChange={(e) => this.form.address=e.target.value}/>*/}
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

