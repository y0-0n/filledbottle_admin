import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const listCount = 5;

class ProductModal extends Component {
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
    //this.searchProduct(this.props);
    this.getProduct();
    this.selectProduct = this.selectProduct.bind(this);
  }

  getTotal() {
    fetch(process.env.REACT_APP_HOST+"/product/total/"+this.state.keyword, {
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

  getProduct() {
    fetch(process.env.REACT_APP_HOST+`/product/`+this.state.number+'/'+this.state.keyword, {
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
          alert('로그인 하고 접근해주세요');
          this.props.login();
        }
        this.getTotal();
      })
  }
  searchProduct() {
    let {keyword} = this;
    //let keyword = this.keyword
    this.setState({keyword}, () => {
      this.getProduct();
    })
  }

  selectProduct(data) {
    this.props.selectProduct(data);
    this.props.close();
  }

  countPageNumber(x){
    this.setState({
      number: x,
    }, () => {
      this.getProduct();
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
                <Input onChange={(e)=> {this.keyword = e.target.value}}z/>
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

export default ProductModal;
