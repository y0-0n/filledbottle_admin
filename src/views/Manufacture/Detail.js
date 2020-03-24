import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Row, Table, Button, Badge } from 'reactstrap';
import { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko)

//vos = value of supply (공급가액)
//vat = value added tax (부가세))
let d = {id: '', name: '', grade:'', weight:'', price: 0, quantity: 0};

class Detail extends Component {
  constructor(props) {
    super(props);

    this.customer = [];

    this.state = {
			info: [],
      sProduct1: [d],//소모 상품
			sProduct2: [d],//생산 상품
    };
  }

  componentWillMount() {
    this.getDetail();
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST+"/api/manufacture/"+this.props.match.params.id, {
      method: 'GET',
      headers: {
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
          this.setState({ sProduct1: data[1].consume, sProduct2: data[1].produce, info: data[1].info[0]});
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
	}

	cancel() {
		const {sProduct1, sProduct2} = this.state;

		fetch(process.env.REACT_APP_HOST+"/api/manufacture/cancel/"+this.props.match.params.id, {
      method: 'PUT',
      headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({sProduct1, sProduct2})
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
				if (status === 200){
					alert('취소됐습니다.');
					this.getDetail();
				}
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
	}

  getDate(dateInput) {
    var d = new Date(dateInput);
    var year = d.getFullYear(), month = d.getMonth()+1, date = d.getDate();

    return year + "년 " + month + "월 " + date + "일";
  }

  render() {
		const {info} = this.state
		console.warn(this.state.sProduct1, this.state.sProduct2);
    return (
      <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/ManufactureDetail.css"></link>
        <Row>
				<Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">제조 정보</Col>
                </Row>
              </CardHeader>
              <CardBody>
								<Table className="ShowTable">
									<tbody>
										<tr>
											<th>제품명</th>
											<td>{info.title}</td>
											<th>일자</th>
											<td className="TableRight">{this.getDate(info.date)}</td>
										</tr>
										<tr>
											<th>총 생산량</th>
											<td>{info.total}</td>
											<th>상태</th>
											<td className="TableRight">{info.set ? <Badge color="primary">처리</Badge> : <Badge color="danger">취소</Badge>}</td>
										</tr>
									</tbody>
                </Table>
              </CardBody>
              <CardFooter>
                  {/*<Button onClick={() => {this.props.history.push(`/main/manufacture/edit/`+this.props.match.params.id)}} style={{marginLeft : '10px'}}>수정</Button>*/}
                  {info.set ? <Button onClick={() => {this.cancel()}} style={{marginLeft : '10px'}}>제조 취소</Button> : null}
              </CardFooter>
            </Card>
          </Col>
          <Col md="12" xs="12" sm="12">
          <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">소모 상품</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                        <th>상품명</th>
                        <th>창고</th>
                        <th>단가</th>
                        <th>소모재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.sProduct1.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>{e.name}</td>
                            <td>{this.state.sProduct1[i].plantName}</td>
                            <td>{this.state.sProduct1[i].price_shipping}</td>
                            <td>{this.state.sProduct1[i].change}</td>
                          </tr>
                        )
                      }, this)

                    }
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          </Col>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col md="10" xs="10" sm="10">생산 상품</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead>
                    <tr>
                        <th>상품명</th>
                        <th>창고</th>
                        <th>단가</th>
                        <th>생산재고</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.sProduct2.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>{this.state.sProduct2[i].name}</td>
                            <td>{this.state.sProduct2[i].plantName}</td>
                            <td>{this.state.sProduct2[i].price_shipping}</td>
                            <td>{this.state.sProduct2[i].change}</td>
                          </tr>
                        )
                      }, this)
                    }
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

export default Detail;
