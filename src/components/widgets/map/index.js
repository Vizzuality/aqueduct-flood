import { connect } from 'react-redux';

// utils
import { calculateNextPeriodRange } from 'utils/cba';

// selectors
import { parseBasemap } from 'components/hazard/map/selectors';
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
    const mapWidget = widgets.find(_widget => _widget.id === 'inundation_map') || {};
    const { data } = mapWidget;

    const filters = {
      returnPeriodLeft: calculateNextPeriodRange(isCompare ? state.widgetMap.existing_prot_compare : state.widgetMap.existing_prot),
      returnPeriodRight: calculateNextPeriodRange(isCompare ? state.widgetMap.prot_fut_compare : state.widgetMap.prot_fut),
      refYear: isCompare ? state.filtersCompare.cba.ref_year : state.filters.cba.ref_year
    };

    return {
      ...props,
      filters,
      basemap: parseBasemap(state),
      data: {
        left: isCompare ? getLeftLayersCompare(state, data.left) : getLeftLayers(state, data.left),
        right: isCompare ? getRightLayersCompare(state, data.right) : getRightLayers(state, data.right)
      }
    };
  },
  null
)(MapChart);
