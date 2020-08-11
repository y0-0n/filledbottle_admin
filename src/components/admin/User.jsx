import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Button} from 'reactstrap';
import Table from "../common/Table";
import Paginations from "../common/Pagination";
// import {getList} from './User'

const User = () => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const listCount = 15
  useEffect(() => {
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/total/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          setTotal(Math.ceil(data[1][0].total/listCount))
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }, [])

  useEffect(() => {
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/list/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({page})
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
          setData(data[1])
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }, [page])

  const tableProps = {
    ths: {
      id: '#',
      name : '이름',
      email : '아이디( 이메일 )',
      phone : '전화번호',
      address : '주소',
      crNumber : '사업자 등록번호',
    },
    tds : data,
  };

  const PaginationProps = {
    page : page,
    total : total,
    setPage : setPage
  }

  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <div className="list-card">
        <div className="list-title">
          <span>
            회원 목록
            </span>
          <div style={{ float: "right" }}>
            <Button style={{ marginBottom: 10 }} onClick={() => { history.push('/admin/users/create'); }} color="primary">회원 등록</Button>
          </div>
        </div>
        <div style={{ marginTop: 10 }} className="list-box">
          <Table {...tableProps}/>
        </div>
        <Paginations {...PaginationProps} />
      </div>
    </div>
  );
};

export default User;