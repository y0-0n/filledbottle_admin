import React, { useEffect, useState } from "react";
import { Button} from 'reactstrap';
import Table from "../common/Table";
import Paginations from "../common/Pagination";
import { useHistory } from 'react-router-dom';
import _fetch from '../../fetch';
// import {getList} from './User'

const Farm = () => {
  const history = useHistory()

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const listCount = 15

  useEffect(() => {
    _fetch('/api/admin/company/total', 'GET', null, (data) => {
      setTotal(data[0].total/listCount)
    })
  }, [])

  useEffect(() => {
    _fetch(`/api/admin/company/list?page=${page}&perPage=${listCount}`, 'GET', null, (data) => {
      data.forEach(element => {
        element.fn = () => {history.push('/admin/users/detail/' + element.id)}
      });
      setData(data)
    })    
  }, [page])

  const tableProps = {
    ths: {
      id: '#',
      farmName : '농장 이름',
      name : '대표자 이름',
      phone : '대표자 연락처',
      address : '주소',
      img : '생산자 이미지',
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
            농장 목록
            </span>
        </div>
        <div style={{ marginTop: 10 }} className="list-box">
          <Table {...tableProps}/>
        </div>
        <Paginations {...PaginationProps} />
      </div>
    </div>
  );
};

export default Farm;