import { connect } from 'react-redux';

// actions
import { fetchLayers } from 'modules/layers/actions';

// component
import Hazard from './component';

export default connect(
  state => ({ filters: state.filters }),
  { fetchLayers }
)(Hazard);
