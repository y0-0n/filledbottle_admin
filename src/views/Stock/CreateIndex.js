import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Create from './Create';

function mapStateToProps(state) {
  const { plant } = state.stock;
  return {
    plant
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);