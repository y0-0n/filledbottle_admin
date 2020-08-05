/*global daum*/
import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup} from 'reactstrap';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      telephone: '',
      cellphone: '',
      address: '',
      addressDetail: '',
      postcode: '',
      crNumber: '',
    }
  }

  componentWillMount() {
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
		let formData = new FormData();
    this.state.address = document.getElementById("sample6_address").value
    this.state.addressDetail = document.getElementById("sample6_detailAddress").value;
		this.state.postcode = document.getElementById("sample6_postcode").value;
    for (let [key, value] of Object.entries(this.state)) {
      formData.append(key, value);
    }

    if (this.state.address === '') alert('주소를 입력해주세요')

    else {
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
  }

  handleState = ({ target: { name, value } }) => {
    this.setState({[name] : value});
  };

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col sm="12" md="12" lg="12">
            <form encType="multipart/form-data" onSubmit={this.handlePost.bind(this)}>
              <div className="form-card">
                <div className="form-title">고객 정보</div>
                <div className="form-innercontent">
                  <div className="sell-list">
                    <label className="sell-label">기업(고객)명<span style={{color : "#FA5858"}}>*</span></label>
                    <div className="sell-input">
                      <Input style={{width: "50%"}} required name="name" value={this.state.name} onChange={this.handleState}/>
                    </div>
                  </div>

                  <div className="sell-list">
                    <label className="sell-label">연락처1<span style={{color : "#FA5858"}}>*</span></label>
                    <div className="sell-input">
                      <Input style={{width: "50%"}} type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"  placeholder={ "000-0000-0000" } name="cellphone" value={this.state.cellphone} onChange={this.handleState} required/>
                    </div>
                  </div>

                  <div className="sell-list">
                    <label className="sell-label">연락처2</label>
                    <div className="sell-input">
                      <Input style={{width: "50%"}} type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" name="telephone" value={this.state.telephone} onChange={this.handleState}/>
                    </div>
                  </div>

                  <div className="sell-list">
                    <label className="sell-label">사업자등록번호</label>
                    <div className="sell-input">
                      <Input style={{width: "50%"}} name="crNumber" value={this.state.crNumber} onChange={this.handleState}/>
                    </div>
                  </div>

                  <div className="sell-list">
                    <label style={{height: "100px"}} className="sell-label">주소<span style={{color : "#FA5858"}}>*</span></label>
                    <div className="sell-input">
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
                          <Input style={{width: "50%"}} type="text" id="sample6_address" placeholder="주소" readOnly/>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6" md="6" sm="6" style={{paddingRight: '0px'}}>
                          <Input style={{width: "50%"}} type="text" id="sample6_detailAddress" placeholder="상세주소"/>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
                <Button block outline color="primary">추가하기</Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
        
    )

  }

  
}

export default Create;

