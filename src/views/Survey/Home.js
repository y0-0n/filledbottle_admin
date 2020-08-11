import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

const answer = [1, 1];

function Home(props) {
  const [survey] = useState(true)
  const [questionData, setQuestionData] = useState([])

  async function getQuestionList() {
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
          setQuestionData(data[1]);
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
    }

  useEffect(() => {
    getQuestionList()
  }, [])

  if (survey === false) {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Survey.css"></link>
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <div>설문조사</div>
              </CardHeader>
              <CardBody>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: 20 }}>
                    설문조사 시작하기
                  </div>
                  <div>
                    <Button color="primary" onClick={() => props.history.push('/main/survey')}>시작하기</Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  else {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Survey.css"></link>
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <Card>
              <CardHeader>
                <div>설문조사</div>
              </CardHeader>
              <CardBody>
                <div>
                  <div style={{ textAlign: 'center' }}>설문조사 결과</div>
                  <br></br>
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
