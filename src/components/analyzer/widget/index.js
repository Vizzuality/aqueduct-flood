import { connect } from 'react-redux';
import { Widget } from 'aqueduct-components';

// actions
import { getWidgetCostData } from 'modules/widgets/actions';

export default connect(
  (state, { params }) => {
    const { widgets } = state;
    const { id } = params; // widget id

    return {
      params: params,
      widget: widgets.find(widget => widget.id === id)
    };
  },
  { getWidgetData: getWidgetCostData }
)(Widget);

