import React, { Component } from 'react';
import { Table } from 'antd';


class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year : new Date().getFullYear(),
      month : new Date().getMonth()+1,
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

  componentWillMount() {
    this.setState({
      dataSource : [{key: 1, name : '당근', quantity : 8, sales_price : 1000000}, {key: 2, name : '양파', quantity : 20, sales_price : 330000}],
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

