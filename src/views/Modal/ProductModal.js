import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const listCount = 5;

class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      name: '',
      page: 1,
      family: 0,
    };
    this.name = '';
  }

  componentWillMount() {
    //this.searchProduct(this.props);
    this.getProduct();
    this.selectProduct = this.selectProduct.bind(this);
  }

  getTotal() {
    const {name, family} = this.state;

    fetch(process.env.REACT_APP_HOST + "/product/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          name, family
        }
      )
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          this.setState({ total: Math.ceil(data[1][0].total / listCount) })
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getProduct() {
    const {page, name, family} = this.state;
    fetch(process.env.REACT_APP_HOST + "/product/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          page, name, family
        }
      )
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
          this.setState({ productData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  searchProduct() {
    let {name} = this;
    //let keyword = this.keyword
    this.setState({name}, () => {
      this.getProduct();
    })
  }

  selectProduct(data) {
    this.props.selectProduct(data);
    this.props.close();
  }

  countPageNumber(x){
    this.setState({
      page: x,
    }, () => {
      this.getProduct();
      this.getTotal();
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
              <Col><i className="icon-drop">상품 검색</i></Col>
              <Col>
                <Input onChange={(e)=> {this.name = e.target.value}}z/>
              </Col>
              <Col xs='2'>
                <Button block color="primary" onClick={()=> {this.searchProduct()}}>검색</Button>
              </Col>
              <Col xs='2'>
                <Button block color="success" onClick={()=> {this.props.createProduct();}}>신규</Button>
              </Col>
            </Row>
          </div>
          <div className="card-body" style={{height: 500, overflow: 'scroll'}} >
          <Table hover>
                  <thead>
                    <tr>
                      <th>상품명</th>
                      <th>등급</th>
                      <th>무게</th>
                      <th>판매 단가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.productData.map(function (e, i) {
                        //console.warn(e);
                        return (
                          <tr style={{cursor: 'pointer'}} onClick={() => this.selectProduct(e)} key={i}>
                            <td>{e.name}</td>
                            <td>{e.grade}</td>
                            <td>{e.weight}</td>
                            <td>{e['price_shipping']}</td>
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

export default ProductModal;
