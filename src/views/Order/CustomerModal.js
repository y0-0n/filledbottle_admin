import React, { Component } from 'react';
import { Table, Col, Row, Button, Input } from 'reactstrap';

class Modal2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    //this.searchCustomer(this.props);
    this.getCustomer();
    this.selectCustomer = this.selectCustomer.bind(this);
  }

  getCustomer() {
    fetch(process.env.REACT_APP_HOST+`/customer`, {
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
        this.props.history.push('/login')  
      }
    })
  }

  searchCustomer(props) {
    let {keyword} = props;
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

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <Row>
              <Col><i className="icon-drop">고객 검색</i></Col>
              <Col>
                <Input onChange={(e)=> {this.setState({keyword: e.target.value})}}z/>
              </Col>
              <Col xs lg='2'>
                <Button block color="primary" onClick={()=> {this.searchCustomer()}}>검색</Button>
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
        </div>
      </div>
    )
  }
}

export default Modal2;
