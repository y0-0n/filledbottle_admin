import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { orderFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { pageNumbers, convertNumber } = state;
  return {
    pageNumbers,
    convertNumber
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickNextPage: bindActionCreators(orderFunction.clickNextPage, dispatch),
    clickPrevPage: bindActionCreators(orderFunction.clickPrevPage, dispatch),
    clickConvertPage: bindActionCreators(orderFunction.clickConvertPage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);