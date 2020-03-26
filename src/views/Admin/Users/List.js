import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const listCount = 15;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
			userData : [],
			page: 1,
    };
  }

  componentWillMount() {
		this.getList();
	}
	
	getList() {
		const {page} = this.state;
		
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/list/", {
      method: 'POST',
      headers: {
				'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
			},
			body: JSON.stringify({page})
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
          this.setState({ userData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
	}
	
  getTotal() {
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/total/", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
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
  countPageNumber(x) {
    this.setState({
      page: x,
    }, () => {
      this.getList();
    });
  }

  render() {
		const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];

    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                회원 목록
              </CardHeader>
              <CardBody>
                <Table>
                  <tbody>
                    <tr style={{backgroundColor: "#F5F5F5"}}>
                      <th>#</th>
                      <th>이름</th>
                      <th>아이디( 이메일 )</th>
                      <th>전화번호</th>
                      <th>주소</th>
                      <th>사업자 등록번호</th>
                    </tr>
                      {
                        this.state.userData.map((e, i) => {
                          return <tr key={i} onClick={() => {this.props.history.push('/admin/users/detail/'+e.id)}}>
                            <td>{e.id}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.phone}</td>
                            <td>{e.address}</td>
                            <td>{e.crNumber}</td>
                          </tr>
                        })
                      }
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

export default UserList;

