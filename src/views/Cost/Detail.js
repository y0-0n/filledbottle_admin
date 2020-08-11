import React, { Component } from 'react';
import { Table } from 'reactstrap';

let d = {name: '사과', purchase_weight: 10, unit: 'kg', purchase_cost: 1000, usage: 10};
let p = {people: 0, time: 0, salary: 0, total_cost: 0};
let m = {name: '', cost: 0};

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {
        recipeList: [d],
        LaborList: [p],
        maintenanceList: [m],
        cost: 0,
        unit: '개',
        directIngredient : 1000,
        indirectIngredient : 0,
        indirectLabor : 0,
        directLabor : 0,
        indirectManufacture : 0,
        directManufacture : 0,
        maintenance : 0,
        profit : 0,

        directCost: 0,
        indirectCost : 0,
        manufactureCost : 0,
        totalCost : 0,
        purchaseCost :0,
      }
    }
  }

  componentDidUpdate() {
    this.calculRecipeList()
  }

  calculate() {
    this.setState({
      directCost : this.state.data.directIngredient + this.state.data.directLabor + this.state.data.directManufacture,
      indirectCost : this.state.data.indirectIngredient + this.state.data.indirectLabor + this.state.data.indirectManufacture,
    }, () => {
      this.setState({
        manufactureCost: this.state.data.directCost + this.state.data.indirectCost
      },() => {
        this.setState({
          totalCost : this.state.data.manufactureCost + this.state.data.maintenance
        }, () => {
          this.setState({
            purchaseCost: this.state.data.totalCost + this.state.data.profit
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
              <div className="sell-list">
                <label className="sell-label">원가계산기</label>
                <div className="sell-input">
                  <Table className="ListTable" style={{maxWidth: "1200px", textAlign:'center'}}>
                    <tr>
                      <th>직접재료비</th>
                      <td>{this.state.data.directIngredient}</td>
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
                                </tr>
                              </thead>
                              <tbody>
                              {
                                this.state.data.recipeList.map(function (e, i) {
                                  return (
                                    <tr key={i}>
                                      <td>
                                        {this.state.data.recipeList[i].name}
                                      </td>
                                      <td>
                                        {this.state.data.recipeList[i].purchase_weight}
                                      </td>
                                      <td>
                                        {this.state.data.recipeList[i].unit}
                                      </td>
                                      <td>
                                        {this.state.data.recipeList[i].purchase_cost}
                                      </td>
                                      <td>
                                        {this.state.data.recipeList[i].usage}
                                      </td>
                                    </tr>
                                  )},this)
                              }
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>간접재료비</th>
                      <td>{this.state.data.indirectIngredient}</td>
                    </tr>
                    <tr>
                      <th>직접노무비</th>
                      <td>{this.state.data.directLabor}</td>
                    </tr>
                    <tr>
                      <th>간접노무비</th>
                      <td>{this.state.data.indirectLabor}</td>
                    </tr>
                    <tr>
                      <th>직접제조경비</th>
                      <td>{this.state.data.directManufacture}</td>
                    </tr>
                    <tr>
                      <th>간접제조경비</th>
                      <td>{this.state.data.indirectManufacture}</td>
                    </tr>
                    <tr>
                      <th>판매비와 관리비</th>
                      <td>{this.state.data.maintenance}</td>
                    </tr>
                    <tr>
                      <th>기대이익</th>
                      <td>{this.state.data.profit}</td>
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
                        {this.state.data.directCost}
                      </td>
                    </tr>
                    <tr>
                      <th>제조간접비 <br/> (간접재료비 + 간접노무비 + 간접경비)</th>
                      <td>{this.state.data.indirectCost}</td>
                    </tr>
                    <tr>
                      <th>제조원가 <br/> (직접원가 + 제조간접비)</th>
                      <td>{this.state.data.manufactureCost}</td>
                    </tr>
                    <tr>
                      <th>총원가 <br/> (제조원가 + 판매관리비)</th>
                      <td>{this.state.data.totalCost}</td>
                    </tr>
                    <tr>
                      <th style={{color: '#1E8EB7'}}>판매가격 <br/> (총원가 + 이익)</th>
                      <td>{this.state.data.purchaseCost}</td>
                    </tr>
                  </Table>
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

