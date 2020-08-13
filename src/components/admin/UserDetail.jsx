import React, { useEffect, useState } from "react";
import Detail from "../common/Detail";
import _fetch from '../../fetch';

const User = () => {
  const detailProps = {
    detailTitle : '회원정보',

    detailName: {
      name : '회원 이름',
      email : '아이디( 이메일 )',
      password : '비밀번호',
      farm : '근무농장',
      phone : '연락처',
      position : '직책',
    },

    detailContent: {
      name : '채윤병',
      email : 'test@naver.com',
      password : '1111',
      farm : '민수네 농장',
      phone : '010-1991-1231',
      position : '대표',
    },
  };

  return (
    <div className="animated fadeIn">
      <Detail {...detailProps} />
    </div>
  );
};

export default User;