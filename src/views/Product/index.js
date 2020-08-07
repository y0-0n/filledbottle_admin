import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { pageFunction, searchFunction, productFunction } from '../../action';
import List from './List copy';

function mapStateToProps(state) {
  const{ pageNumbersP } = state.pagination;
  const { keywordP } = state.search;
  const { category, family, show, stateP } = state.product;
  return {
    pageNumbersP,
    keywordP,
    category,
    family,
		show,
		stateP,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickConvertPageP: bindActionCreators(pageFunction.clickConvertPageP, dispatch),
    searchKeywordP: bindActionCreators(searchFunction.searchKeywordP, dispatch),
    checkCategoryId: bindActionCreators(productFunction.checkCategoryId, dispatch),
    checkFamily: bindActionCreators(productFunction.checkFamily, dispatch),
    changeShow: bindActionCreators(productFunction.changeShow, dispatch),
    changeStateP: bindActionCreators(productFunction.changeStateP, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);