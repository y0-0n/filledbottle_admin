import React, { Component } from 'react';
import { Row } from 'reactstrap';

class Sales extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop">영업 홈 입니다</i>
          </div>
          <div className="card-body">
            <Row>
              여기에 버튼이 들어갑니다
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default Sales;
