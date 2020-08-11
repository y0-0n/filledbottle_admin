import React from "react";
import "./Table.scss";

const Table = (props) => {
  const {
    ths, tds, trClick
  } = props;
  return (
    <div className="table_box">
      <table>
        <thead>
          <tr>
            {Object.keys(ths).map((el, key) => {
              return <th key={key}>{ths[el]}</th>;
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tds.map((el, key) => {
            return (
              <tr key={key}>
                {
                  Object.keys(ths).map((ele, i) => {
                    return <td key={i}>{el[ele]}</td>;
                  })
                }
                <td>
                  <button className="edit_btn" onClick={el.fn}>DETAIL</button>
                  <button className="delete_btn">DELETE</button>
                </td>
              </tr>
            );
          })}

        </tbody>
      </table>
    </div>
  );
};

export default Table;