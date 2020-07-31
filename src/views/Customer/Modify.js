import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup, Badge} from 'reactstrap';

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        telephone: '',
        cellphone: '',
        address: '',
        addressDetail: '',
        postcode: '',
        crNumber: '',
      },
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
				console.warn(data)
        this.setState({data: data[0]});
        document.getElementById("sample6_address").value = data[0].address;
        document.getElementById("sample6_detailAddress").value = data[0].address_detail;
				document.getElementById("sample6_postcode").value = data[0].postcode;
				this.state.data.name = data[0].name;
				this.state.data.telephone = data[0].telephone;
				this.state.data.cellphone = data[0].cellphone;
				this.state.data.address = data[0].address;
				this.state.data.addressDetail = data[0].addressDetail;
				this.state.data.postcode = data[0].postcode;
				this.state.data.crNumber = data[0].crNumber;
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
      this.state.data.address = document.getElementById("sample6_address").value;
      this.state.data.addressDetail = document.getElementById("sample6_detailAddress").value;
      this.state.data.postcode = document.getElementById("sample6_postcode").value;
      for (let [key, value] of Object.entries(this.state.data)) {
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

  handleState = ({ target: { name, value } }) => {
    let {data} = this.state;
    data[name] = value
    this.setState(data);
  };

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
                            <Input value={data.name}  name="name" onChange={this.handleState}/>
                          </td>
                        </tr>
                        <tr>
                          <th>상태</th>
                          <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                        </tr>
                        <tr>
                          <th>연락처 1</th>
                          <td>
                            <Input value={data.cellphone} required pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"  name="cellphone" onChange={this.handleState}/>
                          </td>
                        </tr>
                        <tr>
                          <th>연락처 2</th>
                          <td>
                            <Input value={data.telephone} pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" name="telephone" onChange={this.handleState} onBlur={this.handleState}/>
                          </td>
                        </tr>
                        <tr>
                          <th>사업자등록번호</th>
                          <td>
                            <Input value={data.crNumber} name="crNumber" onChange={this.handleState} onBlur={this.handleState}/>
                          </td>
                        </tr>
                        <tr>
                          <th>주소</th>
                          <td colSpan="3">
                            <Row style={{marginBottom: '10px'}}>
                              <Col lg="6" md="6" sm="6">
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

