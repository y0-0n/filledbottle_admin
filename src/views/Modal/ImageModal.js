import React, { Component } from 'react';
// import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class ImageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    this.getProduct();
  }

  getProduct() {
    fetch(process.env.REACT_APP_HOST + "/product/" + this.props.product_id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
      .then(response => response.json())
      .then(data => { this.setState({ data: data[0] }) });
  }

  render() {
    var data = this.state.data;
    return (
      <div>
          <img style={{ width: '90%' }} alt="품목 사진" src={data.file_name ? "http://211.62.225.216:4000/static/" + data.file_name : '318x180.svg'} />
      </div>
    )
  }
}

export default ImageModal;
