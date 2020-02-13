import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, Input } from 'reactstrap';
import Popup from "reactjs-popup";
import PlantModal from '../Modal/PlantModal';

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

  render() {
    let {stockData, plantData} = this.state;
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
						<Table className="category-top">
              <tbody>
                <tr>
                  <td onClick={() => {this.changePlant('all')}}>전체</td>
                  {
                    plantData.map((e,i) => {
                      return (
                        <td onClick={() => {this.changePlant(e.id)}}>{e.name}</td>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
            <Card>
              <CardHeader>
								<Row>
									<Col>재고 기록</Col>
									<Col>
										<div style={{ float: "right" }}>
											<Button color="primary" onClick={() => { this.props.history.push('/stock/create') }}>재고 실사</Button>
											{<Popup
												trigger={<Button color="primary" style={{ marginLeft: 10 }}>창고 이동</Button>}
												modal>
												{close => <PlantModal close={close} login={() => { this.props.history.push('/login') }}
													selectProduct={(data) => {
													}}
												/>}
											</Popup>}                      
										</div>
									</Col>
								</Row>
              </CardHeader>
              <CardBody className="card-body">
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
                          <tr style={{cursor: 'pointer'}} key={d.id}>
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
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Stock;
