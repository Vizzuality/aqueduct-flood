import { connect } from 'react-redux';
import { setTab } from 'modules/app/actions';

import Compare from "./component";

export default connect(
  state => ({ tab: state.app.tab }),
  { setTab }
)(Compare);
