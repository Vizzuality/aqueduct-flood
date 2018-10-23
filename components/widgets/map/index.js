import { connect } from 'react-redux';

// selectors
import {
  getLeftLayers,
  getRightLayers,
  getLeftLayersCompare,
  getRightLayersCompare
} from './selectors';

// component
import MapChart from './component';

export default connect(
  (state, props) => {
    const { data } = props;
    const { isCompare } = props;

    return {
      ...props,
      data: {
        left: isCompare ? getLeftLayersCompare(state, data.left) : getLeftLayers(state, data.left),
        right: isCompare ? getRightLayersCompare(state, data.right) : getRightLayers(state, data.right)
      }
    };
  },
  null
)(MapChart);
