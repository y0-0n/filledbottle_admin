import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input, Pagination, PaginationItem, PaginationLink, CardFooter } from 'reactstrap';
import Popup from "reactjs-popup";
import PlantModal from '../Modal/PlantModal';

const listCount = 15;

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
			stockData: [],
			plantData: [],
			page: 1,
			family: 0,
			name: '',
			plant: 'all'
    };
  }

  componentWillMount() {
		this.getStock();
		this.getPlant();
  }

  getStock() {
		const {plant, page, family, name} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/stock/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          plant, page, family, name
        }
      )
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      let status = data[0];
      if(status === 200)
        this.setState({stockData: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
      this.getTotal();
    });
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

  modifyStock(id, quantity) {
    fetch(process.env.REACT_APP_HOST+`/api/stock/`+id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          quantity
        }
      )
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
      if(status === 200)
        alert('등록됐습니다.');
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    })
	}
	
	getPlant(){
    fetch(process.env.REACT_APP_HOST+"/api/plant", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
			let status = data[0];
      if(status === 200)
        this.setState({plantData: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}

	changePlant(id) {
		this.setState({
			plant: id,
			page: 1,
		}, () => {
			this.getStock();
		})
  }
  
  countPageNumber(x) {
    this.setState({
      page: x,
    }, () => {
      this.getStock();
    });
  }

  render() {
    let {stockData, plantData} = this.state;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
						<Table className="category-top">
              <tbody>
                <tr>
                  <td style={{cursor: "pointer", backgroundColor: this.state.plant==='all' ? '#E6E6E6' : '#fff'}} onClick={() => {this.changePlant('all')}}>전체</td>
                  {
                    plantData.map((e,i) => {
                      return (
                        <td style={{cursor: "pointer", backgroundColor: this.state.plant===e.id ? '#E6E6E6' : '#fff'}} onClick={() => {this.changePlant(e.id)}}>{e.name}</td>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
            <Card>
              <CardHeader>
                  <Row>
                    <Col>재고 실사</Col>
                    <Col>
                      <div style={{float: "right"}}>
                        <Button color="primary">완료</Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="card-body">
                  <Table className="ListTable">
                    <thead>
                      <tr>
                        <th width="800">품목명</th>
                        <th>재고</th>
                        <th>실제 재고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.map((d, i) => {
                        return (
                          <tr style={{ cursor: 'pointer', height: "150px" }} key={i}>
                            <td onClick={() => { this.props.history.push(`/main/stock/${d.product_id}`) }}>{d.name + " " + d.grade + " " + d.weight}</td>
                            <td>{d.quantity}</td>
                            <td><Input defaultValue={d.quantity} style={{width : "150px"}} ></Input></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                <Pagination style={{ justifyContent: 'center' }}>
                  {this.state.page === 1 ? '' :
                    <PaginationItem>
                      <PaginationLink previous onClick={() => { this.countPageNumber(this.state.page - 1) }} />
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
                      <PaginationLink next onClick={() => { this.countPageNumber(this.state.page + 1) }} />
                    </PaginationItem>}
                </Pagination>
              </CardFooter>
                
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Stock;
