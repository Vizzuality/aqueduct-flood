import { connect } from 'react-redux';

// actions
import { setTab } from 'modules/app/actions';
import { setEmbedWidget } from 'modules/widgets/actions';
import {
  setCommonFilter,
  setRiskFilter,
  setHazardFilter,
  setCostFilter
} from 'modules/filters/actions';

// component
import WidgetEmbedPage from './component';

export default connect(
  state => ({}),
  {
    setTab,
    setEmbedWidget,
    setCommonFilter,
    setRiskFilter,
    setHazardFilter,
    setCostFilter
  }
)(WidgetEmbedPage);
