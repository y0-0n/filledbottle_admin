import React, { Component } from 'react';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Card, CardBody, CardHeader, Col, Row, Input, InputGroupAddon, Button, Nav, NavItem, NavLink, Table, CardFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import PlantModal from '../Modal/PlantModal';


const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      plantData: [],
      page: 1,
      plant: 'all',
    };
  }

  getHistory() {
    const { page, plant } = this.state;

    const limit = 15;

    fetch(process.env.REACT_APP_HOST + "/api/stock/history", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ page, limit, plant })
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
          let stockData = data[1];
          this.setState({ stockData })
          this.getTotal();
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  getTotal() {
    const { plant } = this.state;
    fetch(process.env.REACT_APP_HOST + "/api/stock/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          plant
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

  getPlant() {
    fetch(process.env.REACT_APP_HOST + "/api/plant", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
          this.setState({ plantData: data[1] });
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
    var year = d.getFullYear(), month = d.getMonth() + 1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  changePlant(id) {
    this.setState({
      plant: id,
      page: 1,
    }, () => {
      this.getHistory();
    })
  }

  countPageNumber(x) {
    this.setState({
      page: x,
    }, () => {
      this.getHistory();
    });
  }

  render() {
    const { plantData, stockData } = this.state;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Stock.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Table className="category-top">
              <tbody>
                <tr>
                  <td onClick={() => { this.changePlant('all') }}>전체</td>
                  {
                    plantData.map((e, i) => {
                      return (
                        <td onClick={() => { this.changePlant(e.id) }}>{e.name}</td>
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
                      <Button color="primary" onClick={() => { this.props.history.push('/stock/create') }}>재고 등록</Button>
                      {<Popup
                        trigger={<Button color="primary" style={{ marginLeft: 10 }}>창고 이동</Button>}
                        modal>
                        {close => <PlantModal close={close} login={() => { this.props.history.push('/login') }} createProduct={() => { this.props.history.push('/product/create') }}
                          selectProduct={(data) => {
                          }}
                        />}
                      </Popup>}
                      
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="card-body">
                <Table className="ListTable">
                  <thead>
                    <tr>
                      <th style={{ width: 150 }} className="list-hidden">사진</th>
                      <th>날짜</th>
                      <th>제품명</th>
                      <th>창고</th>
                      <th className="list-hidden">변동</th>
                      <th>재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockData.map((d, i) => {
                      return (
                        <tr style={{ cursor: 'pointer', height: "150px" }} key={i}>
                          <td className="list-hidden">
                            <img style={{ width: '90%' }} alt="품목 사진" src={d.file_name ? "http://211.62.225.216:4000/static/" + d.file_name : '318x180.svg'} />
                          </td>
                          <td>{this.getDate(d.changeDate)}</td>
                          <td onClick={() => { this.props.history.push(`/main/stock/${d.product_id}`) }}>{d.name + " " + d.grade + " " + d.weight}</td>
                          <td>{d.plantName}</td>
                          <td className="list-hidden">{d.change}</td>
                          <td>{d.quantity - d.change} -> {d.quantity}</td>
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

export default List;