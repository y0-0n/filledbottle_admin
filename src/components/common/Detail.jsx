import React from "react";

const Detail = (props) => {
  const {
    detailTitle, detailName, detailContent
  } = props;
  return (
    <div>
      <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
      <div className="list-card form-card">
        <div className="list-title form-title">
          <span>
            {detailTitle}
          </span>
        </div>
        <div style={{ marginTop: 10 }} className="list-box">
          <div className="form-innercontent">
            {
              Object.keys(detailName).map((e) => {
                return (
                  <div className="sell-list">
                    <label className="sell-label">{detailName[e]}</label>
                    <div className="sell-input">
                      {detailContent[e]}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;