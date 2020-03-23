import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table } from 'reactstrap';
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import ProductModal from '../Modal/ProductModal';
import Popup from "reactjs-popup";

class Create extends Component {
  constructor(props) {
    super(props);
    this.form = {
      productId : 0,
      quantity: 0,
			start: 0,
			dest: 0,
			quantity: 0,
    };

    this.state = {
			name: '',
			plantData: [],
			current1: 0,
			current2: 0,
			productFamily: 0
    };
  }

  componentWillMount() {
		//this.getPlant();
	}
	
  createStock() {
		fetch(process.env.REACT_APP_HOST+"/api/stock", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(this.form)
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
        this.props.history.push('/main/stock');
      } else if(status === 401) {
        alert('로그인 하고 접근해주세요.')
        this.props.history.push('/login')
      } else {
        alert('에러로 인해 등록에 실패했습니다.')
      }
    });
  }

	getPlant(){
		const {productFamily} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/plant/searchPlant", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
      body: JSON.stringify({productFamily})
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
        if(data[1][0] === undefined) alert("창고에서 품목을 취급하지 않습니다")
          else {
                this.setState({plantData: data[1]});
                this.form.start = data[1][0].id;
								this.form.dest = data[1][0].id;
								this.getLastStock(this.form.start, "start");
								this.getLastStock(this.form.dest, "dest");				
          }
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}

	getFamilyId(id){
    fetch(process.env.REACT_APP_HOST+"/api/product/familyId/"+id, {
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
				this.setState({productFamily: data[1][0].id}, () => {
					this.getPlant();
				})
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}
	
	getLastStock(plant, flag) {
		fetch(process.env.REACT_APP_HOST+"/api/stock/last/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({plant, productId: this.form.productId})
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
				if(flag === "start")
					this.setState({current1: data[1].current});
				else if(flag === "dest")
					this.setState({current2: data[1].current});
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}

	transportStock() {
		const {start, dest, productId, quantity} = this.form;
		const {current1, current2} = this.state;

		fetch(process.env.REACT_APP_HOST+"/api/stock/transport/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({start, dest, productId, quantity, current1, current2})
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
				if(data[1].msg === 'same plant') {
					alert("현재 위치한 창고로 이동할 수 없습니다.")
				}
				this.props.history.push('/main/stock')
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
	}

  render() {
		const {plantData} = this.state;
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col md="9" lg="9" xl="8">
						<Card>
							<CardHeader>
									재고 이동
							</CardHeader>
							<CardBody>
								<Table className="ShowTable">
									<tbody>
										<tr>
											<th>품목명</th>
											<td>
												{<Popup
													trigger={<Input value={this.state.name} onChange={(e) => this.form.name = e.target.value} />}
													modal>
													{close => <ProductModal close={close} login={() => { this.props.history.push('/login') }} createProduct={() => { this.props.history.push('/product/create') }}
														selectProduct={(data) => {
															this.setState({name : data['name']})
															this.form.productId = data['id'];;
															this.getFamilyId(data['id']);
														}}
													/>}
												</Popup>}
											</td>
										</tr>
										<tr>
											<th>현재 창고</th>
											<td>
												<Input onChange={(e) => {this.form.start = e.target.value; if(this.form.productId!==0) this.getLastStock(this.form.start, "start");}} type='select'>
													{
														plantData.map((e,i) => {
															return (
																<option key={i} value={e.id}>{e.name}</option>
															)
														})
													}
												</Input>
											</td>
											<th>현재 창고 재고</th>
											<td>
												{this.state.current1}
											</td>
										</tr>
										<tr>
											<th>받는 창고</th>
											<td>
												<Input onChange={(e) => {this.form.dest = e.target.value; if(this.form.productId!==0) this.getLastStock(this.form.dest, "dest");}} type='select'>
													{
														plantData.map((e,i) => {
															return (
																<option key={i} value={e.id}>{e.name}</option>
															)
														})
													}
												</Input>
											</td>
											<th>받는 창고 재고</th>
											<td>
												{this.state.current2}
											</td>
										</tr>
										<tr>
											<th>이동량</th>
											<td>
												<Input onChange={(e) => this.form.quantity = e.target.value} />
											</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
							<CardFooter>
								<Button block outline color="primary" onClick={() => {this.transportStock();}}>추가하기</Button>
							</CardFooter>
						</Card>
					</Col>
        </Row>
      </div>
    )
  }
}

export default Create;

