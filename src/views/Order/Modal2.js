import React, { Component } from 'react';
import { Table } from 'reactstrap';

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
      credentials: 'include',
      cache: 'no-cache',  
    })
      .then(response => response.json())
      .then(data => {
        this.setState({data});
      })
  }

  searchCustomer(props) {
    let {keyword} = props;
    fetch(process.env.REACT_APP_HOST+`/customer/search/${keyword}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-cache',  
    })
      .then(response => response.json())
      .then(data => {
        if(data.length === 0) {
          alert('고객을 찾을 수 없습니다');
          props.close();
        }
        else
          this.setState({data});
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
            <i className="icon-drop">고객 검색</i>
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
