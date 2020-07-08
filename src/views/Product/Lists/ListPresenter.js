import React from "react";
import { Container } from "reactstrap";
import {
  Button,
  Col,
  Row,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Badge,
} from "reactstrap";

const LIstPresenter = ({
  loading,
  getUserFamilyCategory,
  getProductFamily,
  getExcel,
  getStock,
  getTotal,
  getStateCount,
  pageNumbers,
  checkCategory,
  totalData,
  familyName,
  getProduct,
  changeCategory,
  lastPage,
  changeFamily,
  changeStockEdit,
  searchProduct,
  resetInput,
  props,
  listCount,
  numberWithCommas,
  countPageNumber,
}) => {
  const _state = ["판매 중", "품절", "판매 중지"];
  const arr = [-2, -1, 0, 1, 2];
  const arr1 = [];
  var product = getProduct
  return (
    <div className="animated fadeIn">
      <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
      <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
      <Row>
        <Col>
          <Table className="category-top">
            <tbody>
              <tr>
                {loading ? null : (
                  <>
                    {getUserFamilyCategory.length > 0 ? (
                      <td
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            props.category === 0 ? "#E6E6E6" : "#fff",
                        }}
                        onClick={() => {
                          changeCategory(props.checkCategoryId(0));
                        }}
                      >
                        전체
                      </td>
                    ) : null}
                    {checkCategory ? (
                      getUserFamilyCategory.map((e, i) => {
                        return (
                          <td
                            key={i}
                            style={{
                              cursor: "pointer",
                              backgroundColor:
                                props.category === e.id ? "#E6E6E6" : "#fff",
                            }}
                            onClick={() => {
                              changeCategory(props.checkCategoryId(e.id));
                            }}
                          >
                            {e.name}
                          </td>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "left", padding: 30 }}>
                        <div style={{ display: "table-cell" }}>
                          <i
                            style={{ marginRight: 10 }}
                            className="fa fa-exclamation-circle"
                          ></i>
                        </div>
                        <div style={{ display: "table-cell" }}>
                          품목군을 설정해서 품목 관리를 시작하세요. <br></br>(
                          우측상단의 회원정보 또는 품목군 추가하기 버튼을 통해
                          설정이 가능합니다. )
                        </div>
                        <div
                          style={{
                            display: "table-cell",
                            paddingLeft: 50,
                            verticalAlign: "middle",
                          }}
                        >
                          <Button
                            color="primary"
                            onClick={() => {
                              props.history.push("/main/registerdetail");
                            }}
                          >
                            품목군 추가하기
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </tr>
            </tbody>
          </Table>
          <div className="status-box">
            <ul className="status-list">
              <li>
                <i className="fa fa-list-alt"></i>
                <div className="status-list-text">
                  <p>전체</p>
                  <strong>
                    {getStateCount[0] +
                      getStateCount[1] +
                      getStateCount[2] +
                      ""}
                  </strong>
                  <span>건</span>
                </div>
              </li>
              <li>
                <i className="fa fa-list-alt"></i>
                <div className="status-list-text">
                  <p>판매중</p>
                  <strong>{getStateCount[0]}</strong>
                  <span>건</span>
                </div>
              </li>
              <li>
                <i className="fa fa-list-alt"></i>
                <div className="status-list-text">
                  <p>품절</p>
                  <strong>{getStateCount[1]}</strong>
                  <span>건</span>
                </div>
              </li>
              <li>
                <i className="fa fa-list-alt"></i>
                <div className="status-list-text">
                  <p>판매중지</p>
                  <strong>{getStateCount[2]}</strong>
                  <span>건</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="search-box">
            <div className="search-list">
              <label className="search-label">품목검색</label>
              <div className="search-input">
                <Input
                  className="searchbox-input"
                  placeholder="품목명을 검색해주세요."
                  style={{ width: "30%" }}
                  onChange={(e) => {
                    props.searchKeywordP(e.target.value);
                  }}
                ></Input>
              </div>
            </div>
            <div className="search-list">
              <label className="search-label">판매상태</label>
              <div className="search-input">
                <label className="search-input-label">
                  <input
                    className="search-input-checkbox"
                    name="state"
                    type="radio"
                    onChange={() => {
                      props.changeStateP(0);
                    }}
                    checked={props.stateP === 0}
                  />
                  전체
                </label>
                <label className="search-input-label">
                  <input
                    className="search-input-checkbox"
                    name="state"
                    type="radio"
                    onChange={() => {
                      props.changeStateP(1);
                    }}
                  />
                  판매중
                </label>
                <label className="search-input-label">
                  <input
                    className="search-input-checkbox"
                    name="state"
                    type="radio"
                    onChange={() => {
                      props.changeStateP(2);
                    }}
                  />
                  품절
                </label>
                <label className="search-input-label">
                  <input
                    className="search-input-checkbox"
                    name="state"
                    type="radio"
                    onChange={() => {
                      props.changeStateP(3);
                    }}
                  />
                  판매중지
                </label>
              </div>
            </div>

            <div className="search-list">
              <label className="search-label">품목군</label>
              <div className="search-input">
                <label className="search-input-label">
                  <input
                    className="search-input-checkbox"
                    name="family"
                    type="radio"
                    onChange={() => {
                      familyName = props.checkFamily(0);
                    }}
                    checked={props.family === 0}
                  />
                  전체
                </label>
                {getProductFamily.map((e, i) => {
                  return (
                    <label key={i} className="search-input-label">
                      <input
                        className="search-input-checkbox"
                        name="family"
                        type="radio"
                        onChange={() => {
                          familyName = props.checkFamily(e.id);
                        }}
                      />
                      {e.name}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="search-button">
              <Button
                color="primary"
                style={{ marginRight: 10 }}
                onClick={() => {
                  console.log(familyName)
                  searchProduct();
                  changeFamily(familyName);
                }}
              >
                검색
              </Button>
              <Button
                color="ghost-primary"
                onClick={() => {
                  props.searchKeywordP("");
                  resetInput();
                }}
              >
                초기화
              </Button>
            </div>
          </div>
          <div className="list-card">
            <div className="list-title">
              <span>
                상품목록 (총{" "}
                <span style={{ color: "#1B8EB7" }}>{totalData}</span>
                개)
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
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  props.history.push("/product/create");
                }}
                color="primary"
              >
                엑셀로 보내기
              </Button>
              <Button
                style={{ marginRight: "10px" }}
                onClick={() => {
                  props.history.push("/product/create");
                }}
                color="primary"
              >
                품목추가
              </Button>
              <a
                className="button-list"
                style={{
                  display: "inline-block",
                  border: "1px solid #eee",
                  padding: "10px",
                  marginRight: "10px",
                  backgroundColor:
                    props.show === false ? "lightgray" : "transparent",
                }}
                onClick={() => {
                  props.changeShow();
                }}
              >
                <i className="fa fa-th" style={{ display: "block" }}></i>
              </a>
              <a
                className="button-card"
                style={{
                  display: "inline-block",
                  border: "1px solid #eee",
                  padding: "10px",
                  marginRight: "10px",
                  backgroundColor:
                    props.show === true ? "lightgray" : "transparent",
                }}
                onClick={() => {
                  props.changeShow();
                }}
              >
                <i className="fa fa-th-list" style={{ display: "block" }}></i>
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
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((e, i) => {
                    return (
                      <tr
                        style={{ height: "150px" }}
                        key={e.id}
                        onClick={() => {
                          props.history.push({
                            pathname: "/main/product/" + e.id,
                          });
                        }}
                      >
                        <td>{e.id}</td>
                        <td>
                          <img
                            style={{ width: "90%" }}
                            alt="품목 사진"
                            src={
                              e.file_name
                                ? process.env.REACT_APP_HOST +
                                  "/static/" +
                                  e.file_name
                                : "318x180.svg"
                            }
                          />
                        </td>
                        <td>{e.name + " " + e.grade + " " + e.weight}</td>
                        <td>{e.familyName}</td>
                        <td>{numberWithCommas(e["price_shipping"])}&nbsp;원</td>
                        <td>{e.stock}</td>
                        <td>
                          <h4>
                            {e.state - 1 === 0 ? (
                              <Badge color="primary">
                                {_state[e.state - 1]}
                              </Badge>
                            ) : e.state - 1 === 1 ? (
                              <Badge color="danger">
                                {_state[e.state - 1]}
                              </Badge>
                            ) : (
                              <Badge color="secondary">
                                {_state[e.state - 1]}
                              </Badge>
                            )}
                          </h4>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Pagination style={{ justifyContent: "center" }}>
                {pageNumbers === 1 ? (
                  ""
                ) : (
                  <PaginationItem>
                    <PaginationLink
                      previous
                      onClick={() => {
                        countPageNumber(
                          props.clickConvertPage(pageNumbers - 1)
                        );
                      }}
                    />
                  </PaginationItem>
                )}
                {pageNumbers === 1
                  ? arr.forEach((x) => arr1.push(x + 2))
                  : null}
                {pageNumbers === 2
                  ? arr.forEach((x) => arr1.push(x + 1))
                  : null}
                {pageNumbers !== 1 && pageNumbers !== 2
                  ? arr.forEach((x) => arr1.push(x))
                  : null}
                {arr1.map((e, i) => {
               //   console.log("e:",e , "pageNumbers :" , pageNumbers , "lastPage:",lastPage)
                  if (lastPage >= pageNumbers + e)
                    return (
                      <PaginationItem
                        key={i}
                        active={pageNumbers === pageNumbers + e}
                      >
                        <PaginationLink
                          onClick={() => {
                            countPageNumber(
                              props.clickConvertPage(pageNumbers + e)
                            );
                          }}
                        >
                          {pageNumbers + e}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  return null;
                })}
                {pageNumbers === lastPage ? (
                  ""
                ) : (
                  <PaginationItem>
                    <PaginationLink
                      next
                      onClick={() => {
                        countPageNumber(
                          props.clickConvertPage(pageNumbers + 1)
                        );
                      }}
                    />
                  </PaginationItem>
                )}
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LIstPresenter;
