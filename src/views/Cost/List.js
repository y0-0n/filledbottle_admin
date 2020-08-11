import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1, date: '2020-09-03', total: 1000 },
        { id: 2, date: '2020-09-05', total: 1090 },
      ]
    };
  }
  render() {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div className="form-card">
          <div className="form-title">
            <span>
              원가 변동 내역
            </span>
            <div style={{float: "right"}}>
              <Button color="primary" onClick={() => { this.props.history.push(`/main/product/`+this.props.match.params.id+`/create/cost`); }}>추가하기</Button>
            </div>
          </div>
          <div className="form-innercontent">
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>원가 입력일</th>
                  <th>원가 총액</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map((e, i) => {
                    return (
                      <tr key={i}  onClick={() => {
                        this.props.history.push({
                          pathname: `/main/product/`+this.props.match.params.id+`/cost/`+e.id,
                        })
                      }}>
                        <td>{e.id}</td>
                        <td>{e.date}</td>
                        <td>{e.total}</td>
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

export default Detail;
