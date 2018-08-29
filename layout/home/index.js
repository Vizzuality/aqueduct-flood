import { connect } from 'react-redux';
import { setSidebarVisibility, setTab } from 'modules/app/actions';

import Home from "./component";

export default connect(
  state => ({
    sidebar: state.app.sidebar,
    tab: state.app.tab,
    filters: state.filters
  }),
  {
    setSidebarVisibility,
    setTab
  }
)(Home);
