import { connect } from 'react-redux';

// actions
import { setTab, setIsNullTime } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';
import { setActiveLayer } from "modules/layers/actions";
import { setMapOptions } from "modules/map/actions";
import { setReturnPeriod } from 'components/hazard/map/legend/actions';
import { setExistingProt, setProtFut } from 'modules/widget-map/actions';

// component
import HomePage from './component';

export default connect(
  state => ({ routes: state.router }),
  {
    setTab,
    setIsNullTime,
    setWidgets,
    setCommonFilter,
    setRiskFilter,
    setHazardFilter,
    setCostFilter,
    setActiveLayer,
    setMapOptions,
    setReturnPeriod,
    setExistingProt,
    setProtFut
  }
)(HomePage);