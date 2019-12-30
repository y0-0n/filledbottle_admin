import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink, InputGroup, InputGroupAddon } from 'reactstrap';

const listCount = 5;

class ProductFamilyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            keyword: 'a',
            page: 1,
            number: 1,
            familyData: []
        };
    }

    componentWillMount() {
        this.getProductFamily();
        this.selectProductFamily = this.selectProductFamily.bind(this);
    }

    getTotal() {
        fetch(process.env.REACT_APP_HOST + "/product/total/" + this.state.keyword, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
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
                    this.props.login();
                }
            });
    }

    getProductFamily() {
        fetch(process.env.REACT_APP_HOST + "/api/product/familyList", {
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
                    this.setState({ familyData: data[1] });
                else {
                    alert('로그인 하고 접근해주세요');
                    this.props.history.push('/login');
                }
            })
    }

    countPageNumber(x) {
        this.setState({
            number: x,
        }, () => {
            this.getProductFamily();
        });
    }

    selectProductFamily(data) {
        console.log(data)
        this.props.selectProductFamily(data);
        this.props.close();
    }

    addProductFamily() {
        let {newFamily} = this.state;
        fetch(process.env.REACT_APP_HOST + "/api/product/family", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
          body: JSON.stringify({newFamily})
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
          if (status === 200) {
            this.getProductFamily();
            this.setState({newFamily: ''})
          }
          else {
            alert('로그인 하고 접근해주세요');
            this.props.history.push('/login');
          }
        })
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
                                <Input onChange={(e) => { this.keyword = e.target.value }} z />
                            </Col>
                            <Col xs='2'>
                                <Button block color="primary" onClick={() => console.log('a')}>검색</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className="card-body" style={{ height: 500, overflow: 'scroll' }} >
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>품목군</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <InputGroup>
                                            <Input value={this.state.newFamily} onChange={(e) => {
                                                let newFamily = e.target.value;
                                                this.setState({ newFamily })
                                            }} />
                                            <InputGroupAddon addonType="append">
                                                <Button onClick={this.addProductFamily.bind(this)} outline color="success">추가하기</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </td>
                                </tr>
                                {this.state.familyData.map((e, i) => {
                                    return (
                                    <tr style={{ cursor: 'pointer' }} onClick={() => this.selectProductFamily(e)} key={i}>
                                        <td>{e.name}</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <Pagination>
                            {this.state.number === 1 ? '' :
                                <PaginationItem>
                                    <PaginationLink previous onClick={() => { this.countPageNumber(this.state.number - 1) }} />
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
                                    <PaginationLink next onClick={() => { this.countPageNumber(this.state.number + 1) }} />
                                </PaginationItem>}
                        </Pagination>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductFamilyModal;
