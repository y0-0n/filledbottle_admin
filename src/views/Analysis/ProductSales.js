import React, { Component } from 'react';
import { Table } from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList : [{name : '김영희', cellphone: '010-8765-1234', quantity: 100, total: 1000000}, {name : '김철수', cellphone: '010-8111-1111', quantity: 90, total: 900000}]
    }
  }
  render() {
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <div className="list-card">
          <div className="list-title">
            <span>
              가장 많이 구매한 고객 목록
            </span>
          </div>
          <div className="list-box">
            <Table className="ListTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>고객명</th>
                  <th>연락처</th>
                  <th>구매 수량</th>
                  <th>구매 총액</th>
                </tr>
              </thead>
              <tbody>
                {this.state.customerList.map((e,i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.cellphone}</td>
                      <td>{e.quantity}</td>
                      <td>{e.total}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

    )

  }


}

export default List;