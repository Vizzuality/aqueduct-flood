import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VegaChart from 'components/widgets/vega-chart';
import isEqual from 'lodash/isEqual';

// utils
import { updateSpec } from 'utils/widget';

// theme
import THEME from 'components/widgets/theme';

// styles
import './styles.scss';

class Chart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    spec: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { spec, params } = this.props;

    this.setState({ spec: updateSpec(Object.assign({}, spec), params) });
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;
    const { spec: nextSpec, params: nextParams } = nextProps;
    const paramsChanged = !isEqual(params, nextParams);

    if (paramsChanged) {
      this.setState({ spec: updateSpec(Object.assign({}, nextSpec), nextParams) })
    }
  }

  render() {
    const { data } = this.props;
    const { spec } = this.state;

    return (
      <VegaChart
        className="c-widget"
        spec={spec}
        theme={THEME}
        data={data}
      />
    );
  }
}

export default Chart;
