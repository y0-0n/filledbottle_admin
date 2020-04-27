import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Table } from 'reactstrap';
// import ProductFamilyModal from '../Modal/ProductFamilyModal';
// import Popup from "reactjs-popup";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.form = {
      name : '',
      plant : '',
      type : '',
      quantity: 0,
      cost : 0,
    };

    this.state = {
        data: [],
    };
  }

  componentWillMount() {
    this.getStockDetail(this.props.match.params.id);
  }

  getStockDetail(id) {
    fetch(process.env.REACT_APP_HOST+"/api/stock/"+id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
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
      if(status === 200)
        this.setState({data: data[1]});
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    });
  }

  render() {
    let {data} = this.state;
    return (
      <div className="animated fadeIn align-items-center">
      <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
      <link rel="stylesheet" type="text/css" href="css/StockDetail.css"></link>
        <Row className="mb-5 justify-content-center">
          <Col md="9" lg="9" xl="8">
            <form>
              <FormGroup>
                <Card>
                  <CardHeader>
                      재고 상세
                  </CardHeader>
                  <CardBody>
                    <Table className="ShowTable">
                      <tbody>
                        <tr>
                          <th>품목명</th>
                          <td colSpan="3">
                            {data[0] !== undefined ? data[0].name : null}
                          </td>
                        </tr>
                        <tr>
                          <th>창고</th>
                          <td></td>
                          <th>유형</th>
                          <td>
                          </td>
                        </tr>
                        <tr>
                          <th>입고수량</th>
                          <td >
                          </td>
                          <th>매입원가</th>
                          <td >
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </FormGroup>
            </form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Detail;

