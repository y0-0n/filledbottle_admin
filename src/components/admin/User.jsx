import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Button} from 'reactstrap';
import Table from "../common/Table";
import Paginations from "../common/Pagination";
import _fetch from '../../fetch';
// import {getList} from './User'

const User = () => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const listCount = 15
  useEffect(() => {
    _fetch("/api/admin/users/total/", 'GET', null, (data) => {
      setTotal(Math.ceil(data[0].total/listCount))
    })
  }, [])

  useEffect(() => {
    _fetch("/api/admin/users/list/", 'POST', {page}, (data) => {
      data.forEach(element => {
        element.fn = () => {history.push('/admin/users/detail/' + element.id)}
      });
      setData(data)
    })
  }, [page])

  const tableProps = {
    ths: {
      id: '#',
      name : '이름',
      email : '아이디( 이메일 )',
      farm : '근무농장',
      position : '직책',
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
          <span>회원 목록</span>
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