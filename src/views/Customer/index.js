import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const{ pageNumbersC } = state.pagination;
  const { keywordC } = state.search;
  return {
    pageNumbersC,
    keywordC,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPageC: bindActionCreators(pageFunction.clickConvertPageC, dispatch),
    searchKeywordC: bindActionCreators(searchFunction.searchKeywordC, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);