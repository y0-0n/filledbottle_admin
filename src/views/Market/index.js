import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { pageNumbers, keywordM } = state.search;
  return {
    pageNumbers,
    keywordM
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    searchKeywordM: bindActionCreators(searchFunction.searchKeywordM, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);