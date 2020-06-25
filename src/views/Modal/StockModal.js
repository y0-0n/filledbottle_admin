import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink, InputGroupAddon, InputGroup } from 'reactstrap';
import StockList from '../Stock/Stock'
const listCount = 15;

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
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

  render() {
    const stockList = this.props.stockList[0][0];
    console.log(stockList,'dddfadfa')
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
                <tr onClick={() => this.selectStock()}>
                  <td>{stockList.name}</td>
                  <td>{stockList.plantName}</td>
                  <td>{this.getDate(stockList.expiration)}</td>
                  <td>{stockList.quantity}개</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div style={{ margin: 'auto' }}>
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
          </div>
        </div>
      </div>
    )
  }
}

export default StockModal;
