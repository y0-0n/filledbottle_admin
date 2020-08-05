import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, stockFunction, searchFunction } from '../../action';
import Stock from './Stock';

function mapStateToProps(state) {
  const{ pageNumbersS } = state.pagination;
  const { plant } = state.stock;
  const { familyS } = state.stock;
  const { keywordS } = state.search;
  return {
    pageNumbersS,
    familyS,
    plant,
    keywordS
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPageS: bindActionCreators(pageFunction.clickConvertPageS, dispatch),
    checkFamilyS: bindActionCreators(stockFunction.checkFamilyS, dispatch),
    searchKeywordS: bindActionCreators(searchFunction.searchKeywordS, dispatch),
    checkPlant: bindActionCreators(stockFunction.checkPlant, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);