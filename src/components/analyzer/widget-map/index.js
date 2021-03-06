import { connect } from 'react-redux';
import { Widget } from 'aqueduct-components';

// actions
import { getWidgetMapData } from 'modules/widgets/actions';

export default connect(
  (state, { params, filters }) => {
    const { widgets } = state;

    // widget id
    const { id } = params;

    return {
      params,
      filters,
      widget: widgets.find(widget => widget.id === id)
    };
  },
  { getWidgetData: getWidgetMapData }
)(Widget);

