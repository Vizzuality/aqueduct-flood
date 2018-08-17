// import React from 'react';
import { connect } from 'react-redux';
import { Widget } from 'aqueduct-components';

// actions
import { getWidgetData } from 'modules/widgets/actions';

// const Widget = () => (<div className="widget" />);


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

