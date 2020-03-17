import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Button, Table, Badge } from 'reactstrap';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
		this.getDetail();
		this.getCustomerOrder();
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST+"/customer/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => response.json())
      .then(data => {this.setState({data: data[0]})});
  }

  deactivateCustomer(id) {
    let c = window.confirm('이 고객을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST+"/customer/deactivate", {
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
        .then(response => response.json())
        .then(_ => {this.getCustomer()});
    }
	}
	
	getCustomerOrder() {
		fetch(process.env.REACT_APP_HOST+"/api/customer/getOrder", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({customer: this.props.match.params.id})
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
				console.warn(data[1])
			} else if(status === 401) {
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
    let {data} = this.state;
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
                  <div style={{float: "right"}}>
                    <Button color="primary" onClick={() => {this.props.history.push(`/main/customer/edit/${this.props.match.params.id}`)}}>수정</Button>
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
                    <th>상태</th>
                    <td>{data.set ? <Badge color="primary">활성화</Badge> : <Badge color="danger">비활성화</Badge>}</td>
                  </tr>
                  <tr>
                    <th>핸드폰번호</th>
                    <td>
                      {data.cellphone}
                    </td>
                    <th>전화번호</th>
                    <td>
                      {data.telephone}
                    </td>
                  </tr>
                  <tr>
                    <th>사업자등록번호</th>
                    <td>
                      {data.crNumber}
                    </td>
                    <th>주소</th>
                    <td>
                      {data.address}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
            <CardFooter>
              <Row>
                <Col>
                {
                  data.set ? 
                  <Button block style={{ width: 120 }} color="ghost-danger" onClick={() => this.deactivateCustomer(this.props.match.params.id)}>고객 비활성화</Button> : 
                  <Button block style={{ width: 100 }} color="ghost-primary" onClick={() => this.activateCustomer(this.props.match.params.id)}>고객 활성화</Button>
                }
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Col>
        </Row>
      </div>
    )
  }
}

export default Detail;