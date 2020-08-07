import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge } from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      orderData: [],
    };
  }
  componentWillMount() {
    this.getDetail();
    this.getCustomerOrder();
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST + "/customer/" + this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => { this.setState({ data: data[0] }) });
  }

  deactivateCustomer(id) {
    let c = window.confirm('이 고객을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer/deactivate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
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
            this.getDetail()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
				});
    }
  }

  getCustomerOrder() {
    fetch(process.env.REACT_APP_HOST + "/api/customer/getOrder", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ customer: this.props.match.params.id })
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
          this.setState({ orderData: data[1] })
        } else if (status === 401) {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
  }

  activateCustomer(id) {
    let c = window.confirm('이 고객을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer/activate", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
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
            this.getDetail()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  render() {
    let { data, orderData } = this.state;
    console.log(data)
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/CustomerDetail.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>거래처 상세</Col>
                  <Col>
                    <div style={{ float: "right" }}>
                      <Button color="primary" onClick={() => { this.props.history.goBack() }}>뒤로가기</Button>
                      <Button color="primary" onClick={() => { this.props.history.push(`/main/customer/edit/${this.props.match.params.id}`) }} style={{marginLeft : '10px'}}>수정</Button>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="ShowTable">
                  <tbody>
                    <tr>
                      <th>고객명</th>
                      <td>
                        {data.name}
                      </td>
                    </tr>
                    <tr>
                      <th>상태</th>
                      <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                    </tr>
                    <tr>
                      <th>연락처 1</th>
                      <td>
                        {data.cellphone}
                      </td>
                    </tr>
                    <tr>
                      <th>연락처 2</th>
                      <td>
                        {data.telephone==="undefined" ?'': data.telephone }
                      </td>
                    </tr>
                    <tr>
                      <th>사업자등록번호</th>
                      <td>
                        {data.crNumber==="undefined" ? '' : data.crNumber}
                      </td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td>
                        {data.address} {data.address_detail} ({data.postcode})
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>
                주문 목록
              </CardHeader>
              <CardBody>
                <Table className="orderlist-table">
                  <tr>
                    <th>이름</th>
                    <th>수량</th>
                    <th>가격</th>
                  </tr>
                  {
                    orderData.map((e, i) => {
                      return <tr>
                        <td>{e.name}</td>
                        <td>{e.quantity}</td>
                        <td>{e.sum}</td>
                      </tr>
                    })
                  }
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

export default Detail;