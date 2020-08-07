import React, { Component } from 'react';
import { Table } from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData : [],
      customerList : [{name : '김영희', cellphone: '010-8765-1234', quantity: 100, total: 1000000}, {name : '김철수', cellphone: '010-8111-1111', quantity: 90, total: 900000}]
    }
  }

  componentWillMount() {
    this.getCustomerOrder();
  }

  getCustomerOrder() {
    fetch(process.env.REACT_APP_HOST + "/api/customer/getOrder", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ customer: this.props.match.params.id })
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          this.setState({ orderData: data[1] })
        } else if (status === 401) {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <div className="list-card">
          <div className="list-title">
            <span>
              고객이 주문한 품목 목록
            </span>
          </div>
          <div className="list-box">
          <Table className="orderlist-table">
                  <tr>
                    <th>이름</th>
                    <th>수량</th>
                    <th>가격</th>
                  </tr>
                  {
                    this.state.orderData.map((e, i) => {
                      return <tr>
                        <td>{e.name}</td>
                        <td>{e.quantity}</td>
                        <td>{e.sum}</td>
                      </tr>
                    })
                  }
                </Table>
          </div>
        </div>
      </div>

    )

  }


}

export default List;