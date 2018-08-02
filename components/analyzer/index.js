import { connect } from 'react-redux';
import { setFilter } from 'modules/filters/actions';

import Analyzer from "./component";


export default connect(
  state => ({
    filters: {
      ...state.filters,
      ...state.filtersCompare.location && { compareLocation : state.filtersCompare.location }
    },
    filtersCompare: state.filtersCompare
  }),
  { setFilter }
)(Analyzer);
