import { connect } from 'react-redux';
import { setSidebarVisibility, setTab, clearInput } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { clearLayers } from 'modules/layers/actions';

// selectors
import { getActiveLayers } from 'modules/layers/selectors';
import { updatedTabs } from './selectors';

// component
import Home from "./component";

export default connect(
  state => ({
    sidebar: state.app.sidebar,
    tab: state.app.tab,
    appliedFilters: state.app.filters.applied,
    tabs: updatedTabs(state),
    filters: state.filters,
    mapOptions: state.map,
    activeLayers: getActiveLayers(state),
    hazardLegend: state.hazardLegend,
  }),
  {
    setSidebarVisibility,
    setTab,
    setWidgets,
    clearInput,
    clearLayers
  }
)(Home);
