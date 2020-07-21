/*global daum*/
import React, { Component } from 'react';
import { Table } from 'antd';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : new Date().getFullYear(),
      month : new Date().getMonth()+1,
      columns : [{
        title: '번호',
        dataIndex: 'key',
        sorter: (a, b) => a.key - b.key,
        sortDirections: ['descend'],
      },
      {
        title: '주문일자',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.date.length - b.date.length,
      },
      {
        title: '주문수량',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '주문금액',
        dataIndex: 'order_price',
        sorter: (a, b) => a.sales_price - b.sales_price,
        sortDirections: ['descend', 'ascend'],
      },],
      dailySales : []
    }
  }

  componentWillMount() {
    this.setState({
      dailySales : [{key: 1, date : '2020-07-01', quantity: 100, order_price : 7800000}, {key: 2, date: '2020-07-19', quantity : 87, order_price : 650000}],
    })
  }

  nextMonth() {
    if( this.state.month < 12)
      this.setState({ month: ++this.state.month });
    else if ( this.state.month === 12 )
      this.setState({ year: ++ this.state.year , month : 1 })
  }

  prevMonth() {
    if( this.state.month > 1)
      this.setState({ month: -- this.state.month });
    else if ( this.state.month === 1 )
      this.setState({ year: -- this.state.year , month : 12 })
  }
    

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.min.css"/>
        <div>
          <div className="form-card sales-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              <span style={{cursor: 'pointer'}} onClick={() => {this.prevMonth()}}>◀</span>
              <span style={{margin: '0 10px 0 10px'}}>{this.state.year}년 {this.state.month}월</span>
              <span style={{cursor: 'pointer'}} onClick={() => {this.nextMonth()}}>►</span>
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">일별 판매량</div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table dataSource={this.state.dailySales} columns={this.state.columns} />
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

