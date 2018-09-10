import { connect } from 'react-redux';
import { setCostFilter } from 'modules/filters/actions';

import Analyzer from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.common.geogunit_unique_name && { location : state.filters.common.geogunit_unique_name },
      ...state.filters.common.scenario && { scenario : state.filters.common.scenario },
      ...state.filtersCompare.common.geogunit_unique_name && { compareLocation : state.filtersCompare.common.geogunit_unique_name}
    },
    input: state.app.input
  }),
  { setCostFilter }
)(Analyzer);
