import { connect } from 'react-redux';

// actions
import { getWidgetData } from 'modules/widgets/actions';

// component
import Widget from './component';

export default connect(
  (state, { params }) => {
    const { widgets } = state;
    // widget id
    const { id } = params;

    // default state
    if (!widgets[id]) return {
      params,
      ...{
        data: [],
        loading: false,
        error: null
      }
    };

    return {
      params,
      widget: widgets[id]
    };
  },
  { getWidgetData }
)(Widget);

