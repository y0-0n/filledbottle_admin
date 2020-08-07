import React, { Component } from 'react';
import { Table } from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, name: '김철수', tel: '010-1234-1234', collect: 1000, receivable: 99000 },
        { id: 1, name: '김영희', tel: '010-1111-2222', collect: 0, receivable: 999000 },
      ],
      totalData: 0,
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <div className="list-card">
          <div className="list-title">
            <span>
              고객목록 (총 <span style={{ color: "#1B8EB7" }}>{this.state.totalData}</span> 개)
            </span>
          </div>
          <div className="list-box">
            <Table className="ListTable" hover>
              <thead>
                <tr>
                  <th>no.</th>
                  <th>고객명</th>
                  <th>연락처</th>
                  <th>수금 금액</th>
                  <th>미수금 금액</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.tel}</td>
                        <td>{e.collect}</td>
                        <td>{e.receivable}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}



export default List;
