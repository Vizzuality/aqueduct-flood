import { connect } from 'react-redux';

// actions
import { setTab } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import { setWidgetsCompare } from 'modules/widgets-compare/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';
import {
  setCommonCompareFilter,
  setRiskCompareFilter,
  setHazardCompareFilter,
  setCostCompareFilter,
} from 'modules/filters-compare/actions';
import {
  setExistingProt,
  setProtFut,
  setExistingProtCompare,
  setProtFutCompare
} from 'modules/widget-map/actions';

// component
import ComparePage from './component';

export default connect(
  state => ({ router: state.router }),
  {
    setTab,
    setWidgets,
    setWidgetsCompare,
    setCommonFilter,
    setRiskFilter,
    setHazardFilter,
    setCostFilter,
    setCommonCompareFilter,
    setRiskCompareFilter,
    setHazardCompareFilter,
    setCostCompareFilter,
    setExistingProt,
    setProtFut,
    setExistingProtCompare,
    setProtFutCompare
  }
)(ComparePage);