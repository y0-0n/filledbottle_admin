import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { orderFunction } from '../../action';
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
    clickNextPage: bindActionCreators(orderFunction.clickNextPage, dispatch),
    clickPrevPage: bindActionCreators(orderFunction.clickPrevPage, dispatch),
    clickConvertPage: bindActionCreators(orderFunction.clickConvertPage, dispatch),
    searchKeyword: bindActionCreators(orderFunction.searchKeyword, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);