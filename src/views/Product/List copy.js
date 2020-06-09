import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input,
   CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup, Badge,
   InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Switch from "../Switch/Switch";
import ImageModal from '../Modal/ImageModal';
import Popup from "reactjs-popup";
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import DatePicker from "react-datepicker";
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

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //productData_cafe24: [],
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

  }
  componentWillMount() {
    this.getUserFamilyCategory();
    //this.getCafe24Product();
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

  /*getCafe24Product() {
    fetch('https://cors-anywhere.herokuapp.com/https://ast99.cafe24api.com/api/v2/admin/products', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('cafe24AccessToken'),
        'Content-Type' : 'application/json',

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
        this.setState({ productData_cafe24: data[1].products })
        console.log(this.state.productData_cafe24)
      }
      else {
        alert('로그인 하고 접근해주세요');
        this.props.history.push('/login');
      }
    })
  }*/

  render() {
    var data = this.state.productData;
    //var data_cafe24 = this.state.productData_cafe24;
    var {stockData, familyData, userCategoryData} = this.state;
    var {family, show, pageNumbers} = this.props;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
        <Row>
          <Col>
            <Table className="category-top" >
              <tbody>
                <tr>
                  <td style={{cursor: "pointer", backgroundColor: this.props.category===0 ? '#E6E6E6' : '#fff'}} onClick={() => {this.changeCategory(this.props.checkCategoryId(0))}}>전체</td>
                  {console.log(this.props.category)}
									{ this.state.checkCategory ?
										userCategoryData.map((e, i) => {
											return <td key={i} style={{cursor: "pointer", backgroundColor: this.props.category===e.id ? '#E6E6E6' : '#fff'}} onClick={() => {this.changeCategory(this.props.checkCategoryId(e.id))}}>{e.name}</td>
                    })
                    :
                    <div style={{textAlign: "left", padding: 30}}>
                      <div style={{ display: "table-cell" }}>
                        <i style={{ marginRight: 10 }} className="fa fa-exclamation-circle"></i>
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
            <div className="status-box">
              <ul className="status-list">
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>전체</p>
                    <strong>0</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>주문</p>
                    <strong>0</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>출하</p>
                    <strong>0</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>취소</p>
                    <strong>0</strong>
                    <span>건</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="search-box">
              <div className="search-list">
                <label className="search-label">검색어</label>
                <div className="search-input">
                  <div className="search-input-group">
                    <div>
                      <label>상품명 </label>
                      <input></input>
                    </div>
                    <div>
                      <label>모델명 </label>
                      <input></input>
                    </div>
                  </div>
                  <div className="search-input-group">
                    <div>
                      <label>제조사명 </label>
                      <input></input>
                    </div>
                    <div>
                      <label>브랜드명 </label>
                      <input></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">판매상태</label>
                <div className="search-input">
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>전체</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매대기</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매중</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>품절</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>승인대기</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매중지</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매종료</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>판매금지</label>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">카테고리</label>
                <div className="search-input">
                  <select>
                    <option selected disabled>선택해주세요</option>
                    {console.log(familyData)}
                    {
                      familyData.map((e, i) => {
                        return <option>{e.name}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">결제여부</label>
                <div className="search-input">
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>전체</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>결제가능상품</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>결제불가능상품</label>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">기간</label>
                <div className="sell-input">
                  <DatePicker
                    className="datepicker"
                    dateFormat="yyyy년 MM월 dd일"
                    locale="ko"
                    selected={this.state.first_date}
                    onChange={(first_date) => { this.setState({ first_date }) }}
                  />
                  &nbsp;~&nbsp;
                  <DatePicker
                    className="datepicker"
                    dateFormat="yyyy년 MM월 dd일"
                    locale="ko"
                    selected={this.state.last_date}
                    onChange={(last_date) => { this.setState({ last_date }) }}
                  />
                </div>
              </div>
              <div className="search-button">
                <Button color="primary" style={{marginRight: 10}}>검색</Button>
                <Button color="ghost-primary">초기화</Button>
              </div>
            </div>
            <div className="list-card">
              <div className="list-title">
                <span>
                  상품목록 (총 <span style={{color: "#1B8EB7"}}>{data.length}</span> 개)
                </span>
                <div className="list-sort-box">
                  <div>
                    <select>
                      <option>상품등록일순</option>
                      <option>판매단가높은순</option>
                      <option>판매단가낮은순</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="list-menu">
                <Button style={{marginRight: "10px"}} onClick={() => { this.props.history.push('/product/create'); }} color="primary">엑셀로 보내기</Button>
                <Button style={{marginRight: "10px"}} onClick={() => { this.props.history.push('/product/create'); }} color="primary">품목추가</Button>
                <a className="button-list" style={{display: "inline-block", border: "1px solid #eee", padding: "10px", marginRight: "10px", backgroundColor: show === false ? 'lightgray' : 'transparent'}} onClick={() => {this.props.changeShow()}}><i className="fa fa-th" style={{display: "block"}}></i>
                </a>
                <a className="button-card" style={{display: "inline-block", border: "1px solid #eee", padding: "10px", marginRight: "10px", backgroundColor: show === true ? 'lightgray' : 'transparent'}} onClick={() => {this.props.changeShow()}}><i className="fa fa-th-list" style={{display: "block"}}></i>
                </a>
              </div>
              <div className="list-box">
                <Table className="ListTable" style={{ minWidth: 600 }} hover>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th style={{ width: 150 }}>사진</th>
                      <th>품목명</th>
                      <th style={{ width: 250 }}>품목군</th>
                      <th>판매 단가</th>
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
                      </tr>)
                    })}
                  </tbody>
                </Table>
                <Pagination style={{justifyContent: 'center'}}>
                  {pageNumbers === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPage(pageNumbers-1))}}/>
                  </PaginationItem>
                  }
                  {pageNumbers === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {pageNumbers === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {pageNumbers !== 1 && pageNumbers!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.total >= pageNumbers+e)
                    return (<PaginationItem key={i} active={pageNumbers === pageNumbers+e}>
                      <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPage(pageNumbers+e));}}>
                      {pageNumbers+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {pageNumbers === this.state.total ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPage(pageNumbers+1))}}/>
                  </PaginationItem>}
                </Pagination>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default List;
