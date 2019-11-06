import { connect } from 'react-redux';

// actions
import { fetchLayers, setActiveLayer } from 'modules/layers/actions';

// component
import Hazard from './component';

export default connect(
  state => ({ filters: state.filters }),
  {
    fetchLayers,
    setActiveLayer
  }
)(Hazard);
