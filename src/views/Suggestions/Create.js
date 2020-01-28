import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, Input, Table,} from 'reactstrap';

class Create extends Component {
  constructor(props) {
    super(props);
    this.form = {
      title: '',
      content: ''
    }
    this.state = {
      form: {}
    };
  }

  submit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_HOST+"/api/suggestion", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',  
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(this.form)
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      let status = data[0];
      if(status === 200) {
        alert('등록됐습니다.');
        this.props.history.push('/main/suggestions');
      } else {
        alert('등록에 실패했습니다.');
      }
    });
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
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
                          <Input onChange={(e) => {this.form.title = e.target.value}} />
                        </td>
                      </tr>
                      <tr className="TableBottom">
                        <th>글</th>
                        <td>
                          <form>
                            <textarea onChange={(e) => {this.form.content = e.target.value}} rows ="20" cols="80" name="suggestions_content">

                            </textarea>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary" onClick={this.submit.bind(this)}>추가하기</Button>
                  </CardFooter>
                </Card>
          </Col>
        </Row>
      </div>
    )

  }
}

export default Create;

