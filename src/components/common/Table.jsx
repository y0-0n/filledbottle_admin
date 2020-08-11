import React from "react";
import { useHistory } from 'react-router-dom'
import "./Table.scss";

const Table = (props) => {
  const history = useHistory()
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
                    return <td>{el[ele]}</td>;
                  })
                }
                <td>
                  <button className="edit_btn" onClick={() => {history.push('/admin/users/detail/' + el[Object.keys(ths)[0]])}}>DETAIL</button>
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