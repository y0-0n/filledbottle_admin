import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import {
  Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input, NavItem, Nav, NavLink,
  CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup, Badge,
  InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketData : [{id: 1, name: '코스트코', address: '서울특별시 성북구', product: '사과', performance: 100000}],
      totalData : 0,
      data : [{id: 1, date: '2020-05-03', name : '맛있는 사과', cost: 1000, stock: 150, performance: 19000}]
    };
  }

  countPageNumber(x) {
    this.setState({
    }, () => {
    });
  }

  resetInput() {
    var reset_input = document.getElementsByClassName('searchbox-input')
    for (var i = 0; i < reset_input.length; i++) {
      reset_input[i].value = null;
      console.log(i);
    }
  }

  resetDatePicker() {
    this.setState({
      first_date: (new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * 30 * 4)),
      last_date: new Date(),
    })
  }

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <Row>
          <Col>
            <div className="list-card">
              <div className="list-title" style={{textAlign: 'center'}}>
                <span>
                  <span style={{color: '#20A8D8', fontSize: '1.5em'}}>{this.state.marketData[0].name}  </span>  매장페이지
                </span>
                <div className="purchase-box">
                  <span>총 매출 : <span style={{fontWeight: 'bolder', fontSize: '1.3em'}} >{this.state.marketData[0].performance}</span> 원</span>
                </div>
              </div>
              <div className="list-title">
                <span>
                  상품목록 (총 <span style={{ color: "#1B8EB7" }}>{this.state.totalData}</span> 개)
                </span>
                <div className="list-sort-box">
                  <div>
                    <select>
                      <option>재고순</option>
                      <option>총액높은순</option>
                      <option>총액낮은순</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="list-menu">
              </div>
              <div className="list-box" style={{ marginTop: 20 }}>
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th className="list-hidden">#</th>
                      <th className="list-shown">날짜</th>
                      <th className="list-hidden">상품명</th>
                      <th className="list-shown">단가 (원)</th>
                      <th className="list-shown">상품재고</th>
                      <th className="list-shown">판매실적 (원)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.data.map((e, i) => {
                        return(
                          <tr key={i}>
                            <td>{e.id}</td>
                            <td>{e.date}</td>
                            <td>{e.name}</td>
                            <td>{e.cost}</td>
                            <td>{e.stock}</td>
                            <td>{e.performance}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

}

export default List;
