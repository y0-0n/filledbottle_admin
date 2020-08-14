import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { Button, Input } from 'reactstrap';
import Table from "../../common/Table";
import Paginations from "../../common/Pagination";
import _fetch from '../../../fetch';
// import {getList} from './User'

const User = () => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const perPage = 15;
  
  useEffect(() => {
    _fetch("/api/admin/users/total/", 'GET', null, (data) => {
      setTotal(Math.ceil(data[0].total/perPage))
    })
  }, [])

  useEffect(() => {
    _fetch(`/api/admin/users/list/?page=${page}&perPage=${perPage}&name=${''}`, 'GET', null, (data) => {
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
      company_id : '근무농장',
      role : '직책',
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
      <div className="search-box" style={{marginBottom : 10}}>
        <div className="search-list">
          <label className="search-label">근무 농장검색</label>
          <div className="sell-input">
            <Input className="searchbox-input" placeholder="근무 농장 이름을 검색해주세요." style={{width: "30%"}} />
          </div>
        </div>
        <div className="search-list">
          <label className="search-label">회원검색</label>
          <div className="sell-input">
            <Input className="searchbox-input" placeholder="회원 이름을 검색해주세요." style={{width: "30%"}} />
          </div>
        </div>
        <div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
          <Button color="primary" style={{marginRight: 10}}>검색</Button>
        </div>
      </div>
      <div className="list-card">
        <div className="list-title">
          <span>회원 목록</span>
          {/* <div style={{ float: "right" }}>
            <Button style={{ marginBottom: 10 }} onClick={() => { history.push('/admin/users/create'); }} color="primary">회원 등록</Button>
          </div> */}
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