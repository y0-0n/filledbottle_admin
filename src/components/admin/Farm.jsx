import React, { useEffect, useState } from "react";
import { Button} from 'reactstrap';
import Table from "../common/Table";
import Paginations from "../common/Pagination";
// import {getList} from './User'

const Farm = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const listCount = 15

  useEffect(() => {
    setData([
        {
            id: 1,
            name : '민수 농장',
            phone : '0109123131',
            address : '서울특별시',
            crNumber : 123,
        },
        {
            id: 2,
            name : '영희 농장',
            phone : '01091213231',
            address : '경기도 광주시',
            crNumber : 1234,
        },
    ])
  }, [page])

  const tableProps = {
    ths: {
      id: '#',
      name : '농장 이름',
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