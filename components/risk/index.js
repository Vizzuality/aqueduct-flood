import { connect } from 'react-redux';

// actions
import { setRiskFilter } from 'modules/filters/actions';
import { setWidgets } from 'modules/widgets/actions';

// selectors
import { isAWidgetLoading } from 'modules/widgets/selectors';

// component
import Risk from "./component";

export default connect(
  state => ({
    filters: {
      location : state.filters.common.geogunit_unique_name,
      scenario : state.filters.common.scenario,
      compareLocation : state.filtersCompare.common.geogunit_unique_name
    },
    input: state.app.input,
    advancedSettings: state.filters.risk.advanced_settings,
    defaultsLoading: state.locations.loaders.defaults,
    widgetLoading: isAWidgetLoading(state)
  }),
  {
    setRiskFilter,
    setWidgets
  }
)(Risk);
