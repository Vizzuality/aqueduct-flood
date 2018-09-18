import { connect } from 'react-redux';

// actions
import { setTab, clearInput, clearInputCompare } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { setWidgetsCompare } from 'modules/widgets-compare/actions';
import { clearFilters } from 'modules/filters/actions';
import { clearCompareFilters } from 'modules/filters-compare/actions';

import Compare from "./component";

export default connect(
  state => ({ tab: state.app.tab }),
  {
    setTab,
    clearInput,
    clearInputCompare,
    setWidgets,
    setWidgetsCompare,
    clearFilters,
    clearCompareFilters
  }
)(Compare);
