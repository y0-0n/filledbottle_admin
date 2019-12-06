import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const listCount = 5;

class CustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      number: 1,
      keyword: 'a',
    };
  }

  componentWillMount() {
    //this.searchCustomer(this.props);
    this.getCustomer();
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/customer/total/"+this.state.keyword, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
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
          this.props.login();
        }
      });
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+`/customer/`+this.state.number+'/'+this.state.keyword, {
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
        this.setState({data: data[1]});
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.login();
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
    this.setState({keyword}, () => {
      this.getCustomer();
    })
  }

  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getCustomer();
    });
  }

  render() {
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <Row>
              <Col><i className="icon-drop">고객 검색</i></Col>
              <Col>
                <Input onChange={(e)=> {this.keyword = e.target.value}}z/>
              </Col>
              <Col xs lg='2'>
                <Button block color="primary" onClick={()=> {this.searchCustomer()}}>검색</Button>
              </Col>
              <Col xs='2'>
                <Button block color="success" onClick={()=> {this.props.createCustomer();}}>신규</Button>
              </Col>
            </Row>
          </div>
          <div className="card-body" style={{height: 500, overflow: 'scroll'}} >
          <Table hover>
                  <thead>
                    <tr>
                      <th>고객명</th>
                      <th>전화번호</th>
                      <th>HP</th>
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
                            <td>{e.telephone}</td>
                            <td>{e.cellphone}</td>
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
                  {this.state.number === 1 ? '' : 
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.state.number-1)}}/>
                  </PaginationItem>
                  }
              {this.state.number === 1 ? arr.forEach(x => arr1.push(x + 2)) : null}
              {this.state.number === 2 ? arr.forEach(x => arr1.push(x + 1)) : null}
              {this.state.number !== 1 && this.state.number !== 2 ? arr.forEach(x => arr1.push(x)) : null}
              {arr1.map((e, i) => {
                if (this.state.total >= this.state.number + e)
                  return (<PaginationItem key={i} active={this.state.number === this.state.number + e}>
                    <PaginationLink onClick={() => { this.countPageNumber(this.state.number + e) }}>
                      {this.state.number + e}
                    </PaginationLink>
                  </PaginationItem>)
                return null;
              })}
              {this.state.number === this.state.total ? '' : 
              <PaginationItem>
                <PaginationLink next onClick={() => {this.countPageNumber(this.state.number+1)}}/>
              </PaginationItem>}
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomerModal;
