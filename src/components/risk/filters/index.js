import { connect } from 'react-redux';

// acctions
import { setCommonFilter, setRiskFilter } from 'modules/filters/actions';
import { setCommonCompareFilter } from 'modules/filters-compare/actions';
import { getLocations, getCompareLocations, getCountryDefaults } from 'modules/locations/actions';
import { setInput, setInputCompare, setModal, setRouter } from 'modules/app/actions';
import { setWidgets } from 'modules/widgets/actions';

// selectors
import { getFilteredLocations, getFilteredCompareLocations, getScenarios } from './selectors';

// component
import AnalyzerFilters from "./component";

export default connect(
  state => ({
    filters: {
      location: state.filters.common.geogunit_unique_name,
      existingProt: state.filters.common.existing_prot,
      scenario: state.filters.risk.scenario,
      advanced_settings: state.filters.risk.advanced_settings,
      flood: state.filters.risk.flood,
      exposure: state.filters.risk.exposure,
      sub_scenario: state.filters.risk.sub_scenario,
      compareLocation: state.filtersCompare.common.geogunit_unique_name
    },
    locations: getFilteredLocations(state),
    basins: state.locations.list.basins,
    locationsCompare: getFilteredCompareLocations(state),
    scenarios: getScenarios(state),
    tab: state.app.tab
  }),
  {
    setCommonFilter,
    setRiskFilter,
    setCommonCompareFilter,
    getLocations,
    getCompareLocations,
    getCountryDefaults,
    setInput,
    setInputCompare,
    setWidgets,
    setModal,
    setRouter
  }
)(AnalyzerFilters);
