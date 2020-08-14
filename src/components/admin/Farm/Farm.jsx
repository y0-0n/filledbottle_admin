import React, { useEffect, useState } from "react";
import { Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import Table from "../../common/Table";
import Paginations from "../../common/Pagination";
import ProductFamily from "../../common/ProductFamily";
import { useHistory } from 'react-router-dom';
import _fetch from '../../../fetch';
// import {getList} from './User'

const Farm = () => {
  const history = useHistory()

  const [data, setData] = useState([])
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [category, setCategory] = useState();
  const [categoryData, setCategoryData] = useState();
  const [family, setFamily] = useState();
  const [familyData, setFamilyData] = useState();

  const perPage = 15

  // useEffect(() => {
  //   _fetch('/api/admin/company/total', 'GET', null, (data) => {
  //     setTotal(Math.ceil(data[0].total/perPage))
  //   })
  // }, [])

  useEffect(() => {
    _fetch(`/api/admin/company/list?page=${page}&perPage=${perPage}&name=${''}`, 'GET', null, (data) => {
      data.list.forEach(element => {
        element.fn = () => { history.push('/admin/farm/detail/' + element.id) }
      });
      setData(data.list);
      setTotal(Math.ceil(data.total / perPage));
    })
  }, [page])

  useEffect(() => {
    _fetch("/api/product/familyCategory", 'GET', null, (data) => {
      setCategoryData(data)
    })
  }, [])

  useEffect(() => {
    _fetch("/api/product/allFamily/" + category, 'GET', null, (data) => {
      setFamilyData(data)
    })
  }, [category])

  const tableProps = {
    ths: {
      id: '#',
      name: '농장 이름',
      ceoName: '대표자 이름',
      phone: '대표자 연락처',
      address: '주소',
    },
    tds: data,
  };

  const PaginationProps = {
    page: page,
    total: total,
    setPage: setPage
  }
  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <div className="search-box" style={{ marginBottom: 10 }}>
        <div className="search-list">
          <label className="search-label">농장검색</label>
          <div className="sell-input">
            <Input className="searchbox-input" placeholder="농장 이름을 검색해주세요." style={{ width: "30%" }} />
          </div>
        </div>
        <div className="search-list">
          <label className="search-label">품목군검색</label>
          <ProductFamily />
        </div>
        <div className="search-button" style={{ textAlign: 'center', paddingBottom: "10px" }}>
          <Button color="primary" style={{ marginRight: 10 }}>검색</Button>
        </div>
      </div>
      <div className="list-card">
        <div className="list-title">
          <span>농장 목록</span>
          <div style={{ float: "right" }}>
            <Button style={{ marginBottom: 10 }} onClick={() => { history.push('/admin/farm/create'); }} color="primary">농장 등록</Button>
          </div>
        </div>
        <div style={{ marginTop: 10 }} className="list-box">
          <Table {...tableProps} />
        </div>
        <Paginations {...PaginationProps} />
      </div>
    </div>
  );
};

export default Farm;