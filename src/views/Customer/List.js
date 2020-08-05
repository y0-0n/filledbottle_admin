import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, CardFooter, CardImg, Col, Row, Input,
  CardTitle, CardSubtitle, Table, Pagination, PaginationItem, PaginationLink, FormGroup,
  InputGroup, InputGroupAddon, UncontrolledButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
/*

  GET /customer/state

  -> this.state.data

  id : 주문 번호
  name : 고객 이름
  telephone : 전화번호
  cellphone : HP
  address : 주소
  이미지

*/
const listCount = 15;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      //page: 1,
      //keyword: '',
      checkdata: [],
      checks: [],
      totalData : 0,
    };
    this.form = {
    }
  }

  componentWillMount() {
    this.getCustomer();
    }

  getTotal() {
    const keyword = this.props.keywordC;

    fetch(process.env.REACT_APP_HOST+"/customer/total", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({keyword})
    })
    .then(response => {
      if(response.status === 401) {
        return Promise.all([401])
      } else {
        return Promise.all([response.status, response.json()]);
      }
    })
    .then(data => {
      const status = data[0];
      if(status === 200) {
        this.setState({total: Math.ceil(data[1][0].total/listCount), totalData: data[1][0].total})
      } else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
    });
  }

  getCustomer() {
    const keyword = this.props.keywordC;
    const page = this.props.pageNumbersC;

    fetch(process.env.REACT_APP_HOST+"/customer/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({page, keyword})
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
        this.setState({ data: data[1] });
      else {
        alert('로그인 하고 접근해주세요')
        this.props.history.push('/login')
      }
      this.getTotal();
    })
  }


  countPageNumber(x){
    this.setState({
      //page: x,
    }, () => {
      this.getCustomer();
    });
  }

  deleteCustomer(id) {
    let c = window.confirm('위 고객을 비활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer", {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
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
            this.getCustomer()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  activateCustomer(id) {
    let c = window.confirm('위 고객을 활성화하시겠습니까?')
    if (c) {
      fetch(process.env.REACT_APP_HOST + "/customer", {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          id
        })
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
            this.getCustomer()
          else {
            alert('로그인 하고 접근해주세요')
            this.props.history.push('/login')
          }
        });
    }
  }

  searchCustomer() {
    this.getCustomer();
	}
	
	sendMessage() {
    fetch(process.env.REACT_APP_HOST + `/api/kakao/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then(response => {

				console.warn(response)
        if (response.status === 401) {
          return Promise.all([401])
        } else {
          return Promise.all([response.status, response.json()]);
        }
      })
      .then(data => {
				let status = data[0];
        if (status === 200) {
					console.warn("성공")
				}
        else {
					console.warn(data[0]);
          alert(' 오류');
        }
      });
	}

  /*changeSet() {
    this.setState({set: !this.state.set, number: 1}, () => {
      this.getCustomer();
    });
  }*/

  resetInput() {
    var reset_input = document.getElementsByClassName('searchbox-input')
    for(var i = 0; i < reset_input.length; i++) {
      reset_input[i].value = null;
      console.log(i);
    }
  }

  render() {
    var data = this.state.data;
    const arr = [-2, -1, 0, 1, 2];
    const arr1 = [];
    data.map((e, i) => {this.state.checks[i] = false});
    return (
      <div className="animated fadeIn">
        <link rel="stylesheet" type="text/css" href="css/Table.css"></link>
        <link rel="stylesheet" type="text/css" href="css/Customer.css"></link>
        <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
        <div>
          <div className="search-box">
            <div className="search-list">
              <label className="search-label">고객검색</label>
              <div className="sell-input">
                <Input className="searchbox-input" placeholder="고객명을 검색해주세요." style={{width: "30%"}} onChange={(e) => { this.props.searchKeywordC(e.target.value) }} />
              </div>
            </div>
            <div className="search-button" style={{textAlign: 'center', paddingBottom: "10px"}}>
              <Button color="primary" style={{marginRight: 10}} onClick={() => { this.searchCustomer(this.props.keywordC); }}>검색</Button>
              <Button color="ghost-primary" onClick={() => { this.props.searchKeywordC(''); this.resetInput(); }}>초기화</Button>
            </div>
          </div>
        </div>
        <div className="list-card">
          <div className="list-title">
            <span>
              고객목록 (총 <span style={{color: "#1B8EB7"}}>{this.state.totalData}</span> 개)
            </span>
          </div>
          <div className="list-box">
            <div className="list-menu-customer">
              {/* <UncontrolledButtonDropdown>
                <DropdownToggle caret color="primary">
                  더 보기
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => { this.props.history.push('/main/customer/list/unset') }}>비활성화</DropdownItem>
                  <DropdownItem onClick={() => {
                    // let { checkdata } = this.state;
                    // for (var i = 0; i < this.state.checks.length; i++) {
                    //   if (this.state.checks[i] === true) {
                    //     checkdata[i] = data[i];
                    //   }
                    // }
                    // this.props.history.push({
                    //   pathname: '/main/message',
                    //   state: checkdata
                    // });
                    // alert('A')
                    // this.sendMessage();
                  }}>카카오톡 보내기</DropdownItem>
                  <DropdownItem onClick={() => { this.props.history.push('/customer/create'); }}>고객등록</DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown> */}

              <div style={{float: "right"}}>
                <Button style={{marginBottom: 10}} onClick={() => { this.props.history.push('/customer/create'); }} color="primary">고객 등록</Button>
              </div>
            </div>

            <Table className="ListTable" hover>
              <thead>
                <tr>
                  <th className="list-hidden">no.</th>
                  <th>고객명</th>
                  <th className="list-hidden">연락처</th>
                  <th>주소</th>
                  {//<th>수정</th>
                  }
                  <th>선택</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  return (<tr onClick={() => {this.props.history.push(`/main/customer/${e.id}`)}} style={{ cursor: 'pointer' }} key={e.id}>
                    <td className="list-hidden">{e.id}</td>
                    <td>{e.name}</td>
                    <td className="list-hidden">{e.cellphone}</td>
                    <td>{e.address} {e.addressDetail} ({e.postcode})</td>
                    {//<td><Button onClick={() => {this.props.history.push(`/main/customer/edit/:id}`)}}>수정</Button></td>
                    }
                    <td onClick="event.cancelBubble=true" ><input name='selection' type='checkbox' onClick={() => {
                      let {checks} = this.state;
                      checks[i] = !checks[i];
                    }}/></td>
                  </tr>)
                })}
              </tbody>
            </Table>
          </div>
          <Pagination style={{justifyContent: 'center'}}>
            {this.props.pageNumbersC === 1 ? '' :
            <PaginationItem>
              <PaginationLink previous onClick={() => {this.countPageNumber(this.props.clickConvertPageC(this.props.pageNumbersC-1))}}/>
            </PaginationItem>
            }
            {this.props.pageNumbersC === 1 ? arr.forEach(x => arr1.push(x+2)) : null}
            {this.props.pageNumbersC === 2 ? arr.forEach(x => arr1.push(x+1)) : null}
            {this.props.pageNumbersC !== 1 && this.props.pageNumbersC!== 2 ? arr.forEach(x => arr1.push(x)) :null }
            {arr1.map((e, i) => {
              if(this.state.total >= this.props.pageNumbersC+e)
              return (<PaginationItem key={i} active={this.props.pageNumbersC === this.props.pageNumbersC+e}>
                <PaginationLink onClick={() => {this.countPageNumber(this.props.clickConvertPageC(this.props.pageNumbersC+e)); console.log(this.props.pageNumbersC)}}>
                {this.props.pageNumbersC+e}
                </PaginationLink>
              </PaginationItem>)
              return null;
            })}
            {this.props.pageNumbersC === this.state.total ? '' :
            <PaginationItem>
              <PaginationLink next onClick={() => {this.countPageNumber(this.props.clickConvertPageC(this.props.pageNumbersC+1))}}/>
            </PaginationItem>}
          </Pagination>
        </div>
      </div>
    )
  }
}



export default List;
