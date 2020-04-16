import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input,
   CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup,
   InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Switch from "../Switch/Switch";
import ImageModal from '../Modal/ImageModal';
import Popup from "reactjs-popup";
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import ReactToPrint from 'react-to-print';
/*

  GET /product/state

  -> this.state.data

  id : 주문 번호
  name : 품목명
  grade : 등급
  weight : 무게
  price_shipping : 단가

*/

const listCount = 15;
global.show = true;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      stockData: [],
      //page: 1,
      name: '',
      //family: 0,
      //set: true,
      stockEdit: false,
			familyData: [],
      userCategoryData: [],
      checkCategory: true,
      total: 0
		};
    //this.name = '';
    //this.family = 0;
    this.form = {

		}

		this.changeShowFalse.bind(this);
		this.changeShowTrue.bind(this);
  }
  componentWillMount() {
    console.log('dd',this.props.family)
    this.getUserFamilyCategory();
  }

  getTotal() {
    const name = this.props.keyword;
    const {category, family} = this.props;

    fetch(process.env.REACT_APP_HOST + "/product/total/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          name, family, category
        }
      )
    })
      .then(response => {
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
        const status = data[0];
        if (status === 200) {
          this.setState({ total: Math.ceil(data[1][0].total / listCount) })
        } else {
          alert('로그인 하고 접근해주세요')
          this.props.history.push('/login')
        }
      });
	}

	getUserFamilyCategory() {
		fetch(process.env.REACT_APP_HOST + "/api/product/userFamilyCategory", {
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
        if (status === 200){
					if(data[1].length !== 0) {
            //this.props.checkCategoryId(data[1][0].id)
						this.setState({ userCategoryData: data[1],}, () => {
								this.getProductFamily();
							});
					} else {
						this.setState({
              checkCategory: false
            })
					}

        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
	}

	getProduct() {
    const name = this.props.keyword;
    const page = this.props.pageNumbers;
    const {category, family} = this.props;
    fetch(process.env.REACT_APP_HOST + "/product/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          page, name, family, category
        }
      )
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
          this.setState({ productData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
        this.getTotal();
      })
  }

  getStock() {
    const page = this.props.pageNumbers;
    const name = this.props.keyword;
    const {category, family} = this.props;

    fetch(process.env.REACT_APP_HOST + "/api/stock/sum", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(
        {
          page, name, family, category
        }
      )
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
          this.setState({ stockData: data[1] });
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
	}
	
  excel() {

    fetch(process.env.REACT_APP_HOST + "/api/product/excel", {
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
        if (status === 200){
					//this.setState({ stockData: data[1] });
				}
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      });
  }


  searchProduct() {
		this.getProduct();
    this.getStock();
  }

  changeStockEdit() {
    this.getStock();
    this.setState({ stockEdit: !this.state.stockEdit })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /*changeSet() {
    this.setState({set: !this.state.set}, () => {
      this.getProduct();
    });
	}*/

	changeCategory(id) {
		this.setState({
			//category: id,
			//page: 1,
			//family: 0,
		}, () => {
			this.getProductFamily();
		})
  }

  countPageNumber(x) {
    this.setState({
      //page: x,
    }, () => {
      this.getProduct();
      this.getStock();
    });
  }

  getProductFamily() {
    fetch(process.env.REACT_APP_HOST + "/api/product/familyList/"+this.props.category, {
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
        if (status === 200){
          this.setState({ familyData: data[1] }, () => {
						this.getProduct();
						this.getStock();
					});
        }
        else {
          alert('로그인 하고 접근해주세요');
          this.props.history.push('/login');
        }
      })
  }

  changeFamily (family) {
    //let keyword = this.keyword
    this.setState({ family, /*page: 1*/ }, () => {
      this.getProduct();
      this.getStock();
    })
  }

  changeShowFalse() {
		global.show = false;
		this.forceUpdate();
  }

  changeShowTrue() {
    global.show = true;
		this.forceUpdate();
  }

  render() {
    var data = this.state.productData;
    var {stockData, familyData, userCategoryData} = this.state;
    var family = this.props.family;
    console.log(family , "ddss")
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
        <Row>
          <Col>
            <Table className="category-top" >
              <tbody>
                <tr>
									{ this.state.checkCategory ?
										userCategoryData.map((e, i) => {
											return <td key={i} style={{cursor: "pointer", backgroundColor: this.props.category===e.id ? '#E6E6E6' : '#fff'}} onClick={() => {this.changeCategory(this.props.checkCategoryId(e.id))}}>{e.name}</td>
                    })
                    :
                    <div style={{textAlign: "left", padding: 30}}>
                      <div style={{ display: "table-cell" }}>
                        <i style={{ marginRight: 10 }} class="fa fa-exclamation-circle"></i>
                      </div>
                      <div style={{ display: "table-cell" }}>
												품목군을 설정해서 품목 관리를 시작하세요. <br></br>
                        ( 우측상단의 회원정보 또는 품목군 추가하기 버튼을 통해 설정이 가능합니다. )
                      </div>
                      <div style={{ display: "table-cell", paddingLeft: 50, verticalAlign: "middle"}}>
                        <Button color="primary" onClick={() => { this.props.history.push('/main/registerdetail') }}>품목군 추가하기</Button>
                      </div>
                    </div>
									}
                </tr>
              </tbody>
            </Table>
            <Card>
              <CardHeader>
                <Row>
                  <Col>품목 상세 검색</ Col>
                  <Col md="3" xs="6" sm="6">
                    <InputGroup>
                      <Input value = {this.props.keyword} onChange={(e) => { this.props.searchKeyword(e.target.value) }} />
                      <InputGroupAddon addonType="append">
                        <Button block color="primary" onClick={() => { this.searchProduct(this.props.keyword); }}><i class="fa fa-search"></i></Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <hr></hr>
                <Row>
                  <Col>
                  <ul className="list-productfamily-ul" style={{width: '100%', display: 'flex', flexWrap: 'wrap', listStyleType: 'none', cursor: 'pointer'}}>
                    { this.state.checkCategory ?
                      <li className="list-productfamily" style={{backgroundColor: family === 0? '#F16B6F' : 'transparent', border: family === 0? '0px' : '1px solid #c9d6de',color: family === 0? '#fff' : '#52616a', fontWeight: family === 0? 'bold' : 'normal', fontSize: family === 0? '1.1em' : '1em'}}onClick = {() => this.changeFamily(this.props.checkFamily(0))}>
                        전체
                      </li>
                      :
                      <li>

                      </li>
                    }
                    { this.state.checkCategory ?
                      familyData.map((e, i) => {
                        return <li key={i} className="list-productfamily" style={{backgroundColor: family === e.id? '#F16B6F' : 'transparent', border: family === e.id? '0px' : '1px solid #c9d6de', color: family === e.id? '#fff' : '#52616a', fontWeight: family === e.id? 'bold' : 'normal', fontSize: family === e.id? '1.1em' : '1em'}}  onClick = {() => this.changeFamily(this.props.checkFamily(e.id))}><p>{e.name}</p></li>
                      })
                      :
                      <li>

                      </li>
                    }
                    {/*<Popup
                          trigger={<li className="list-productfamily" style={{border: '1px solid #c9d6de', color: 'lightgreen',}}>+</li>}
                          modal>
                          {close => <ProductFamilyModal close={close} login={() => { this.props.history.push('/login') }}
                    />}
                    </Popup>*/}
                      {/*<InputGroup>
                        <Input value={this.state.newFamily} onChange={(e) => {
                          let newFamily = e.target.value;
                          this.setState({ newFamily })
                        }} />
                        <InputGroupAddon addonType="append">
                          <Button onClick={this.addProductFamily.bind(this)} outline color="success">+</Button>
                        </InputGroupAddon>
                      </InputGroup>*/}
                  </ul>
                  </Col>
                </Row>
                <hr></hr>
                <Row style={{marginBottom: 15}}>
                  {/*<Col>
                    {this.state.set ?
                      "비활성화 품목 보기" :
                      "활성화 품목 보기"}
                    <Switch id='1' isOn={this.state.set} handleToggle={this.changeSet.bind(this)} />
                  </Col>
                  <Col>
                    {this.state.show ?
                      "카드로 보기" :
                      "리스트로 보기"
                    }
                    <Switch id='2' isOn={this.state.show} handleToggle={() => this.changeShow()} />
                  </Col>*/}
                  <Col>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle caret color="primary">
                        더 보기
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => { this.props.history.push('/main/product/list/unset') }}>비활성화</DropdownItem>
                        {/*this.state.stockEdit ?
                        <DropdownItem onClick={() => this.changeStockEdit()}>수정완료</DropdownItem> :
                        <DropdownItem onClick={() => this.changeStockEdit()}>재고수정</DropdownItem> */}
                        <DropdownItem onClick={() => { this.props.history.push('/product/create'); }}>품목추가</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                  <Col>
                    <div style={{float: "right"}}>
                      <Button style={{marginRight: "10px"}} onClick={() => { this.props.history.push('/product/create'); }} color="primary">엑셀로 보내기</Button>
											<Button style={{marginRight: "10px"}} onClick={() => { this.props.history.push('/product/create'); }} color="primary">품목추가</Button>
                      <a className="button-list" style={{display: "inline-block", border: "1px solid #eee", padding: "10px", marginRight: "10px", backgroundColor: global.show === false ? 'lightgray' : 'transparent'}} onClick={() => {this.changeShowFalse()}}><i className="fa fa-th" style={{display: "block"}}></i>
                      </a>
                      <a className="button-card" style={{display: "inline-block", border: "1px solid #eee", padding: "10px", marginRight: "10px", backgroundColor: global.show === true ? 'lightgray' : 'transparent'}} onClick={() => {this.changeShowTrue()}}><i className="fa fa-th-list" style={{display: "block"}}></i>
                      </a>
                    </div>
                  </Col>
                </Row>
                {global.show ?
                <Row>
                  <Table className="ListTable" style={{ minWidth: 600 }} hover>
                    <thead>
                      <tr>
												<th>No.</th>
                        <th style={{ width: 150 }}>사진</th>
                        <th>품목명</th>
                        <th style={{ width: 250 }}>품목군</th>
                        <th>판매 단가</th>
                        {/*this.state.set ?
                            <th style={{width : 300}}>품목 비활성화</th> :
                            <th style={{width : 300}}>품목 활성화</th>
                          */}
                        {/*<th>수정</th>*/}
                        <th>재고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((e, i) => {
                        return (<tr style={{height : "150px"}} key={e.id} onClick={() => {
                          this.props.history.push({
                            pathname: '/main/product/' + e.id,
                          })
                        }}>
													<td>{e.id}</td>
                          <td>
                            <img style={{ width: '90%' }} alt="품목 사진" src={e.file_name ? process.env.REACT_APP_HOST+"/static/" + e.file_name : '318x180.svg'} />
                          </td>
                          <td>{e.name + ' ' + e.grade + ' ' + e.weight}</td>
                          <td>{e.familyName}</td>
                          <td>{this.numberWithCommas(e['price_shipping'])}&nbsp;원</td>
													<td>{stockData[i] !== undefined ? stockData[i].quantity : null}</td>
                          {/*this.state.stockEdit ?
                            <td style={{ width: 250, verticalAlign: 'middle' }}>
                              <InputGroup>
                                <Input defaultValue={stockData[i] !== undefined ? stockData[i].quantity : null} onChange={(e) => { stockData[i].quantity = e.target.value; }} />
                                <InputGroupAddon addonType="append">
                                <Button onClick={() => { this.modifyStock(e.id, stockData[i].quantity) }} color="primary" >수정</Button>
                                </InputGroupAddon>
                              </InputGroup>
                            </td> :
                          <td style={{ cursor: 'pointer', verticalAlign: 'middle' }} onClick={() => { this.props.history.push(`/main/stock/${e.id}`) }}>{stockData[i] !== undefined ? stockData[i].quantity : null}</td>*/}
                          {/*this.state.set ?
                              <td>
                                <Button block style={{ width: 120 }} color="ghost-danger" onClick={() => this.deleteProduct(e.id)}>품목 비활성화</Button>
                              </td> :
                              <td>
                                <Button block style={{ width: 100 }} color="ghost-primary" onClick={() => this.activateProduct(e.id)}>품목 활성화</Button>
                              </td>
                            */}
                          {/*<td><Button  onClick={() => {this.props.history.push(`/main/product/edit/:id`)}}>수정</Button></td>*/}
                          {/*<td>
                            {<Popup
                              trigger={<Button>사진</Button>}
                              modal>
                              {close => <ImageModal close={close} product_id={e.id} login={() => { this.props.history.push('/login') }} />}
                            </Popup>}
                          </td>*/}
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </Row>
                :
                <Row>
                  {data.map(function (e, i) {
                    return (
                      <div className="card-product" key={i} style={{width: '20%', float: 'left', positon: 'relative'}}>
                        <li style={{listStyleType : 'none'}}>
                          <a style={{textAlign: 'center', cursor: 'pointer'}} onClick={() => {
                            this.props.history.push({
                              pathname: '/main/product/' + e.id,
                            })
                          }}>
                            <div className="img-product" ><CardImg top style={{display: 'inline-block', width:"90%", overflow: "hidden"}} src={e.file_name ? "http://211.62.225.216:4000/static/" + e.file_name : '318x180.svg'} alt="Card image cap" /></div>
                            <p style={{fontWeight: 'bold'}}>{e.name + ' ' + e.grade + ' ' + e.weight}</p>
                            <p>{e.familyName}</p>
                            {this.state.stockEdit ?
                            <div>
                              <span>재고 : </span>
                              <div style={{display: 'inline-block', width: 100}}>
                                <InputGroup style={{}}>
                                  <Input defaultValue={stockData[i] !== undefined ? stockData[i].quantity : null} onChange={(e) => { stockData[i].quantity = e.target.value; }} />
                                  <InputGroupAddon addonType="append">
                                  <Button onClick={() => { this.modifyStock(e.id, stockData[i].quantity) }} color="primary" >수정</Button>
                                  </InputGroupAddon>
                                </InputGroup>
                              </div>
                            </div> :
                            <p>재고 : {stockData[i] !== undefined ? stockData[i].quantity : null}</p>}
                            <p>{this.numberWithCommas(e['price_shipping'])}&nbsp;원</p>
                          </a>
                        </li>
                        {/*<Card>
                          <CardImg top width="100%" src={e.file_name ? "http://211.62.225.216:4000/static/" + e.file_name : '318x180.svg'} alt="Card image cap" />
                          <CardBody>
                            <CardTitle><h3>품목명 : {e.name + ' ' + e.grade + ' ' + e.weight}</h3></CardTitle>
                            <CardSubtitle><h4>품목군 : {e.familyName}</h4></CardSubtitle>
                            <CardSubtitle><h4>판매단가 : {this.numberWithCommas(e['price_shipping'])}&nbsp;원</h4></CardSubtitle>
                            <CardSubtitle><h4>재고 : {e.address}</h4></CardSubtitle>
                          </CardBody>
                        </Card>*/}
                      </div>)
                  }.bind(this))
                  }
                </Row>
            }
                <div style={{width: "100%", textAlign : "center"}}>{this.state.productData.length === 0 ? <span >"현재 품목 목록이 없습니다."</span> : null}</div>
              </CardBody>
              <CardFooter>
                <Pagination style={{justifyContent: 'center'}}>
                  {this.props.pageNumbers === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers-1))}}/>
                  </PaginationItem>
                  }
                  {this.props.pageNumbers === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {this.props.pageNumbers === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {this.props.pageNumbers !== 1 && this.props.pageNumbers!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.total >= this.props.pageNumbers+e)
                    return (<PaginationItem key={i} active={this.props.pageNumbers === this.props.pageNumbers+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+e));}}>
                      {this.props.pageNumbers+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {this.props.pageNumbers === this.state.total ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPage(this.props.pageNumbers+1))}}/>
                  </PaginationItem>}
                </Pagination>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default List;
