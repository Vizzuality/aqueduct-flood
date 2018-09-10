import { connect } from 'react-redux';
import { setRiskFilter } from 'modules/filters/actions';

import Risk from "./component";

export default connect(
  state => ({
    filters: {
      location : state.filters.common.geogunit_unique_name,
      scenario : state.filters.common.scenario,
      compareLocation : state.filtersCompare.common.geogunit_unique_name
    },
    input: state.app.input
  }),
  { setRiskFilter }
)(Risk);
