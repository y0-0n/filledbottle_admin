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
  getProduct
}) => {
  const listCount = 15;
  const _state = ["판매 중", "품절", "판매 중지"];
  const arr = [-2, -1, 0, 1, 2];
  const arr1 = [];
  return <>{loading ? console.log(loading) : console.log(getProduct)}</>;
};

export default LIstPresenter