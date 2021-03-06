import { connect } from 'react-redux';

// acctions
import { setCommonFilter, setCostFilter } from 'modules/filters/actions';
import { setCommonCompareFilter } from 'modules/filters-compare/actions';
import { getLocations, getCompareLocations, getCountryDefaults } from 'modules/locations/actions';
import { setInput, setInputCompare, applyFilters, setIsNullTime, setModal, setRouter } from 'modules/app/actions';
import { resetWidgets } from 'modules/widgets/actions';
import { setExistingProt, setProtFut } from 'modules/widget-map/actions';

// selectors
import { parseLocations, parseCompareLocations } from 'modules/locations/selectors';

// component
import AnalyzerFilters from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.common.geogunit_unique_name && { location : state.filters.common.geogunit_unique_name },
      ...state.filters.common.scenario && { scenario : state.filters.common.scenario },
      ...state.filtersCompare.common.geogunit_unique_name && { compareLocation : state.filtersCompare.common.geogunit_unique_name }
    },
    locations: parseLocations(state),
    locationsCompare: parseCompareLocations(state),
    tab: state.app.tab,
    router: state.router,
  }),
  {
    setCommonFilter,
    setCostFilter,
    setCommonCompareFilter,
    getLocations,
    getCompareLocations,
    getCountryDefaults,
    setInput,
    setInputCompare,
    resetWidgets,
    applyFilters,
    setIsNullTime,
    setModal,
    setExistingProt,
    setProtFut,
    setRouter
  }
)(AnalyzerFilters);
