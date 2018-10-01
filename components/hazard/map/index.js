import { connect } from 'react-redux';

// actions
import { setActiveLayer } from 'modules/layers/actions';

// selectors
import { sortedUpdatedLayers, getLayerGroups } from './selectors';

// component
import HazardMap from './component';

export default connect(
  state => ({
    layers: sortedUpdatedLayers(state),
    layerGroups: getLayerGroups(state),
    loading: state.layers.loading
  }),
  { setActiveLayer }
)(HazardMap);
