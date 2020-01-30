import React, { Component } from 'react';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Card, CardBody, CardHeader, Col, Row, Input, InputGroupAddon, Button, Nav, NavItem, NavLink, Table, CardFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DatePicker from "react-datepicker";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
			stockData: [],
			plantData: []
    };
  }

	getHistory(){
    const page = 1, limit = 15;

    fetch(process.env.REACT_APP_HOST+"/api/stock/history", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({page, limit})
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
      if(status === 200) {
				let stockData = data[1];
        this.setState({stockData})
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
      if(status === 200)
        this.setState({plantData: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }
  componentWillMount() {
		this.getHistory();
		this.getPlant();
	}
	
  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
		const {plantData} = this.state;
    return (
      <div className="animated fadeIn">
				<link rel="stylesheet" type="text/css" href="css/Table.css"></link>
				<link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
				<Row>
          <Col md="12" xs="12" sm="12">
            <Table className="category-top">
              <tbody>
                <tr>
                  <td>전체</td>
                  {
                    plantData.map((e,i) => {
                      return (
                        <td>{e.name}</td>
                      )
                    })
                  }
                </tr>
              </tbody>
            </Table>
            <Card>
              <CardHeader>
                재고 기록
              </CardHeader>
              <CardBody className="card-body">
                <Table>
									<thead>
										<tr>
											<th style={{ width: 150 }}>사진</th>
											<th>날짜</th>
											<th>제품명</th>
											<th>등급</th>
											<th>무게</th>
											<th>변동</th>
											<th style={{ width: 150 }}>재고</th>
										</tr>
									</thead>
									<tbody>
										{this.state.stockData.map((d) => {
											return (
												<tr style={{cursor: 'pointer'}} key={d.id} onClick={() => {this.props.history.push(`/main/stock/${d.product_id}`)}}>
													<td>
														<img style={{ width: '90%' }} alt="품목 사진" src={d.file_name ? "http://211.62.225.216:4000/static/" + d.file_name : '318x180.svg'} />
													</td>
													<td>{this.getDate(d.changeDate)}</td>
													<td>{d.name}</td>
													<td>{d.grade}</td>
													<td>{d.weight}</td>
													<td>{d.change}</td>
													<td>{d.quantity - d.change} -> {d.quantity}</td>
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

export default List;