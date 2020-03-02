import { connect } from 'react-redux';

// actions
import { setTab } from 'modules/app/actions';
import { setWidgets, setEmbedWidget } from 'modules/widgets/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';

// component
import WidgetPreviewPage from './component';

export default connect(
  state => ({ router: state.router }),
  {
    setTab,
    setWidgets,
    setEmbedWidget,
    setCommonFilter,
    setRiskFilter,
    setHazardFilter,
    setCostFilter
  }
)(WidgetPreviewPage);
