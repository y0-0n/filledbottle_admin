import React, { useState } from 'react';
import { Button, Row, Col, Card, CardFooter, CardHeader, CardBody } from 'reactstrap';

function Home(props) {
  const [survey, setSurvey] = useState(true)

  if (survey === true) {
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
                <div style={{ textAlign: 'center' }}>
                  <div>설문조사 결과 페이지</div>
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
