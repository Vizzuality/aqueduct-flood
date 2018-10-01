import { connect } from 'react-redux';
import { setSidebarVisibility, setTab, clearInput } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { clearLayers } from 'modules/layers/actions';

import Home from "./component";

export default connect(
  state => ({
    sidebar: state.app.sidebar,
    tab: state.app.tab,
    filters: state.filters
  }),
  {
    setSidebarVisibility,
    setTab,
    setWidgets,
    clearInput,
    clearLayers
  }
)(Home);
