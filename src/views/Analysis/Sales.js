import React, { Component } from 'react';
import { Table } from 'antd';
import { Input } from 'reactstrap';
import moment from 'moment';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesView : 'monthly',
      salesList : 'product',
      year : new Date().getFullYear(),
      month : new Date().getMonth()+1,
      monthlySales : [],
      totalySales : [],
      columns : [],
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
    this.setColumns();
    this.setState({
      year : moment().year(),
      month : moment().month()+1,
    }, () => this.getProductResult(this.state.year, this.state.month))
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

  setColumns(){
    if (this.state.salesList === 'product'){
      this.setState({
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
        monthlySales : [{key: 1, name : '당근', quantity : 8, sales_price : 1000000}, {key: 2, name : '양파', quantity : 20, sales_price : 330000}],
        totalySales : [{key: 1, name : '누적당근', quantity : 8, sales_price : 1000000}, {key: 2, name : '누적양파', quantity : 20, sales_price : 330000}],
      })
    }
    else if(this.state.salesList === 'customer') {
      this.setState({
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
        monthlySales : [{key: 1, name : '김철수', quantity: 10, order_price : 1900000}, {key: 2, name : '김영희', quantity : 2, order_price : 30000}],
        totalySales : [{key: 1, name : '누적김철수', quantity: 10, order_price : 1900000}, {key: 2, name : '누적김영희', quantity : 2, order_price : 30000}],
      })
    }
    else if(this.state.salesList === 'daily'){
      this.setState({
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
        monthlySales : [{key: 1, name: '',  date : '2020-07-01', quantity: 100, order_price : 7800000}, {key: 2, name: '', date: '2020-07-19', quantity : 87, order_price : 650000}],
      })
    }
  }
    

  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.25.3/antd.min.css"/>
        <div>
          <div style={{textAlign: 'center', marginBottom: 20}}>
            <Input style={{ width: "10%" }} onChange={(e) => {
              this.setState({ salesView: e.target.value }, () => {
                this.setColumns();
              });
            }} type='select' name="family">
              <option value="monthly">월별</option>
              <option value="totaly">누적</option>
            </Input>
          </div>
          {
            this.state.salesView === "monthly" ?
          <div className="form-card sales-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              <span style={{cursor: 'pointer'}} onClick={() => {this.prevMonth()}}>◀</span>
              <span style={{margin: '0 10px 0 10px'}}>{this.state.year}년 {this.state.month}월</span>
              <span style={{cursor: 'pointer'}} onClick={() => {this.nextMonth()}}>►</span>
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">
                  <Input style={{width: "20%"}} onChange={(e) => {
                      this.setState({salesList : e.target.value}, ()=> {
                        this.setColumns();
                      });
                    }} type='select' name="family">
                      <option value="product">품목별 판매량</option>
                      <option value="customer">고객별 판매량</option>
                      <option value="daily">일별 판매량</option>
                  </Input>
                </div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table dataSource={this.state.monthlySales} columns={this.state.columns} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
            :
          <div className="form-card sales-card">
            <div className="form-title" style={{textAlign: 'center', fontSize: '1.2em'}}>
              누적 내역
            </div>
            <div className="form-innercontent">
              <div className="form-card">
                <div className="form-title">
                  <Input style={{width: "20%"}} onChange={(e) => {
                      this.setState({salesList : e.target.value}, ()=> {
                        this.setColumns();
                      });
                    }} type='select' name="family">
                      <option value="product">품목별 판매량</option>
                      <option value="customer">고객별 판매량</option>
                  </Input>
                </div>
                <div className="form-innercontent">
                  <div className="list-box">
                    <Table dataSource={this.state.totalySales} columns={this.state.columns} /> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>

    )

  }


}

export default List;

