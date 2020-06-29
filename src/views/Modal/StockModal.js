import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink, InputGroupAddon, InputGroup } from 'reactstrap';
import StockList from '../Stock/Stock'
const listCount = 15;

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: []
    };
  }

  componentWillMount() {
    this.getStock(this.props.productId);
    // console.warn(this.props.productId)
    this.selectStock = this.selectStock.bind(this);
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  selectStock(data) {
    this.props.selectStock(data);
    this.props.close();
  }

  //productId로 재고 구분 가져와서 i번째 select에 뿌리기
  getStock(productId) {
    fetch(process.env.REACT_APP_HOST+"/api/stock/product/"+productId, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        let status = data[0];
        if(status === 200){
          this.setState({
            stockList: data[1]
          })
          // let {stockList, sProduct} = this.state;
          // stockList[i] = data[1];
          // sProduct[i].stock = data[1][0].id
          // sProduct[i].plant = data[1][0].plant_id
          // this.setState({stockList, sProduct})
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }  

  render() {
    // const stockList = this.props.stockList[0];
    const stockList = this.state.stockList
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Modal.css"></link>
        <div className="card">
          <div className="card-header">
            <Row>
              <Col><i className="icon-drop">재고목록</i></Col>
            </Row>
          </div>
          <div className="card-body product-cardbody" style={{ overflow: 'scroll', height: 500 }} >
            <Table className="ListTable" hover>
              <thead>
                <tr>
                  <th>제품명</th>
                  <th>창고</th>
                  <th>유통기한</th>
                  <th>재고</th>
                </tr>
              </thead>
              <tbody>
                {stockList.map((e, i) => {
                  return <tr key={i} onClick={() => this.selectStock(e)}>
                  <td>{e.name}</td>
                  <td>{e.plantName}</td>
                  <td>{this.getDate(e.expiration)}</td>
                  <td>{e.quantity}개</td>
                </tr>
                })}
                <tr>
                  {stockList.length == 0 ? <td colSpan="4">"해당 품목의 재고가 존재하지 않습니다."</td> : "" }
                </tr>
              </tbody>
            </Table>
          </div>
          {/* <div style={{ margin: 'auto' }}>
            <Pagination>
              {this.state.page === 1 ? '' :
                <PaginationItem>
                  <PaginationLink previous onClick={() => { this.countPageNumber(this.state.page - 1) }} />
                </PaginationItem>
              }
              {this.state.page === 1 ? arr.forEach(x => arr1.push(x + 2)) : null}
              {this.state.page === 2 ? arr.forEach(x => arr1.push(x + 1)) : null}
              {this.state.page !== 1 && this.state.page !== 2 ? arr.forEach(x => arr1.push(x)) : null}
              {arr1.map((e, i) => {
                if (this.state.total >= this.state.page + e)
                  return (<PaginationItem key={i} active={this.state.page === this.state.page + e}>
                    <PaginationLink onClick={() => { this.countPageNumber(this.state.page + e) }}>
                      {this.state.page + e}
                    </PaginationLink>
                  </PaginationItem>)
                return null;
              })}
              {this.state.page === this.state.total ? '' :
                <PaginationItem>
                  <PaginationLink next onClick={() => { this.countPageNumber(this.state.page + 1) }} />
                </PaginationItem>}
            </Pagination>
          </div> */}
        </div>
      </div>
    )
  }
}

export default StockModal;
