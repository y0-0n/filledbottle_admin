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
      loading: true,
      error: null,
      getUserFamilyCategory: null,
      getProductFamily: null,
      getExcel: null,
      getStock: null,
      getStateCount: null,
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
    };
  }
  // componentWillMount = () => {
  //   try {
  //  //   const getProduct = FETCH.getProduct(this.props);
  //     const getTotal = FETCH.getTotal(this.props);
  //     const getUserFamilyCategory = FETCH.getUserFamilyCategory();
  //     const getStock = FETCH.getStock(this.props)
  //     const getExcel = FETCH.getExcel();
  //     const getProductFamily =FETCH.getProductFamily(this.props);

  //     this.setState({
  //   //    getProduct: getProduct,
  //       getTotal: getTotal,
  //       getExcel:getExcel,
  //       getStock:getStock,
  //     });
  //     this.setState({ getUserFamilyCategory: getUserFamilyCategory },()=>getProductFamily);
  //    // this.setState({ getProductFamily: getProductFamily },()=>getProduct);
  //   } catch {
  //     this.setState({
  //       error: "API_LIST 데이터를 불러오지 못함.",
  //     });
  //   } finally {
  //     this.setState({
  //       loading: false,
  //     });
  //   }  };

  async componentDidMount() {
    try{
    await  console.log( API_LIST.getProduct(this.props))
    }catch{

    }finally{

    }
  }

  changeCategory = (id) => {
		this.setState({}, () => {
      this.getProductFamily();
    });
  }

  render() {
    const {
      loading,
      error,
      props,
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
    } = this.state;
    console.log(getProduct)
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
        show={show}
        keywordP={keywordP}
        category={category}
        family={family}
        stateP={stateP}
        checkCategory={checkCategory}
        stockEdit={stockEdit}
        total={total}
        totalData={totalData}
        familyName={familyName}
        name={name}
        props={props}
        changeCategory={this.changeCategory}
      />
    );
  }
}
