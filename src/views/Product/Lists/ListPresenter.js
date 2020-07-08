import React from "react";
import { Container } from "reactstrap";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardImg,
  Col,
  Row,
  Input,
  CardTitle,
  CardSubtitle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  FormGroup,
  Badge,
  InputGroup,
  InputGroupAddon,
  UncontrolledButtonDropdown,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

 const LIstPresenter = ({
  loading,
  props,
  getUserFamilyCategory,
  getProductFamily,
  getExcel,
  getStock,
  getTotal,
  getStateCount,
  pageNumbers,
  show,
  keywordP,
  category,
  family,
  stateP,
  checkCategory,
  stockEdit,
  total,
  totalData,
  familyName,
  name,
  getProduct,
  changeCategory
}) => {
  const listCount = 15;
  const _state = ["판매 중", "품절", "판매 중지"];
  const arr = [-2, -1, 0, 1, 2];
  const arr1 = [];
  console.log(getProduct)
  return (
    // <div className="animated fadeIn">
    //   <link rel="stylesheet" type="text/css" href="css/ListCopy.css"></link>
    //   <link rel="stylesheet" type="text/css" href="css/Product.css"></link>
    //   <Row>
    //     <Col>
    //       <Table className="category-top">
    //         <tbody>
    //           <tr>
    //             {loading ? null : (
    //               <>
    //                 {getUserFamilyCategory ? (
    //                   <td
    //                     style={{
    //                       cursor: "pointer",
    //                       backgroundColor:
    //                         category === 0 ? "#E6E6E6" : "#fff",
    //                     }}
    //                     onClick={() => {
    //                       this.changeCategory(props.checkCategoryId(0));
    //                     }}
    //                   >
    //                     전체
    //                   </td>
    //                 ) : null}
    //                 {checkCategory ? (
    //                   getUserFamilyCategory.map((e, i) => {
    //                     return (
    //                       <td
    //                         key={i}
    //                         style={{
    //                           cursor: "pointer",
    //                           backgroundColor:
    //                             category === e.id
    //                               ? "#E6E6E6"
    //                               : "#fff",
    //                         }}
    //                         onClick={() => {
    //                           this.changeCategory(
    //                             props.checkCategoryId(e.id)
    //                           );
    //                         }}
    //                       >
    //                         {e.name}
    //                       </td>
    //                     );
    //                   })
    //                 ) : (
    //                   <div style={{ textAlign: "left", padding: 30 }}>
    //                     <div style={{ display: "table-cell" }}>
    //                       <i
    //                         style={{ marginRight: 10 }}
    //                         className="fa fa-exclamation-circle"
    //                       ></i>
    //                     </div>
    //                     <div style={{ display: "table-cell" }}>
    //                       품목군을 설정해서 품목 관리를 시작하세요. <br></br>(
    //                       우측상단의 회원정보 또는 품목군 추가하기 버튼을 통해
    //                       설정이 가능합니다. )
    //                     </div>
    //                     <div
    //                       style={{
    //                         display: "table-cell",
    //                         paddingLeft: 50,
    //                         verticalAlign: "middle",
    //                       }}
    //                     >
    //                       <Button
    //                         color="primary"
    //                         onClick={() => {
    //                           this.props.history.push("/main/registerdetail");
    //                         }}
    //                       >
    //                         품목군 추가하기
    //                       </Button>
    //                     </div>
    //                   </div>
    //                 )}
    //               </>
    //             )}
    //           </tr>
    //         </tbody>
    //       </Table>
    //     </Col>
    //   </Row>
    // </div>
    <>{  console.log(getProduct)    }</>
  );
};

export default LIstPresenter