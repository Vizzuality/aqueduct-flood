import { connect } from 'react-redux';

// actions
import { setActiveLayer, deleteActiveLayer } from 'modules/layers/actions';
import { setMapOptions } from 'modules/map/actions';

// selectors
import { filterLayersByReturnPeriod } from './selectors';

// component
import HazardMap from './component';

export default connect(
  state => ({
    layers: filterLayersByReturnPeriod(state),
    mapOptions: state.map,
    loading: state.layers.loading
  }),
  {
    setActiveLayer,
    deleteActiveLayer,
    setMapOptions
  }
)(HazardMap);
