import { connect } from 'react-redux';

// actions
import { setActiveLayer, deleteActiveLayer } from 'modules/layers/actions';

// selectors
import {
  updatedLayers,
  getActiveLayers
} from './selectors';

// component
import HazardMap from './component';

export default connect(
  state => ({
    activeLayers: getActiveLayers(state),
    layers: updatedLayers(state),
    filters: state.filters,
    loading: state.layers.loading
  }),
  {
    setActiveLayer,
    deleteActiveLayer
  }
)(HazardMap);
