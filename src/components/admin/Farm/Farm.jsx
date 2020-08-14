import React, { useEffect, useState } from "react";
import { Button} from 'reactstrap';
import Table from "../../common/Table";
import Paginations from "../../common/Pagination";
import { useHistory } from 'react-router-dom';
import _fetch from '../../../fetch';
// import {getList} from './User'

const Farm = () => {
  const history = useHistory()

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const perPage = 15

  // useEffect(() => {
  //   _fetch('/api/admin/company/total', 'GET', null, (data) => {
  //     setTotal(Math.ceil(data[0].total/perPage))
  //   })
  // }, [])

  useEffect(() => {
    _fetch(`/api/admin/company/list?page=${page}&perPage=${perPage}&name=${''}`, 'GET', null, (data) => {
      data.list.forEach(element => {
        element.fn = () => {history.push('/admin/farm/detail/' + element.id)}
      });
      setData(data.list);
      setTotal(Math.ceil(data.total/perPage));
    })    
  }, [page])

  const tableProps = {
    ths: {
      id: '#',
      name : '농장 이름',
      ceoName : '대표자 이름',
      phone : '대표자 연락처',
      address : '주소',
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
          <span>농장 목록</span>
          <div style={{ float: "right" }}>
            <Button style={{ marginBottom: 10 }} onClick={() => { history.push('/admin/farm/create'); }} color="primary">농장 등록</Button>
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

export default Farm;