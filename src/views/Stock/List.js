import React, { Component } from 'react';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Card, CardBody, CardHeader, Col, Row, Button, Table, CardFooter, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import DatePicker from "react-datepicker";
import Popup from "reactjs-popup";
import PlantModal from '../Modal/PlantModal';


const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockData: [],
      plantData: [],
    };
  }

  getHistory() {
    const { plant } = this.props;
    const page = this.props.pageNumbers;

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
    const { plant } = this.props;
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
    }, () => {
      this.getHistory();
    })
  }

  countPageNumber(x) {
    this.setState({
    }, () => {
      this.getHistory();
    });
  }

  render() {
    const { plantData, stockData } = this.state;
    const plant = this.props.plant
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
                  <td style={{cursor: "pointer", backgroundColor: plant==='all' ? '#E6E6E6' : '#fff'}} onClick={() => { this.changePlant(this.props.checkPlant('all')) }}>전체</td>
                  {
                    plantData.map((e, i) => {
                      return (
                        <td style={{cursor: "pointer", backgroundColor: plant===e.id ? '#E6E6E6' : '#fff'}} onClick={() => { this.changePlant(this.props.checkPlant(e.id)) }}>{e.name}</td>
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
                            <img style={{ width: '90%' }} alt="품목 사진" src={d.file_name ? process.env.REACT_APP_HOST+"/static/" + d.file_name : '318x180.svg'} />
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
                <Pagination style={{justifyContent: 'center'}}>
                  {this.props.pageNumbers === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers-1))}}/>
                  </PaginationItem>
                  }
                  {this.props.pageNumbers === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.props.pageNumbers === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {this.props.pageNumbers !== 1 && this.props.pageNumbers!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.props.pageNumbers+e)
                    return (<PaginationItem key={i} active={this.props.pageNumbers === this.props.pageNumbers+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+e)); console.log(this.props.pageNumbers)}}>
                      {this.props.pageNumbers+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.props.pageNumbers === this.state.total ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+1))}}/>
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