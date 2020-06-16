import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, stockFunction, productFunction, searchFunction } from '../../action';
import Stock from './Stock';

function mapStateToProps(state) {
  const { pageNumbers, plant } = state.stock;
  const { family } = state.stock;
  const { keyword } = state.search;
  return {
    pageNumbers,
    family,
    plant,
    keyword
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    checkFamily: bindActionCreators(productFunction.checkFamily, dispatch),
    searchKeyword: bindActionCreators(searchFunction.searchKeyword, dispatch),
    checkPlant: bindActionCreators(stockFunction.checkPlant, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);