import React, { useEffect, useState } from "react";
import Detail from "../common/Detail";
import _fetch from '../../fetch';

const User = () => {
  const detailProps = {
    detailTitle : '농장정보',

    detailName: {
      farmName : '농장 이름',
      name : '대표자 이름',
      phone : '대표자 연락처',
      address : '주소',
      image : '생산자 이미지',
      crNumber : '사업자 등록 번호',
    },

    detailContent: {
      farmName : '민수네 농장',
      name : '킴민수',
      phone : '010-1231-1231',
      address : '경기도 화성시',
      image : '../image/img.jpg',
      crNumber : '12341234',
    },
  };

  return (
    <div className="animated fadeIn">
      <Detail {...detailProps} />
    </div>
  );
};

export default User;