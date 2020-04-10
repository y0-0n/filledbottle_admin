import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink, InputGroup, InputGroupAddon } from 'reactstrap';

const listCount = 15;

class CustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      keyword: '',
    };
  }

  componentWillMount() {
    //this.searchCustomer(this.props);
    this.getCustomer();
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  getTotal() {
    const {keyword} = this.state;

    fetch(process.env.REACT_APP_HOST+"/customer/total", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({keyword})
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
				this.setState({total: Math.ceil(data[1][0].total/listCount)})
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    });
  }

  getCustomer() {
    const {page, keyword} = this.state;

    fetch(process.env.REACT_APP_HOST+"/customer/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({page, keyword})
    })
    .then(response => {
      if (response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      let status = data[0];
      if (status === 200)
        this.setState({ data: data[1] });
      else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
      this.getTotal();
    })
  }

  searchCustomer(props) {
    let {keyword} = this.state;
    fetch(process.env.REACT_APP_HOST+`/customer/search/${keyword}`, {
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
      const status = data[0];
      if(status === 200) {
        if(data.length === 0) {
          alert('고객을 찾을 수 없습니다');
          props.close();
        }
        else
          this.setState({data: data[1]});
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')  
      }
    });
  }

  selectCustomer(data) {
    this.props.selectCustomer(data);
    this.props.close();
  }

  searchCustomer() {
    let {keyword} = this;
    this.setState({keyword, page: 1}, () => {
      this.getCustomer();
    })
  }

  countPageNumber(x){
    this.setState({
      page: x,
    }, () => {
      this.getCustomer();
    });
  }

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Order.css"></link>
        <div className="card">
          <div className="card-header">
            <Row>
              <Col><i className="icon-drop">고객 검색</i></Col>
              <Col>
                <InputGroup>
                  <Input onChange={(e) => { this.keyword = e.target.value }} />
                  <InputGroupAddon addonType="append">
                    <Button block color="primary" onClick={() => { this.searchCustomer() }}><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <Button block color="success" onClick={()=> {this.props.createCustomer();}}>신규</Button>
              </Col>
            </Row>
          </div>
          <div className="card-body customer-cardbody" style={{overflow: 'scroll'}} >
          <Table className="customer-modal" hover>
                  <thead>
                    <tr>
                      <th>고객명</th>
                      <th className="list-hidden">연락처1</th>
                      <th className="list-hidden">연락처2</th>
                      <th>주소</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.data.map(function (e, i) {
                        //console.warn(e);
                        return (
                          <tr style={{cursor: 'pointer'}} onClick={() => this.selectCustomer(e)} key={i}>
                            <td>{e.name}</td>
                            <td className="list-hidden">{e.cellphone}</td>
                            <td className="list-hidden">{e.telephone}</td>
                            <td>{e.address}</td>
                          </tr>
                        )
                      }, this)
                    }
                  </tbody>
                </Table>
          </div>
          <div style={{margin : 'auto'}}>
            <Pagination>
                  {this.state.page === 1 ? '' : 
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.page-1)}}/>
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
                <PaginationLink next onClick={() => {this.countPageNumber(this.state.page+1)}}/>
              </PaginationItem>}
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomerModal;
