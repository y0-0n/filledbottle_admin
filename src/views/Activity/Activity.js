import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table,} from 'reactstrap';
import '../../css/Table.css';

class Activity extends Component {
  constructor(props) {
    super(props);
      this.state = {
      };
  }

  componentWillMount() {
  }

  render() {
    return (<div className="animated fadeIn">
    <Row className="mb-5">
      <Col md="8" xs="6" sm="6">
        <Input onChange={(e) => { this.setState({ keyword: e.target.value }) }} />
      </Col>
      <Col md="2" xs="3" sm="3">
        <Button block color="primary" onClick={() => {}}>참가자 검색</Button>
      </Col>
      <Col md="2" xs="3 " sm="3">
        <Button block color="primary" onClick={() => { this.props.history.push(''); }}>참가자 등록하기</Button>
      </Col>
    </Row>

    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Row>
              <Col>관광목록 보기</Col>
            </Row>
          </CardHeader>
            <CardBody>
              <div style={{ overflow: 'scroll' }}>
                <Table style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>참가자명</th>
                      <th>날짜</th>
                      <th>금액</th>
                      <th>체험내용</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </Table>
              </div>
            </CardBody>
        </Card>
      </Col>
    </Row>

  </div>
    )

  }
}

export default Activity;