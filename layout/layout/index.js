import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import Layout from './component';

export default connect(
  null,
  {
    showLoading,
    hideLoading
  }
)(Layout);
