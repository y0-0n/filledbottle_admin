import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import { sample6_execDaumPostcode } from './CreateUser'

const CreateUser = () => {
  const history = useHistory()
  const [form, setForm] = useState([])
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordC, setFormPasswordC] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formAddressDetail, setFormAddressDetail] = useState("");
  const [formPostcode, setFormPostcode] = useState("");
  const [formCrNumber, setFormCrNumber] = useState("");
  // const [formAccountName, setFormAccountName] = useState("");
  // const [formAccountNumber, setFormAccountNumber] = useState("");

  function signup() {
    if (formPassword !== formPasswordC) {
      alert('비밀번호와 비밀번호 반복이 일치하는지 확인해주세요');
      return;
    }
    if (form.address === '' || form.postcode === '') {
      alert('주소를 확인해주세요');
      return;
    }

    fetch(process.env.REACT_APP_HOST + "/api/auth/signup", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(response => {
        return Promise.all([response.status, response.json()]);
      })
      .then(data => {
        let status = data[0];
        if (status === 422) {
          let { errors } = data[1];
          // console.log(errors)
          errors.map(function (e, _) {
            switch (e.param) {
              case 'email': alert('이메일을 확인해주세요'); break;
              case 'password': alert('비밀번호를 확인해주세요'); break;
              case 'name': alert('성명을 확인해주세요'); break;
              default: break;
            }
            return null;
          })
          return;
        } else if (status === 400) {
          alert('이미 존재하는 이메일 계정입니다.');
          return;
        } else if (status === 500) {
          alert('회원가입을 실패했습니다.');
          return;
        }
        alert('성공적으로 회원가입 됐습니다.');
        history.push('/login');
      });
  }

  useEffect(() => {
    setForm(
      {
        name: formName,
        email: formEmail,
        password: formPassword,
        passwordC: formPasswordC,
        phone: formPhone,
        address: document.getElementById("sample6_address").value,
        addressDetail: formAddressDetail,
        postcode: document.getElementById("sample6_postcode").value,
        crNumber: formCrNumber,
      }
    );
  }, [formName, formEmail, formPassword, formPasswordC, formPhone, formAddress, formAddressDetail, formPostcode, formCrNumber])

  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <Card style={{ height: '700px' }}>
        <CardBody className="p-4">
          <h1>회원 등록</h1>
          <p className="text-muted">정보를 입력하세요</p>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => {setFormName(e.target.value)}} placeholder="이름" autoComplete="username" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => {setFormEmail(e.target.value)}} placeholder="아이디" autoComplete="email" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" onChange={(e) => setFormPassword(e.target.value)} placeholder="비밀번호" autoComplete="new-password" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" onChange={(e) => setFormPasswordC(e.target.value)} placeholder="비밀번호 반복" autoComplete="new-password" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => setFormCrNumber(e.target.value)} placeholder="사업자등록번호" autoComplete="crNumber" />
          </InputGroup>
          {/* <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>*</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => setFormAccountName(e.target.value)} placeholder="은행명" autoComplete="AccountNumber" />
          </InputGroup> */}
          {/* <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>*</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => setFormAccountNumber(e.target.value)} placeholder="계좌번호" autoComplete="AccountNumber" />
          </InputGroup> */}
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>#&nbsp;</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => setFormPhone(e.target.value)} placeholder="전화번호" autoComplete="phone" />
          </InputGroup>
          <InputGroup style={{ width: '60%' }} className="mb-3">
            <Input type="text" id="sample6_postcode" placeholder="우편번호" onChange={(e) => setFormPostcode(e.target.value)}  readOnly />
            <InputGroupAddon addonType="append">
              <Button block color="primary" onClick={sample6_execDaumPostcode}>우편번호찾기</Button>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="mb-3">
            <Input className="mr-2" type="text" id="sample6_address" placeholder="주소" onChange={(e) => setFormAddress(e.target.value)} readOnly />
            <Input type="text" id="sample6_detailAddress" placeholder="상세주소" onChange={(e) => setFormAddressDetail(e.target.value)} />
          </InputGroup>
          <Button color="success" id="button_joinus" disabled=""block onClick={signup}>등록하기</Button>
        </CardBody>
        <CardFooter className="p-4">
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateUser;