/* global naver */
import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

const answer = [1, 1];

class UserListDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [[]],
      familyData: [],
      questionData: [],
    }
  }
  initMap() {
    var contentString = [
      '<div class="iw_inner" style="padding: 10px;">',
      `<h4>${this.state.roadAddress}</h4>`,
      `<div>> ${this.state.jibunAddress}</div>`,
      '</div>'
    ].join('');

    let map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(this.state.y, this.state.x),
      zoom: 18
    });

    let marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(this.state.y, this.state.x),
    });

    var infowindow = new naver.maps.InfoWindow({
      content: contentString,
      //maxWidth: 140,
      borderColor: "lightgrey",
      borderWidth: 2,
      anchorSize: new naver.maps.Size(20, 20),
      anchorSkew: true,
      pixelOffset: new naver.maps.Point(20, -20),
    });  

    naver.maps.Event.addListener(marker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
  }

  getDetail() {
    fetch(process.env.REACT_APP_HOST +"/api/admin/users/detail/"+this.props.match.params.id, {
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
        if (status === 200){
					this.setState({ data: data[1][0] });
					if(data[1][0].address !== " ")//주소 띄어쓰기는 회원가입 페이지에서 '주소 띄어쓰기 생기는 부분' 참고 
						this.getCoord();
				}
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/productFamily/" + this.props.match.params.id, {
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
        if (status === 200) {
          this.setState({familyData: data[1]})
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
	}

	getProduct() {
    fetch(process.env.REACT_APP_HOST + "/api/admin/users/detail/product/" + this.props.match.params.id, {
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
        if (status === 200) {
          this.setState({productData: data[1]})
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
	}

	
	getCoord() {
    fetch(process.env.REACT_APP_HOST + `/api/geocode/?query=${this.state.data.address}`, {
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
        if (status === 200) {
					if(data[1].addresses.length > 0){
						this.setState({x: data[1].addresses[0].x, y: data[1].addresses[0].y}, () => {
							this.initMap();
						});
					} else {
						alert("지도를 불러올 수 없습니다.")
					}
				}
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
	}

  tabClick(category) {
    this.setState({
      category,
    }, () => {
      this.getAllFamily();
    });
  }

  getQuestionList() {
    fetch(process.env.REACT_APP_HOST + "/api/survey/", {
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
          this.setState({ questionData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  componentWillMount() {
    this.getDetail();
    this.getProductFamily();
    this.getQuestionList();
  }

  render() {
    const { data, familyData, questionData } = this.state;
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/RegisterDetail.css"></link>
        <Row>
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>회원 정보</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="ShowTable">
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>
                        {data.name}
                      </td>
                      <th>아이디</th>
                      <td>
                        {data.email}
                      </td>
                    </tr>
                    <tr>
                      <th>전화번호</th>
                      <td>
                        {data.phone}
                      </td>
                      <th>사업자등록번호</th>
                      <td>
                        {data.crNumber}
                      </td>
                    </tr>
                    <tr>
                      <th>주소</th>
                      <td colSpan="3">
                        {data.address}
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
                지도
              </CardHeader>
              <CardBody>
                <div id="map" style={{width:"100%", height:"400px"}}></div>
              </CardBody>
            </Card>
          </Col>

          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>취급 품목</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div>
                  <ul className="ul-productFamily" style={{ listStyleType: "none", }}>
                    {familyData.map((e, i) => {
                      return (
                        <li key={i} className="list-productFamily" style={{
                          color: '#fff',
                          backgroundColor: '#20A8D8',
                        }}>{e.name}</li>
                      )
                    }
                    )}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>설문조사 결과</Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div>
                  <ul className="ul-questionList" style={{ listStyleType: "none", }}>
                      {questionData.map((e, i) => {
                        return (
                          <li key={i} className="list-questionList" style={{ lineHeight: "2em" }}>
                            <div style={{ fontWeight: "bolder" }}>
                              <span>질문</span>
                              <span>{i+1}</span>
                              <span> : </span>
                              <span>{e.question}</span>
                            </div>
                            <div>
                              <span style={{ paddingLeft: "65px"}}>
                                {e['answer'+answer[i]]}
                              </span>
                            </div>
                          </li>
                        )
                      }
                      )}
                    </ul>
                </div>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}

export default UserListDetail;