import React from "react";
import ListPresenter from "./ListPresenter";
import { API_LIST, FETCH, API } from "../../../api";
import { fi } from "date-fns/locale";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      pageNumbers,
      show,
      keywordP,
      category,
      family,
      stateP,
    } = this.props;

    this.state = {
      listCount: 15,
      loading: true,
      error: null,
      getProduct: [],
      getUserFamilyCategory: [],
      getProductFamily: [],
      getExcel: null,
      getStock: null,
      getStateCount: [],
      getTotal: null,
      pageNumbers: pageNumbers,
      show: show,
      keywordP: keywordP,
      category: category,
      family: family,
      stateP: stateP,
      checkCategory: true,
      stockEdit: false,
      total: 0,
      totalData: 0,
      familyName: 0,
      name: "",
      response: null,
      data: null,
      lastPage: 0,
      totalData: null,
      familyName: 0,
    };
  }
  componentWillMount = () => {
    const { getStateCount, getUserFamilyCategory } = this.state;
    return {
      getStateCount,
      getUserFamilyCategory,
    };
  };

  componentDidMount = async () => {
    try {
      const getProduct = await API_LIST.getProduct(this.props);
      const getUserFamilyCategory = await API_LIST.getUserFamilyCategory();
      const getStock = await API_LIST.getStock(this.props);
      const getTotal = await API_LIST.getTotal(this.props);
      const getStateCount = await API_LIST.getStateCount();
      const getProductFamily = await API_LIST.getProductFamily(this.props);
      this.setState({
        getStock: getStock[1],
        getTotal: getTotal,
        getStateCount: getStateCount,
      });
      this.setState(
        { getUserFamilyCategory: getUserFamilyCategory },
        () => getProduct
      );
      this.setState({ getProductFamily: getProductFamily }, () => getProduct);
      this.setState({
        lastPage: Math.ceil(getTotal[0].total / this.state.listCount),
        totalData: getTotal[0].total,
      });
      this.setState({ getProduct: getProduct },()=>getTotal);
    } catch {
      this.setState({
        error: "Error !!",
        checkCategory: false,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  changeCategory = (id) => {
    this.setState({}, () => this.state.getProductFamily);
  };
  changeFamily = (familyName) => {
    console.log(familyName)
    this.setState({ familyName:familyName }, () => {
      return this.state.getProduct;
    });
  };

  changeStockEdit() {
    this.setState({ stockEdit: !this.state.stockEdit });
  }

  searchProduct = () => {
    console.log(this.state.getProduct)
    return this.state.getProduct;
  };

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  resetInput() {
    var reset_input = document.getElementsByClassName("searchbox-input");
    for (var i = 0; i < reset_input.length; i++) {
      reset_input[i].value = null;
    }
  }

  countPageNumber = () => {
    this.setState(
      {
        familyName: 0,
      },
      () => {
        return this.state.getProduct;
      }
    );
  };

  render() {
    const {
      loading,
      error,
      props,
      listCount,
      getUserFamilyCategory,
      getProductFamily,
      getProduct,
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
      lastPage,
    } = this.state;
    return (
      <ListPresenter
        loading={loading}
        error={error}
        getUserFamilyCategory={getUserFamilyCategory}
        getProductFamily={getProductFamily}
        getExcel={getExcel}
        getStock={getStock}
        getTotal={getTotal}
        getProduct={getProduct}
        getStateCount={getStateCount}
        pageNumbers={pageNumbers}
        checkCategory={checkCategory}
        totalData={totalData}
        familyName={familyName}
        props={this.props}
        lastPage={lastPage}
        changeCategory={this.changeCategory}
        changeFamily={this.changeFamily}
        changeStockEdit={this.changeStockEdit}
        searchProduct={this.searchProduct}
        resetInput={this.resetInput}
        numberWithCommas={this.numberWithCommas}
        countPageNumber={this.countPageNumber}
      />
    );
  }
}
