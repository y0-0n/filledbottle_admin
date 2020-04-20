import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, stockFunction, productFunction } from '../../action';
import StockList from './List';

function mapStateToProps(state) {
  const { pageNumbers, plant } = state.stock;
  return {
    pageNumbers,
    plant
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    checkPlant: bindActionCreators(stockFunction.checkPlant, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);