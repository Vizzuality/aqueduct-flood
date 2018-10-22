import { connect } from 'react-redux';

// selectors
import { getLeftLayers, getRightLayers } from './selectors';

// component
import MapChart from './component';

export default connect(
  (state, props) => {
    const { data } = props;

    return {
      ...props,
      data: {
        left: getLeftLayers(state, data.left),
        right: getRightLayers(state, data.right)
      }
    };
  },
  null
)(MapChart);
