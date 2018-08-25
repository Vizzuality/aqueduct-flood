import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';

import Analyzer from "./component";

export default connect(
  state => ({
    filters: {
      ...state.filters.geogunit_unique_name && { location : state.filters.geogunit_unique_name },
      ...state.filters.scenario && { scenario : state.filters.scenario },
      ...state.filtersCompare.geogunit_unique_name && { compareLocation : state.filtersCompare.geogunit_unique_name}
    }
  }),
  { setFilter }
)(Analyzer);
