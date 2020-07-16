import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input, NavItem, Nav, NavLink,
   CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup, Badge,
   InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count : 1,
      process: "all",
      orderData: [],
      total: 0,
      totalData: 0,
      checks: []
    };
	}

  render() {
    var data = this.state.orderData;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    data.map((e, i) => {this.state.checks[i] = false});
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <Row>
          <Col>
            <div className="search-box">
              <div className="search-list">
                <label className="search-label">매장명</label>
                <div className="sell-input">
                  <Input className='searchbox-input' placeholder="매장명을 검색해주세요." style={{width: "30%"}} onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">취급품목</label>
                <div className="sell-input">
                  <Input className='searchbox-input' placeholder="품목명을 검색해주세요." style={{width: "30%"}} onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
                </div>
              </div>
              <div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
                <Button color="primary" style={{marginRight: 10}} onClick={() => { this.searchOrder(this.props.keyword); }}>검색</Button>
								<Button color="ghost-primary" onClick={() => { this.props.searchKeyword(''); this.resetInput(); this.resetDatePicker() }}>초기화</Button>
							</div>
            </div>
            
            <div className="list-card">
              <div className="list-title">
                <span>
                  매장목록 (총 <span style={{color: "#1B8EB7"}}>{this.state.totalData}</span> 개)
                </span>
                <div className="list-sort-box">
                  <div>
                    <select>
                      <option>품목일순</option>
                      <option>총액높은순</option>
                      <option>총액낮은순</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="list-menu">
              </div>
              <div className="list-box" style={{marginTop: 20}}>
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th className="list-hidden">#</th>
                      <th className="list-shown">매장명</th>
                      <th className="list-hidden">주소</th>
                      <th className="list-shown">취급품목</th>
                      <th className="list-shown">판매실적 (원)</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
                <Pagination style={{justifyContent: 'center'}}>
                  {this.props.pageNumbers === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers-1))}}/>
                  </PaginationItem>
                  }
                  {this.props.pageNumbers === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.props.pageNumbers === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {this.props.pageNumbers !== 1 && this.props.pageNumbers!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.props.pageNumbers+e)
                    return (<PaginationItem key={i} active={this.props.pageNumbers === this.props.pageNumbers+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+e));}}>
                      {this.props.pageNumbers+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.props.pageNumbers === this.state.total ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+1))}}/>
                  </PaginationItem>}
                </Pagination>
                
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

}

export default List;
