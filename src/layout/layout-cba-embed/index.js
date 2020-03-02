import { connect } from 'react-redux';

// actions
import { resetModal } from 'modules/app/actions';

// components
import LayoutCBAEmbed from './component';

export default connect(
  state => ({ modal: state.app.modal }),
  { resetModal }
)(LayoutCBAEmbed);
