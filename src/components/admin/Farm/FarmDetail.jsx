import React, { useEffect, useState } from "react";
import { useParams, NavLink } from 'react-router-dom'
import Detail from "../../common/Detail";
import _fetch from '../../../fetch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {Badge, Button} from 'reactstrap';

const User = () => {
  let {id} = useParams();
  const [content, setContent] = useState({})
  const [mallVisible, setMallVisible] = useState(false)
  const [productData, setProductData] = useState([])
  
  useEffect(() => {
    _fetch(`/api/admin/company/productList/${id}`, 'GET', null, (data) => {
      setProductData(data)
    });
    _fetch(`/api/admin/company/detail/${id}`, 'GET', null, (data) => {
      data[0].mallVisible = 
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={mallVisible} onChange={() => setMallVisible(!mallVisible)} />}
          label={mallVisible ? <Badge color="primary">공개</Badge> : <Badge color="danger">비공개</Badge>}
        />
      </FormGroup>
      data[0].createUsers = 
        <div>
          <NavLink style={{display: 'inline-block'}} to={`/admin/users/list`} className="nav-link">회원 목록</NavLink>
          <NavLink style={{display: 'inline-block'}} to={`/admin/farm/createUser/${id}`} className="nav-link">회원 등록</NavLink>
        </div>
      data[0].createProducts = <NavLink style={{display: 'inline-block'}}  to={`/admin/farm/${id}/create`} className="nav-link">품목 등록</NavLink>
      data[0].product = productData
      setContent(data[0])
    });
  }, [productData])

  const detailProps = {
    detailTitle : '농장정보',

    detailName: {
      name : '농장 이름',
      ceoName : '대표자 이름',
      phone : '대표자 연락처',
      address : '주소',
      addressDetail : '주소 2',
      postcode: '우편번호',
      mallVisible: '상점 공개 여부',
      // image : '생산자 이미지',
      crNumber : '사업자 등록 번호',
      createUsers: '농장 회원',
      createProducts: '품목 추가',
      product: '취급 품목',
    },

    detailContent: content,
  };

  return (
    <div className="animated fadeIn">
      <Detail {...detailProps} />
    </div>
  );
};

export default User;