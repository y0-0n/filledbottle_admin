import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    //this.searchProduct(this.props);
    this.getProduct();
    this.selectProduct = this.selectProduct.bind(this);
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST+`/product`, {
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
  searchProduct(props) {
    let {keyword} = props;
    fetch(process.env.REACT_APP_HOST+`/product/search/${keyword}`, {
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
          alert('제품을 찾을 수 없습니다');
          props.close();
        }
        else
          this.setState({data: data[1]});
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')  
      }
    })
  }

  selectProduct(data) {
    this.props.selectProduct(data);
    this.props.close();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop">상품 검색</i>
          </div>
          <div className="card-body" style={{height: 500, overflow: 'scroll'}} >
          <Table hover>
                  <thead>
                    <tr>
                      <th>상품명</th>
                      <th>등급</th>
                      <th>무게</th>
                      <th>단가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.data.map(function (e, i) {
                        //console.warn(e);
                        return (
                          <tr style={{cursor: 'pointer'}} onClick={() => this.selectProduct(e)} key={i}>
                            <td>{e.name}</td>
                            <td>{e.grade}</td>
                            <td>{e.weight}</td>
                            <td>{e.price_shipping}</td>
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

export default Modal;
