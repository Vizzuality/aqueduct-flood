import { connect } from 'react-redux';

// selectors
import { setModal } from 'modules/app/actions';
import { isAWidgetLoading } from 'modules/widgets/selectors';
import { isCompareAWidgetLoading } from 'modules/widgets-compare/selectors';

// component
import AnalyzerCompare from './component';

export default connect(
  state => ({
    filters: state.filters.common,
    filtersCompare: state.filtersCompare.common,
    loadingDefaults: state.locations.loaders.defaults,
    loadingCompareDefaults: state.locations.loaders.compareDefaults,
    widgetLoading: isAWidgetLoading(state) || isCompareAWidgetLoading(state)
  }),
  { setModal }
)(AnalyzerCompare);
