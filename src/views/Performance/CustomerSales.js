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
        title: '고객명',
        dataIndex: 'name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.name.length - b.name.length,
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
      customerSales : [],
    }
  }

  componentWillMount() {
    this.setState({
      customerSales : [{key: 1, name : '김철수', quantity: 10, order_price : 1900000}, {key: 2, name : '김영희', quantity : 2, order_price : 30000}],
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
                <div className="form-title">고객별 판매량</div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table dataSource={this.state.customerSales} columns={this.state.columns} />
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

