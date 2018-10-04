import { connect } from 'react-redux';

// actions
import { setTab, clearInput, clearInputCompare } from 'modules/app/actions';
import { setRoutes } from 'modules/routes/actions';
import { setWidgets } from 'modules/widgets/actions';
import { setWidgetsCompare } from 'modules/widgets-compare/actions';
import { clearFilters } from 'modules/filters/actions';
import { clearCompareFilters } from 'modules/filters-compare/actions';

// selector
import { updatedTabs } from './selectors';

// component
import Compare from "./component";

export default connect(
  state => ({
    routes: state.routes,
    sidebar: state.app.sidebar,
    tab: state.app.tab,
    tabs: updatedTabs(state),
    filters: state.filters,
    filtersCompare: state.filtersCompare
  }),
  {
    setTab,
    setRoutes,
    clearInput,
    clearInputCompare,
    setWidgets,
    setWidgetsCompare,
    clearFilters,
    clearCompareFilters
  }
)(Compare);
