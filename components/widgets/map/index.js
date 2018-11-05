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
    const { isCompare } = props;
    const widgets = isCompare ? state.widgetsCompare : state.widgets;
    const mapWidget = widgets.find(_widget => _widget.id === 'inundation_map');
    const { data } = mapWidget;

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
