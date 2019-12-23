import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const listCount = 5;

class ProduceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      keyword: 'a',
      page: 1,
      number: 1,
    };
  }

  componentWillMount() {
    this.getList();
  }
  
  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/api/produce/total/"+this.state.keyword, {
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
          this.props.history.push('/login')
        }
      });
  }

  getList() {
    fetch(process.env.REACT_APP_HOST+"/api/produce/list/"+this.state.number+'/'+this.state.keyword, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getProduct();
    });
  }

  render() {
    console.log('AA')
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
          <Row>
              <Col><i className="icon-drop">영농일지 불러오기</i></Col>
              <Col>
                <Input onChange={(e)=> {this.keyword = e.target.value}}/>
              </Col>
              <Col xs='2'>
                <Button block color="primary" onClick={()=> {}}>생산품 검색</Button>
              </Col>
            </Row>
          </div>
          <div className="card-body" style={{ height: 500, overflow: 'scroll' }} >
            <Table hover>
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>생산품</th>
                  <th>생산수량</th>
                  <th>작업명</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(function (e, i) {
                    //console.warn(e);
                    return (
                      <tr style={{ cursor: 'pointer' }} onClick={() => { }} key={i}>
                        <td>{this.getDate(e.created_date)}</td>
                        <td>{e.productName}</td>
                        <td></td>
                        <td>{e.name}</td>
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

export default ProduceModal;
