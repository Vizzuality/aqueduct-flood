import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';

// styles
import './styles.scss';

class Widget extends PureComponent {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      filters: PropTypes.object.isRequired,
    }).isRequired,
    widget: PropTypes.shape({
      data: PropTypes.any,
      error: PropTypes.any,
      loading: PropTypes.bool
    }),
    getWidgetData: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  };

  static defaultProps = {
    widget: {
      data: [],
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const { params, getWidgetData } = this.props;
    getWidgetData(params.id);
  }

  // componentDidUpdate() {
  //   const { params, getWidgetData } = this.props;
  //   getWidgetData(params.id);
  // }

  render() {
    const { widget, children } = this.props;
    return (
      <div className="c-widget">
        {widget.loading && <Spinner />}
        {children(widget)}
      </div>
    );
  }
}

export default Widget;
