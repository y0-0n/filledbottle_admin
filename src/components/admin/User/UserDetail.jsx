import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import Detail from "../common/Detail";
import _fetch from '../../fetch';

const User = () => {
  let {id} = useParams();
  const [content, setContent] = useState({})

  useEffect(() => {
    _fetch(`/api/admin/users/detail/${id}`, 'GET', null, (data) => {
      switch(data[0].role) {
        case 1:
          data[0].role = '직원';
          break;
        case 2:
          data[0].role = '대표';
          break;
        default:
          break;
    }
      setContent(data[0]);
    })
  }, [])

  const detailProps = {
    detailTitle : '회원정보',

    detailName: {
      name : '회원 이름',
      email : '아이디( 이메일 )',
      company_id : '근무농장',
      phone : '연락처',
      role : '직책',
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