import { connect } from 'react-redux';

// actions
import { setWidgetsCompare } from 'modules/widgets-compare/actions';

// selectors
import { isAWidgetLoading } from 'modules/widgets/selectors';

// component
import AnalyzerCompare from "./component";

export default connect(
  state => ({
    tab: state.app.tab,
    filters: state.filters.common,
    filtersCompare: state.filtersCompare.common,
    loadingDefaults: state.locations.loaders.defaults,
    loadingCompareDefaults: state.locations.loaders.compareDefaults,
    widgetLoading: isAWidgetLoading(state)
  }),
  { setWidgetsCompare }
)(AnalyzerCompare);
