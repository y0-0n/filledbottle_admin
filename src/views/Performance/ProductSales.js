import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : 0,
      month : 0,
      productSales : [],
      columns : [{
        title: '번호',
        dataIndex: 'key',
        sorter: (a, b) => a.key - b.key,
        sortDirections: ['descend'],
      },
      {
        title: '품목명',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: '판매수량',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '판매금액',
        dataIndex: 'sales_price',
        sorter: (a, b) => a.sales_price - b.sales_price,
        sortDirections: ['descend', 'ascend'],
      },],
      dataSource : []
    }
  }

  getProductResult(year, month) {
    fetch(process.env.REACT_APP_HOST+`/api/result/product/${year}/${month}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if(response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if(status === 200) {
          console.warn(data)
        } else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }

  componentWillMount() {
    this.setState({
      year : moment().year(),
      month : moment().month()+1,
      dataSource : [{key: 1, name : '당근', quantity : 8, sales_price : 1000000}, {key: 2, name : '양파', quantity : 20, sales_price : 330000}],
    }, () => this.getProductResult(this.state.year, this.state.month))
  }

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.min.css"/>
        <div>
          <div className="form-card sales-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              {this.state.year}년 {this.state.month}월
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">품목별 판매량</div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table dataSource={this.state.dataSource} columns={this.state.columns} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }


}

export default List;

