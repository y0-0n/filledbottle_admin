import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, Col, Row, FormGroup, Input, Table, InputGroupAddon, InputGroup } from 'reactstrap';

let d = {name: '', purchase_weight: 0, unit: '', purchase_cost: 0, usage: 0};
let p = {people: 0, time: 0, salary: 0, total_cost: 0};
let m = {name: '', cost: 0};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [d],
      LaborList: [p],
      maintenanceList: [m],
      cost: 0,
      unit: '개'
    }
  }

  componentWillMount() {
  }


  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div>
          <div className="form-card">
            <div className="form-title">원가계산기</div>
            <div className="form-innercontent">
              <div className="sell-list">
                <label className="sell-label">시간당 생산량</label>
                <div className="sell-input">
                  <InputGroup>
                    <Input type="number" placeholder="숫자만 입력" required onChange={(e) => {}} />
                    <select>
                      <option selected disabled value="">단위</option>
                      <option value="개">개</option>
                      <option value="ml">ml</option>
                      <option value="mg">mg</option>
                    </select>
                  </InputGroup>
                </div>
              </div>
              <div className="sell-list">
                <label className="sell-label">재료비</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{maxWidth: "1200px", textAlign:'center'}}>
                    <thead>
                      <tr>
                        <th>재료명</th>
                        <th>구매중량</th>
                        <th>단위</th>
                        <th>구매금액</th>
                        <th>사용량</th>
                        <th>삭제</th>
                        <Button block color="primary"
                              style={{margin: 10}}
                              onClick={()=> {
                                let {recipeList} = this.state;
                                recipeList.push(d);
                                this.setState({
                                  recipeList
                                })}}
                              >
                        추가하기
                      </Button>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.recipeList.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <select>
                                <option selected disabled value="">단위</option>
                                <option value="개">개</option>
                                <option value="ml">ml</option>
                                <option value="mg">mg</option>
                              </select>
                            </td>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <Button block color="danger"
                                onClick={()=> {
                                  let {recipeList} = this.state;
                                  recipeList.splice(i, 1);
                                  this.setState({
                                    recipeList
                                  })
                                }}>
                                X
                              </Button>
                            </td>
                          </tr>
                        )},this)
                    }
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="sell-list">
                <label className="sell-label">인건비</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{maxWidth: "1200px", textAlign:'center'}}>
                    <thead>
                      <tr>
                        <th>인력수</th>
                        <th>작업시간</th>
                        <th>급여</th>
                        <th>총액</th>
                        <th>삭제</th>
                        <Button block color="primary"
                              style={{margin: 10}}
                              onClick={()=> {
                                let {LaborList} = this.state;
                                LaborList.push(p);
                                this.setState({
                                  LaborList
                                }); console.log(this.state.LaborList)}}
                              >
                        추가하기
                      </Button>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.LaborList.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>
                              <Input onChange={(e)=> {
                                let {LaborList} = this.state;
                                LaborList[i].people= e.target.value;
                                this.setState({LaborList})}}></Input>
                            </td>
                            <td>
                              <Input onChange={(e)=> {
                                let {LaborList} = this.state;
                                LaborList[i].time= e.target.value;
                                this.setState({LaborList})}}></Input>
                            </td>
                            <td>
                              <Input onChange={(e)=> {
                                let {LaborList} = this.state;
                                LaborList[i].salary= e.target.value;
                                this.setState({LaborList})}}></Input>
                            </td>
                            <td>
                              <Input disabled value={this.state.LaborList[i].people * this.state.LaborList[i].time * this.state.LaborList[i].salary}></Input>
                            </td>
                            <td>
                              <Button block color="danger"
                                onClick={()=> {
                                  let {LaborList} = this.state;
                                  LaborList.splice(i, 1);
                                  this.setState({
                                    LaborList
                                  })
                                }}>
                                X
                              </Button>
                            </td>
                          </tr>
                        )},this)
                    }
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="sell-list">
                <label className="sell-label">관리비</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{width: "1200px", textAlign:'center'}}>
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>금액</th>
                        <th>삭제</th>
                        <Button block color="primary"
                              style={{margin: 10}}
                              onClick={()=> {
                                let {maintenanceList} = this.state;
                                maintenanceList.push(m);
                                this.setState({
                                  maintenanceList
                                })}}
                              >
                        추가하기
                      </Button>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.maintenanceList.map(function (e, i) {
                        return (
                          <tr key={i}>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <Input></Input>
                            </td>
                            <td>
                              <Button block color="danger"
                                onClick={()=> {
                                  let {maintenanceList} = this.state;
                                  maintenanceList.splice(i, 1);
                                  this.setState({
                                    maintenanceList
                                  })
                                }}>
                                X
                              </Button>
                            </td>
                          </tr>
                        )},this)
                    }
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="sell-list" style={{textAlign: 'center'}}>
                <div>
                  원가 {this.state.cost} 원 (단위 : {this.state.unit})
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    )

  }


}

export default Calculator;

