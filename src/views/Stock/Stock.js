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
			useFamilyData: [],
			page: 1,
			family: 0,
			name: '',
			plant: 0
    };
  }

  componentWillMount() {
    this.getPlant();
	}
	
  getUseFamily() {//취급 품목 불러오기
    fetch(process.env.REACT_APP_HOST+"/api/product/familyInPlant/"+this.state.plant, {
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
			let status = data[0];
      if(status === 200){
				this.setState({useFamilyData: data[1]}, () => {
					this.getStock();
				});
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}
	
  getStock() {
		const {plant, page, family, name, useFamilyData} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/stock/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          plant, page, family, name, useFamilyData
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
      if(status === 200){
        this.setState({stockData: data[1]});
        this.getTotal();
      }
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

  getTotal() {
    const {name, family, plant} = this.state;

    fetch(process.env.REACT_APP_HOST + "/api/stock/list/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          name, family, plant
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
      if(status === 200){
				this.setState({plantData: data[1], plant: data[1][0].id});
				this.getUseFamily();
			}
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
			family: 0,
		}, () => {
			this.getUseFamily();
		})
  }
  
  countPageNumber(x) {
    this.setState({
      page: x,
    }, () => {
			this.getUseFamily();
    });
	}
	
	changeFamily (family) {
    //let keyword = this.keyword
    this.setState({ family, page: 1 }, () => {
			this.getStock();
    })
  }


  render() {
    let {stockData, plantData, useFamilyData} = this.state;
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
                  {/*<td style={{cursor: "pointer", backgroundColor: this.state.plant==='all' ? '#E6E6E6' : '#fff'}} onClick={() => {this.changePlant('all')}}>전체</td>*/}
                  {
                    plantData.map((e,i) => {
                      return (
                        <td key={i} className='list-plant' style={{backgroundColor: this.state.plant===e.id ? '#E6E6E6' : '#fff'}} onClick={() => {this.changePlant(e.id)}}>{e.name}</td>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
            <Card>
              <CardHeader>
								<Row>
									<Col>재고 관리</Col>
									<Col>
										<div style={{ float: "right" }}>
											<Button color="primary" onClick={() => { this.props.history.push('/stock/product/'+ this.state.plant) }}>품목 관리</Button>
											<Button color="primary" style={{ marginLeft: 10 }} onClick={() => { 
												this.props.history.push({
													pathname: '/stock/edit/'+this.state.plant,
												})}}>재고 실사</Button>
											<Button color="primary" style={{ marginLeft: 10 }} onClick={() => { this.props.history.push('/stock/transport') }}>창고 이동</Button>
											{/*<Popup
												trigger={<Button color="primary" style={{ marginLeft: 10 }}>창고 이동</Button>}
												modal>
												{close => <PlantModal close={close} login={() => { this.props.history.push('/login') }}
													selectProduct={(data) => {
													}}
												/>}
												</Popup>*/}                      
										</div>
									</Col>
								</Row>
              </CardHeader>
              <CardBody className="card-body">
								<Col>
                  <ul className="list-productfamily-ul" style={{width: '100%', display: 'flex', flexWrap: 'wrap', listStyleType: 'none', cursor: 'pointer'}}>
                    <li className="list-productfamily" style={{backgroundColor: this.state.family === 0? '#F16B6F' : 'transparent', border: this.state.family === 0? '0px' : '1px solid #c9d6de',color: this.state.family === 0? '#fff' : '#52616a', fontWeight: this.state.family === 0? 'bold' : 'normal', fontSize: this.state.family === 0? '1.1em' : '1em'}}onClick = {() => this.changeFamily(0)}>
                      전체
                    </li>
                    {
                      useFamilyData.map((e, i) => {
												console.warn(e)
                        return <li key={i} className="list-productfamily" style={{backgroundColor: this.state.family === e.family? '#F16B6F' : 'transparent', border: this.state.family === e.family? '0px' : '1px solid #c9d6de', color: this.state.family === e.family? '#fff' : '#52616a', fontWeight: this.state.family === e.family? 'bold' : 'normal', fontSize: this.state.family === e.family? '1.1em' : '1em'}}  onClick = {() => this.changeFamily(e.family)}>{e.name}</li>
                      })
                    }
                    {/*<Popup
                          trigger={<li className="list-productfamily" style={{border: '1px solid #c9d6de', color: 'lightgreen',}}>+</li>}
                          modal>
                          {close => <ProductFamilyModal close={close} login={() => { this.props.history.push('/login') }}
                    />}
                    </Popup>*/}
                      {/*<InputGroup>
                        <Input value={this.state.newFamily} onChange={(e) => {
                          let newFamily = e.target.value;
                          this.setState({ newFamily })
                        }} />
                        <InputGroupAddon addonType="append">
                          <Button onClick={this.addProductFamily.bind(this)} outline color="success">+</Button>
                        </InputGroupAddon>
                      </InputGroup>*/}
                  </ul>
                  </Col>
                <Table className="ListTable" hover>
                    <thead>
                      <tr>
												<th style={{ width: 150 }} className="list-hidden">사진</th>
                        <th>제품명</th>
												<th>창고</th>
                        <th>현 재고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.map((d) => {
                        return (
                          <tr style={{cursor: 'pointer'}} key={d.id}
													>
														<td className="list-hidden">
															<img style={{ width: '90%' }} alt="품목 사진" src={d.file_name ? "http://211.62.225.216:4000/static/" + d.file_name : '318x180.svg'} />
														</td>
                            <td onClick={() => {this.props.history.push(`/main/manage/stock/${d.product_id}`)}}>{d.name + " " + d.grade + " " + d.weight}</td>
                            <td>{d.plantName}</td>
                            <td>{d.quantity}</td>
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
