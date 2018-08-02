import { connect } from 'react-redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { resetModal } from 'modules/app/actions';

import Layout from './component';

export default connect(
  state => ({ modal: state.app.modal }),
  {
    showLoading,
    hideLoading,
    resetModal
  }
)(Layout);
