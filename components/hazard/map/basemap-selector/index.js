import { connect } from 'react-redux';

// actions
import { setMapOptions } from 'modules/map/actions';

// components
import BasemapControl from './component';

export { default } from './component';

// export default connect(
//   state => ({ basemap: state.map.basemap }),
//   { setMapOptions }
// )(BasemapControl);
