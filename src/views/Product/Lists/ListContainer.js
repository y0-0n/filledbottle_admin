import React from "react";
import ListPresenter from "./ListPresenter";
import { API_LIST } from "../../../api";

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
      checkCategory:true,
      stockEdit: false,
      total: 0,
      totalData: 0,
      familyName: 0,
      name:""
    };
  }
  componentWillMount = async () => {
    try {
      const {
        data: getUserFamilyCategory,
      } = await API_LIST.getUserFamilyCategory();
      const { data: getStateCount } = await API_LIST.getStateCount();
      this.setState({
        getUserFamilyCategory:getUserFamilyCategory,
        getStateCount: getStateCount,
      });
    } catch {
    } finally {
      this.setState({
        loading: false,
      });
    }
  };



  async componentDidMount () {
    console.log(this.props)
    const { category, family, stateP,keywordP:name,pageNumbers:page } = this.props;
 await   console.log(    API_LIST.getProduct(name, page, category, family, stateP))
    try {
          const { data: getProductFamily } = await API_LIST.getProductFamily(
            category
          );
          const { data: getExcel } = await API_LIST.getExcel();
          const { data: getStock } = await API_LIST.getStock();
          const { data: getTotal } = await API_LIST.getTotal();
          const { data: getProduct } = await API_LIST.getProduct({
            name,
            page,
            category,
            family,
            stateP,
          });
          this.setState({
            getProductFamily: getProductFamily,
            getExcel: getExcel,
            getStock: getStock,
            getTotal: getTotal,
          });
        } catch {
      this.setState({
        error: "API_LIST 데이터를 불러오지 못함.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      loading,
      error,
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
      name
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
      />
    );
  }
}
