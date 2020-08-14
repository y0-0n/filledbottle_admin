import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom'

const CreateUser = () => {
  const history = useHistory()
  const [form, setForm] = useState([])
  const [formName, setFormName] = useState("");
  const [formFarmName, setFormFarmName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordC, setFormPasswordC] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRole, setFormRole] = useState("");

  function signup() {
    if (formPassword !== formPasswordC) {
      alert('비밀번호와 비밀번호 반복이 일치하는지 확인해주세요');
      return;
    }
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/create", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        history.push('/admin/users/list');
      });
  }

  useEffect(() => {
    setForm(
      {
        name: formName,
        farmId: formFarmName,
        email: formEmail,
        password: formPassword,
        phone: formPhone,
        role: formRole,
      }
    );
  }, [formName, formEmail, formPassword, formPasswordC, formPhone, formFarmName, formRole])

  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <Card>
        <CardBody className="p-4">
          <h1>회원 등록</h1>
          <p className="text-muted">정보를 입력하세요</p>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => {setFormName(e.target.value)}} placeholder="회원 이름" autoComplete="name" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>@</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => {setFormEmail(e.target.value)}} placeholder="아이디 (이메일)" autoComplete="email" />
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
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => {setFormFarmName(e.target.value)}} placeholder="근무 농장" autoComplete="farmName" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>#&nbsp;</InputGroupText>
            </InputGroupAddon>
            <Input type="text" onChange={(e) => setFormPhone(e.target.value)} placeholder="연락처" autoComplete="phone" />
          </InputGroup>
          <InputGroup className="mb-3">
            <div className="role-box">
              <Input className="role-input" type="radio" value="rep" onChange={(e) => setFormRole(e.target.value)} />
              <label>대표</label>
              <Input className="role-input" type="radio" value="employee" onChange={(e) => setFormRole(e.target.value)} />
              <label>직원</label>
            </div>
          </InputGroup>
          <Button color="success" id="button_joinus" disabled=""block onClick={signup}>등록하기</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateUser;