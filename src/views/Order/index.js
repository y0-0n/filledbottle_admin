import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { pageNumbers, keyword } = state;
  return {
    pageNumbers,
    keyword
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    searchKeyword: bindActionCreators(searchFunction.searchKeyword, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);