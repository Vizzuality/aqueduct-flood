import { connect } from 'react-redux';
import { Widget } from 'aqueduct-components';

// actions
import { getWidgetRiskData } from 'modules/widgets-compare/actions';

export default connect(
  (state, { params }) => {
    const { widgetsCompare } = state;

    // widget id
    const { id } = params;

    return {
      params,
      widget: widgetsCompare.find(widget => widget.id === id)
    };
  },
  { getWidgetData: getWidgetRiskData }
)(Widget);

