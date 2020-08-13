import React, { Component } from 'react';
import { Button, Col, Row, Input,
   Table, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import Switch from "../Switch/Switch";
import ImageModal from '../Modal/ImageModal';
import Popup from "reactjs-popup";
import ProductFamilyModal from '../Modal/ProductFamilyModal';
import DatePicker from "react-datepicker";
import ReactToPrint from 'react-to-print';
import _fetch from '../../fetch';
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
const _state = [
  '판매 중',
  '품절',
  '판매 중지'
]

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCount: [],
      //productData_cafe24: [],
      productData: [],
      stockData: [],
      //page: 1,
      name: '',
      //set: true,
      stockEdit: false,
			familyData: [],
      userCategoryData: [],
      checkCategory: true,
      total: 0,
      totalData: 0,
      familyName: 0,
		};
    //this.name = '';
    this.form = {

		}

  }
  componentDidMount() {
		this.getUserFamilyCategory();
		this.getStateCount();
    //this.getCafe24Product();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pageNumbersP !== this.props.pageNumbersP) {
      this.getProduct()
    }

    if (prevProps.category !== this.props.category) {
      this.getProductFamily();
    }

    if (prevState.userCategoryData !== this.state.userCategoryData) {
      this.getProductFamily();
    }

    if (prevState.familyData !== this.state.familyData) {
      this.getProduct();
    }

    if (prevState.productData !== this.state.productData) {
      this.getTotal();
    }    
  }
	
	//상태별 품목 개수를 가져옴
	getStateCount() {
    _fetch("/api/product/stateCount", "GET", null, (data) => {
      let stateCount = [];
      for(var i =0 ; i < 3; i++) {
        stateCount[i] = 0
      }
      data[1].map((e,i) => {
        if(e.count)
          stateCount[e.state-1] = e.count
      })
      this.setState({ stateCount })
    });
	}


  //사용자의 (검색 결과에 해당하는) 품목의 개수를 받아옴
  getTotal() {
    const name = this.props.keywordP;
    const {category, family} = this.props;
    const state = this.props.stateP;
    _fetch('/product/total/', 'POST', {name, family, category, state}, (data) => {
      this.setState({ lastPage: Math.ceil(data[0].total / listCount), totalData: data[0].total })
    });
	}

	getUserFamilyCategory() {
    _fetch("/api/product/userFamilyCategory", "GET", null, (data) => {
      if(data[1].length !== 0) {
        //this.props.checkCategoryId(data[1][0].id)
        this.setState({ userCategoryData: data });
      } else {
        this.setState({
          checkCategory: false
        })
      }
    });
	}

	getProduct() {
    const name = this.props.keywordP;
    const page = this.props.pageNumbersP;
    const {category, family} = this.props;
    const state = this.props.stateP
    _fetch('/product/list', 'POST', {page, name, family, category, state}, (data) => {
      this.setState({ productData: data })
    });
  }

  getStock() {
    const page = this.props.pageNumbersP;
    const name = this.props.keywordP;
    const {category, family} = this.props;

    _fetch("/api/stock/sum", "POST", {page, name, category, family}, (data) => {
      this.setState({stockData: data})
    })
	}
	
  excel() {
    _fetch("/api/product/excel", "GET", null, (data) => {
      //this.setState({ stockData: data[1] });
    });
  }

  changeStockEdit() {
    // this.getStock();
    this.setState({ stockEdit: !this.state.stockEdit })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // changeSet() {
  //   this.setState({set: !this.state.set}, () => {
  //     this.getProduct();
  //   });
	// }


  getProductFamily() {
    _fetch("/api/product/familyList/"+this.props.category, "GET", null, (data) => {
      this.setState({ familyData: data[1] });
    });
  }

  // getCafe24Product() {
  //   fetch('https://cors-anywhere.herokuapp.com/https://ast99.cafe24api.com/api/v2/admin/products', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + localStorage.getItem('cafe24AccessToken'),
  //       'Content-Type' : 'application/json',

  //     },
  //   })

  //   .then(response => {
  //     if (response.status === 401) {
  //       return Promise.all([401])
  //     } else {
  //       return Promise.all([response.status, response.json()]);
  //     }
  //   })
  //   .then(data => {
  //     let status = data[0];
  //     if (status === 200){
  //       this.setState({ productData_cafe24: data[1].products })
  //       console.log(this.state.productData_cafe24)
  //     }
  //     else {
  //       alert('로그인 하고 접근해주세요');
  //       this.props.history.push('/login');
  //     }
  //   })
  // }

  resetInput() {
    var reset_input = document.getElementsByClassName('searchbox-input')
    for(var i = 0; i < reset_input.length; i++) {
      reset_input[i].value = null;
      console.log(i,'reset');
    }
    this.setState({familyName: this.props.checkFamily(0)})
    this.props.changeStateP(0)
  }

  scrollBtn(type) {
    if (type === 'left')
      document.getElementById('category-list').scrollLeft -= 150;
    else
      document.getElementById('category-list').scrollLeft += 150;
  }

  render() {
    console.log(this.state.familyName)
    var data = this.state.productData;
    //var data_cafe24 = this.state.productData_cafe24;
    var {stockData, familyData, userCategoryData, stateCount} = this.state;
    var { show, pageNumbersP} = this.props;
    const arr = [-2, -1, 0, 1, 2];
		const arr1 = [];
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <Row>
          <Col>
            <div className="category-box list-hidden">
              <div className="category-btn" onClick={()=> {this.scrollBtn('left')}}>
                <img src="/img/left-arrow.png" />
              </div>
              <div className="category-list">
                <ul id="category-list">
                  { userCategoryData.length > 0 ? <li style={{cursor: "pointer", backgroundColor: this.props.category===0 ? '#E6E6E6' : '#fff'}} onClick={() => {this.props.checkCategoryId(0)}}>전체</li>  : null}
                  { this.state.checkCategory ?
                    userCategoryData.map((e, i) => {
                    return <li key={i} style={{cursor: "pointer", backgroundColor: this.props.category===e.id ? '#E6E6E6' : '#fff'}} onClick={() => {this.props.checkCategoryId(e.id)}}>{e.name}</li>
                  })
                  :
                  <div style={{textAlign: "left", padding: 30}}>
                    <div style={{ display: "table-cell" }}>
                      <i style={{ marginRight: 10 }} className="fa fa-exclamation-circle"></i>
                    </div>
                    <div style={{ display: "table-cell" }}>
                      첫번째 품목을 등록해보세요. <br></br>
                      ( 상단의 품목등록 메뉴 또는 바로가기 버튼을 통해 등록이 가능합니다. )
                    </div>
                    <div style={{ display: "table-cell", paddingLeft: 50, verticalAlign: "middle"}}>
                      <Button color="primary" onClick={() => { this.props.history.push('/product/create') }}>바로가기</Button>
                    </div>
                  </div>
                  }
                </ul>
              </div>
              <div className="category-btn" onClick={()=> {this.scrollBtn('right')}}>
                <img src="/img/right-arrow.png" />
              </div>
            </div>
            <div className="status-box list-hidden">
              <ul className="status-list">
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>전체</p>
                    <strong>{stateCount[0] + stateCount[1] + stateCount[2]+""}</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>판매중</p>
                    <strong>{stateCount[0]}</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>품절</p>
                    <strong>{stateCount[1]}</strong>
                    <span>건</span>
                  </div>
                </li>
                <li>
                  <i className="fa fa-list-alt"></i>
                  <div className="status-list-text">
                    <p>판매중지</p>
                    <strong>{stateCount[2]}</strong>
                    <span>건</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="search-box">
              <div className="search-list">
                <label className="search-label">품목검색</label>
                <div className="sell-input">
                  <Input className="searchbox-input" placeholder="품목명을 검색해주세요." style={{width : "30%"}} onChange={(e) => { this.props.searchKeywordP(e.target.value) }}></Input>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">판매상태</label>
                <div className="search-input">
                  <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" onChange={()=>{this.props.changeStateP(0)}} checked={this.props.stateP===0}/>전체</label>
                  <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" onChange={()=>{this.props.changeStateP(1)}}/>판매중</label>
                  <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" onChange={()=>{this.props.changeStateP(2)}}/>품절</label>
                  <label className="search-input-label"><input className="search-input-checkbox" name="state" type="radio" onChange={()=>{this.props.changeStateP(3)}}/>판매중지</label>
                </div>
              </div>
              <div className="search-list">
                <label className="search-label">품목군</label>
                <div className="search-input">
                <label className="search-input-label"><input className="search-input-checkbox" name="family" type="radio" onChange={()=>{this.setState({familyName: this.props.checkFamily(0)})}} checked={this.props.family===0}/>전체</label>
                  {
                    familyData.map((e, i) => {
                      return <label key={i} className="search-input-label"><input className="search-input-checkbox" name="family" type="radio" onChange = {() => {this.setState({familyName: this.props.checkFamily(e.id)})}}/>{e.name}</label>
                    })
                  }
                </div>
              </div>
              {/*<div className="search-list">
                <label className="search-label">결제여부</label>
                <div className="search-input">
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>전체</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>결제가능상품</label>
                  <label className="search-input-label"><input className="search-input-checkbox" type="checkbox"/>결제불가능상품</label>
                </div>
              </div>*/}
              {/*<div className="search-list">
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
              </div>*/}
              <div className="search-button">
                <Button color="primary" style={{marginRight: 10}} onClick={()=> {this.getProduct();}}>검색</Button>
                <Button color="ghost-primary" onClick={() => { this.props.searchKeywordP(''); this.resetInput(); }}>초기화</Button>
              </div>
            </div>
            <div className="list-card">
              <div className="list-title">
                <span>
                  상품목록 (총 <span style={{color: "#1B8EB7"}}>{this.state.totalData}</span> 개)
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
                <Table className="ListTable" hover>
                  <thead>
                    <tr>
                      <th className="list-hidden">No.</th>
                      <th className="list-hidden" style={{ width: 150 }}>사진</th>
                      <th>품목명</th>
                      <th className="list-hidden" style={{ width: 250 }}>품목군</th>
                      <th>판매 단가</th>
                      <th>재고</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((e, i) => {
                      return (<tr style={{height : "150px"}} key={e.id} onClick={() => {
                        this.props.history.push({
                          pathname: '/main/product/' + e.id,
                        })
                      }}>
                        <td className="list-hidden">{e.id}</td>
                        <td className="list-hidden">
                          <img style={{ width: '90%' }} alt="품목 사진" src={e.file_name ? process.env.REACT_APP_HOST+"/static/" + e.file_name : '318x180.svg'} />
                        </td>
                        <td>{e.name}</td>
                        <td className="list-hidden">{e.familyName}</td>
                        <td>{this.numberWithCommas(e['price_shipping'])}&nbsp;원</td>
                        <td>{e.stock}</td>
                        <td>
                        	<h4>{e.state-1===0 ? <Badge color="primary">{_state[e.state-1]}</Badge> : e.state-1 === 1 ? <Badge color="danger">{_state[e.state-1]}</Badge> : <Badge color="secondary">{_state[e.state-1]}</Badge>}</h4>
                        </td>
                      </tr>)
                    })}
                  </tbody>
                </Table>
                <Pagination style={{justifyContent: 'center'}}>
                  {pageNumbersP === 1 ? '' :
                  <PaginationItem>
                    <PaginationLink previous onClick={() => {this.props.clickConvertPageP(pageNumbersP-1)}}/>
                  </PaginationItem>
                  }
                  {pageNumbersP === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
                  {pageNumbersP === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
                  {pageNumbersP !== 1 && pageNumbersP!== 2 ? arr.forEach(x => arr1.push(x)) :null }
                  {arr1.map((e, i) => {
                    if(this.state.lastPage >= pageNumbersP+e)
                    return (<PaginationItem key={i} active={pageNumbersP === pageNumbersP+e}>
                      <PaginationLink onClick={() => {this.props.clickConvertPageP(pageNumbersP+e);}}>
                      {pageNumbersP+e}
                      </PaginationLink>
                    </PaginationItem>)
                    return null;
                  })}
                  {pageNumbersP === this.state.lastPage ? '' :
                  <PaginationItem>
                    <PaginationLink next onClick={() => {this.props.clickConvertPageP(pageNumbersP+1)}}/>
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
