import React, { Component } from 'react';
import { Table, Col, Row, Button, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PlantModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            plantData: [],
            plantState: '',
        };
    }

    componentWillMount() {
        this.getPlant();
    }

    getPlant() {
        fetch(process.env.REACT_APP_HOST + "/api/plant", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
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
                    this.setState({ plantData: data[1] });
                else {
                    alert('로그인 하고 접근해주세요');
                    this.props.history.push('/login');
                }
            });
    }

    render() {
        const { plantData } = this.state;
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        <Row>
                            <Col><i className="icon-drop">창고이동</i></Col>
                        </Row>
                    </div>
                    <div className="card-body plant-cardbody" style={{ overflow: 'scroll' }} >
                        <Table hover>
                            <tbody>
                                <tr>
                                    <th>생산된 공장</th>
                                    <td>
                                        <Input onChange={(e) => { this.state.plantState = e.target.value }} type='select'>
                                            {
                                                plantData.map((e, i) => {
                                                    return (
                                                        <option>{e.name}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </td>
                                    <th>받는 공장</th>
                                    <td>
                                        <Input onChange={(e) => { this.state.plantState = e.target.value }} type='select'>
                                            {
                                                plantData.map((e, i) => {
                                                    return (
                                                        <option>{e.name}</option>
                                                    )
                                                })
                                            }
                                        </Input>
                                    </td>
                                </tr>
                                <tr>
                                </tr>
                            </tbody>
                        </Table>
                        <Table hover>
                            <thead>
                                <th>No.</th>
                                <th>생산품목코드</th>
                                <th>생산품목명</th>
                                <th>수량</th>
                                <th>외주비단가</th>
                                <th>외주비합계</th>
                            </thead>
                            <tbody>
                                <tr>
                                </tr>
                                <tr>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlantModal;
