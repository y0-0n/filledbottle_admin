import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, stockFunction, productFunction, searchFunction } from '../../action';
import Stock from './Stock';

function mapStateToProps(state) {
  const { pageNumbers, plant } = state.stock;
  const { family } = state.stock;
  const { keywordS } = state.search;
  return {
    pageNumbers,
    family,
    plant,
    keywordS
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    checkFamily: bindActionCreators(productFunction.checkFamily, dispatch),
    searchKeywordS: bindActionCreators(searchFunction.searchKeywordS, dispatch),
    checkPlant: bindActionCreators(stockFunction.checkPlant, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);