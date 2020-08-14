import React from "react";
import Table from "./Table";
import Paginations from "./Pagination";
const Modal = (props) => {
  const {
    modalTitle, detailName, detailContent
  } = props;
  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <div className="list-card">
        <div className="list-title">
          <span>{modalTitle}</span>
        </div>
        <div style={{ marginTop: 10 }} className="list-box">
          {/* <Table {...tableProps}/> */}
        </div>
        {/* <Paginations {...PaginationProps} /> */}
      </div>
    </div>
  );
};

export default Modal;