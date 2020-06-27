import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { keywordC,  pageNumbers } = state.search;
  return {
    pageNumbers,
    keywordC,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    searchKeywordC: bindActionCreators(searchFunction.searchKeywordC, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);