import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction, productFunction } from '../../action';
import List from './List';

function mapStateToProps(state) {
  const { pageNumbers, keyword, category, family, show } = state;
  return {
    pageNumbers,
    keyword,
    category,
    family,
    show
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPage: bindActionCreators(pageFunction.clickConvertPage, dispatch),
    searchKeyword: bindActionCreators(searchFunction.searchKeyword, dispatch),
    checkCategoryId: bindActionCreators(productFunction.checkCategoryId, dispatch),
    checkFamily: bindActionCreators(productFunction.checkFamily, dispatch),
    changeShow: bindActionCreators(productFunction.changeShow, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);