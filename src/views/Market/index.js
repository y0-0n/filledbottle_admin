import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const{ pageNumbersM } = state.pagination;
  const { keywordM } = state.search;
  return {
    pageNumbersM,
    keywordM
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPageM: bindActionCreators(pageFunction.clickConvertPageM, dispatch),
    searchKeywordM: bindActionCreators(searchFunction.searchKeywordM, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);