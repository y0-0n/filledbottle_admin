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
			plant: this.props.match.params.id
		};
  }

  componentWillMount() {
		this.getStock();
  }

  getStock() {
		const {plant, family, name} = this.state;
    fetch(process.env.REACT_APP_HOST+"/api/stock/list2", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          plant, family, name
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
			}
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

  modifyStock(id, quantity) {
    /*fetch(process.env.REACT_APP_HOST+`/api/stock/`+id, {
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
		})*/
		console.warn(this.state.stockData)
		/*this.props.history.push('/main/stock');*/
	}
	
  render() {
    let {stockData} = this.state;
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                  <Row>
                    <Col>재고 실사</Col>
                    <Col>
                      <div style={{float: "right"}}>
                        <Button color="primary" onClick={() => {this.modifyStock();}}>완료</Button>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="card-body">
                  <Table className="ListTable">
                    <thead>
                      <tr>
                        <th>품목명</th>
                        <th>전산 재고</th>
                        <th>실제 재고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockData.map((d, i) => {
                        return (
                          <tr key={i}>
                            <td>{d.name + " " + d.grade + " " + d.weight}</td>
                            <td>{d.quantity}</td>
                            <td><Input value={d.quantity} onChange={(e) => {
														}} style={{width : "150px"}} ></Input></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter>
              </CardFooter>
                
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Stock;
