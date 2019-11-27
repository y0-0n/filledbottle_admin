import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Table,} from 'reactstrap';
import '../../css/Table.css';
//import customer from '../Customer/Customer'

class Message extends Component {
  constructor(props) {
    super(props);
    this.form = {
        name:'',
        content: '',
      }
      this.state = {
        data : [],
        image:'',
      };
  }

  componentWillMount() {
    this.getCustomer();
    console.log(this.props.location.state);
  }
  
  getCustomer() {
    this.setState({ search: false, set: true });
    fetch(process.env.REACT_APP_HOST + "/customer", {
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
          this.setState({ data: data[1] });
        else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      })
  }

  handleFileInput(e){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      this.setState({
        image : [reader.result],
      });
    }.bind(this);

    let img = e.target.files[0];

    this.setState({img});
  }


  render() {
    var data = this.props.location.state;
    return (
      <div className="animated fadeIn">
        <Row className="mb-5">
          <Col md="12" xs="12" sm="12">
            <form>
              <FormGroup>
                <Card>
                  <CardHeader>
                    카카오톡 메세지 보내기
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                    <tbody>
                        <tr>
                          <th>받는사람</th>
                          <td>
                          {data != undefined ? 
                          data.map((e, i) => {
                            return (
                              <p>
                                {e.name}/{e.cellphone}
                              </p>
                            )})
                             : 
                             this.props.history.push('/main/customer/list')}
                          </td>
                        </tr>
                      <tr>
                        <th>첨부파일</th>
                        <td>
                          <img alt="첨부파일" style={{height: 500, width: 500}} src={this.state.image} /> <br></br>
                          <input ref="file" type="file" name="file"  accept="image/*" onChange={e =>{this.handleFileInput(e);}}/> 
                        </td>
                      </tr>
                      <tr>
                        <th>내용</th>
                        <td>
                            <form>
                            <textarea onChange={(e) => {this.form.content = e.target.value}} rows ="20" cols="70" name="suggestions_content">

                            </textarea>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                    <Button block outline color="primary">보내기</Button>
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

export default Message;