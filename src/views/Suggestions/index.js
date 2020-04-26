import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { pageNumbers } = state.search;
  return {
    pageNumbers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);