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
    this.searchProduct(this.props);
    this.selectProduct = this.selectProduct.bind(this);
  }

  searchProduct(props) {
    let {keyword} = props;
    fetch(process.env.REACT_APP_HOST+`/product/search/${keyword}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if(data.length === 0) {
          alert('제품을 찾을 수 없습니다');
          props.close();
        }
        else
          this.setState({data});
      });
  }

  selectProduct(data) {
    this.props.test(data);
    this.props.close();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop">거래처 검색</i>
          </div>
          <div className="card-body">
          <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>품명</th>
                      <th>출고가</th>
                      <th>입고가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.data.map(function (e, i) {
                        //console.warn(e);
                        return (
                          <tr onClick={() => this.selectProduct(e)} key={i}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.price_shipping}</td>
                            <td>{e.price_receiving}</td>
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
