import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table,} from 'reactstrap';
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
                    글쓰기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                    <tbody>
                      <tr>
                        <th>제목</th>
                        <td>
                          <Input/>
                        </td>
                      </tr>
                      <tr className="TableBottom">
                        <th>글</th>
                        <td>
                          <Input/>
                        </td>
                      </tr>
                    </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">추가하기</Button>
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

