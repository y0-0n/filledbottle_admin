import React, { Component } from 'react';
import { Button, Input, Table, } from 'reactstrap';

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
      unit: '개',
      directIngredient : 0,
      indirectIngredient : 0,
      indirectLabor : 0,
      directLabor : 0,
      indirectManufacture : 0,
      directManufacture : 0,
      maintenance : 0,
      profit : 0,
    }
  }

  componentWillMount() {
  }

  calculRecipeList() {
    var cost = 0;
    for (var i = 0; i < this.state.recipeList.length; i++){
      cost += (this.state.recipeList[i].usage / this.state.recipeList[i].purchase_weight) * this.state.recipeList[i].purchase_cost
    }
    this.setState({
      directIngredient : cost
    })
  }

  calculate() {
    this.setState({
      directCost : this.state.directIngredient + this.state.directLabor + this.state.directManufacture,
      indirectCost : this.state.indirectIngredient + this.state.indirectLabor + this.state.indirectManufacture,
    }, () => {
      this.setState({
        manufactureCost: this.state.directCost + this.state.indirectCost
      },() => {
        this.setState({
          totalCost : this.state.manufactureCost + this.state.maintenance
        }, () => {
          this.setState({
            purchaseCost: this.state.totalCost + this.state.profit
          })
        })
      })
    })
  }


  render() {
    return (
      <div className="animated fadeIn align-items-center">
        <link rel="stylesheet" type="text/css" href="css/CreateCopy.css"></link>
        <div>
          <div className="form-card">
            <div className="form-title">원가계산기</div>
            <div className="form-innercontent">
              {/* <div className="sell-list">
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
              </div> */}
              
              <div className="sell-list">
                <label className="sell-label">원가계산기</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{maxWidth: "1200px", textAlign:'center'}}>
                    <tr>
                      <th>직접재료비</th>
                      <td><Input disabled value={this.state.directIngredient}></Input></td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <div className="sell-list" style={{backgroundColor: '#F8F9FD'}}>
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
                                        <Input onChange={(e)=> {
                                          let {recipeList} = this.state;
                                          let val = Object.assign({}, recipeList[i]);
                                          val.name = e.target.value
                                          recipeList[i] = val;
                                          this.setState({recipeList})
                                          }}>
                                        </Input>
                                      </td>
                                      <td>
                                        <Input onChange={(e)=> {
                                          let {recipeList} = this.state;
                                          let val = Object.assign({}, recipeList[i]);
                                          val.purchase_weight = e.target.value
                                          recipeList[i] = val;
                                          this.setState({recipeList})
                                          }}>
                                        </Input>
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
                                        <Input onChange={(e)=> {
                                          let {recipeList} = this.state;
                                          let val = Object.assign({}, recipeList[i]);
                                          val.purchase_cost = e.target.value
                                          recipeList[i] = val;
                                          this.setState({recipeList})
                                          }}>
                                        </Input>
                                      </td>
                                      <td>
                                        <Input onChange={(e)=> {
                                          let {recipeList} = this.state;
                                          let val = Object.assign({}, recipeList[i]);
                                          val.usage = e.target.value
                                          recipeList[i] = val;
                                          this.setState({recipeList})
                                          }}>
                                        </Input>
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
                          <Button style={{width: '100%'}} color='primary' onClick={() => {this.calculRecipeList()}}>입력 완료</Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>간접재료비</th>
                      <td><Input onChange={(e)=> {this.setState({indirectIngredient : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>직접노무비</th>
                      <td><Input onChange={(e)=> {this.setState({directLabor : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>간접노무비</th>
                      <td><Input onChange={(e)=> {this.setState({indirectLabor : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>직접제조경비</th>
                      <td><Input onChange={(e)=> {this.setState({directManufacture: parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>간접제조경비</th>
                      <td><Input onChange={(e)=> {this.setState({indirectManufacture : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>판매비와 관리비</th>
                      <td><Input onChange={(e)=> {this.setState({maintenance : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <th>기대이익</th>
                      <td><Input onChange={(e)=> {this.setState({profit : parseInt(e.target.value)})}}></Input></td>
                    </tr>
                    <tr>
                      <td colSpan="2"><Button style={{width: '100%'}} color='primary' onClick={() => {this.calculate()}}>계산 하기</Button></td>
                    </tr>
                  </Table>
                </div>
              </div>

              <div className="sell-list">
                <label className="sell-label">원가계산결과</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{maxWidth: "1200px", textAlign:'center'}}>
                    <tr>
                      <th>직접원가 <br/> (직접재료비 + 직접노무비 + 직접경비)</th>
                      <td>
                        <Input disabled value={this.state.directCost}></Input>
                      </td>
                    </tr>
                    <tr>
                      <th>제조간접비 <br/> (간접재료비 + 간접노무비 + 간접경비)</th>
                      <td><Input disabled value={this.state.indirectCost}></Input></td>
                    </tr>
                    <tr>
                      <th>제조원가 <br/> (직접원가 + 제조간접비)</th>
                      <td><Input disabled value={this.state.manufactureCost}></Input></td>
                    </tr>
                    <tr>
                      <th>총원가 <br/> (제조원가 + 판매관리비)</th>
                      <td><Input disabled value={this.state.totalCost}></Input></td>
                    </tr>
                    <tr>
                      <th style={{color: '#1E8EB7'}}>판매가격 <br/> (총원가 + 이익)</th>
                      <td><Input disabled value={this.state.purchaseCost}></Input></td>
                    </tr>
                  </Table>
                </div>
              </div>

              {/*<div className="sell-list">
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
              </div>*/}

              {/* <div className="sell-list" style={{textAlign: 'center'}}>
                <div>
                  원가 {this.state.cost} 원 (단위 : {this.state.unit})
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>

    )

  }


}

export default Calculator;

