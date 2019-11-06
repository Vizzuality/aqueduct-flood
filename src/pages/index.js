import { connect } from 'react-redux';

// component
import Page from './component';

export default connect(
  state => ({ page: state.router.type }),
  null
)(Page);