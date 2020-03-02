import { connect } from 'react-redux';

// actions
import { resetModal } from 'modules/app/actions';

// component
import Layout from './component';

export default connect(
  state => ({ modal: state.app.modal }),
  { resetModal }
)(Layout);
