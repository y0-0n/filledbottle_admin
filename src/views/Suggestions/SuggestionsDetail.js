import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Badge, Table,} from 'reactstrap';
import '../../css/Table.css';

class CreateSuggestions extends Component {
  constructor(props) {
    super(props);
    this.form = {
    }
    this.state = {
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <form>
              <FormGroup>
                <Card>
                  <CardHeader>
                    건의내용
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                        <tbody>
                            <tr>
                                <th style={{width : "20%"}}>제목</th>
                                <td colSpan="3">버튼이상이상 고쳐줘</td>
                            </tr>
                            <tr className="TableBottom">
                                <th>답변 처리 현황</th>
                                <td><Badge color="primary">답변완료</Badge></td>
                                <th style={{width : "20%"}}>등록일</th>
                                <td>yyyy-mm-dd</td>
                            </tr>
                            <tr className="TableBottom">
                                <td colSpan="4">버튼이 이상해오 고쳐주셈
                                    <Card style={{marginTop: "50px"}}>
                                        <CardHeader>ㄴ A. 답변</CardHeader>
                                        <CardBody>
                                            안녕하세요. 부농부농입니다:)
                                            
                                        </CardBody>
                                    </Card>
                                </td>                                
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="ShowTable">
                        <tbody>
                            
                        </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary" onClick={()=> {this.props.history.push('/main/suggestions')}}>뒤로가기</Button>
                  </CardFooter>
                </Card>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
    )

  }
}

export default CreateSuggestions;

