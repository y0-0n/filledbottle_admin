import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, stockFunction, productFunction } from '../../action';
import Stock from './Stock';

function mapStateToProps(state) {
  const { pageNumbers, plant } = state.stock;
  const { family } = state.stock
  return {
    pageNumbers,
    family,
    plant
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    checkFamily: bindActionCreators(productFunction.checkFamily, dispatch),
    checkPlant: bindActionCreators(stockFunction.checkPlant, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);