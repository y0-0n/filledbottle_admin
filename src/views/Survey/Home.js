import React, { Component } from 'react';
import { Button, Row, Col, Card, CardFooter, CardHeader, CardBody } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
			surveyStart: true,
    };
  }

  render() {
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
                {this.state.surveyStart ? 
                  <div style={{textAlign : 'center'}}>
                    <div style={{marginBottom : 20}}>
                      설문조사 시작하기
                    </div>
                    <div>
                      <Button color="primary" onClick={() => this.props.history.push('/main/survey')}>시작하기</Button>
                    </div>
                  </div> 
                  :
                  <div style={{textAlign: 'center'}}>
                    <div>설문조사 결과 페이지</div>
                  </div>
                }
              </CardBody>

            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
