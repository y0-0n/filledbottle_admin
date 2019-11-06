import React, { Component } from 'react';

import { Button, Badge, Card, CardBody, CardHeader, CardFooter, Col, Row, Table } from 'reactstrap';


class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    render() {
        return (
            <Card>
                <CardHeader>
                    건의사항
                    <Button color="primary" style={{float: 'right', width: '10%'}} onClick={()=> {this.props.history.push('/main/suggestions/write');}}>글쓰기</Button>
                </CardHeader>
                <CardBody>
                    <div style={{ overflow: 'scroll' }}>
                        <Table style={{ minWidth: 600 }} hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>등록일</th>
                                    <th>답변현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ cursor: 'pointer' }} onClick={()=> {this.props.history.push('/main/suggestions/${e.id}')}}>
                                    <td>1</td>
                                    <td>테스트</td>
                                    <td>테스트</td>
                                    <td>테스트</td>
                                    <td><Badge color="primary">답변완료</Badge></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </CardBody>

            </Card>
        )
    }
}

export default Suggestions;
