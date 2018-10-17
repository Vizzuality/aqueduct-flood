import { connect } from 'react-redux';

// actions
import { setActiveLayer, deleteActiveLayer } from 'modules/layers/actions';
import { setMapOptions } from 'modules/map/actions';

// selectors
import { updatedLayers, getActiveLayers } from 'modules/layers/selectors';

// component
import HazardMap from './component';

export default connect(
  state => ({
    activeLayers: getActiveLayers(state),
    layers: updatedLayers(state),
    mapOptions: state.map,
    loading: state.layers.loading
  }),
  {
    setActiveLayer,
    deleteActiveLayer,
    setMapOptions
  }
)(HazardMap);
