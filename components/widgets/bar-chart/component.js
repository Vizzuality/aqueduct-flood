import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'wri-api-components/dist/widgets';
import isEqual from 'lodash/isEqual';

// utils
import { updateSpec } from 'utils/widget';

import THEME from 'components/widgets/theme';
import SPEC from './spec';

class BarChart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { params } = this.props;
    this.spec = updateSpec(SPEC, params)
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;
    const { params: nextParams } = nextProps;
    const paramsChanged = !isEqual(params, nextParams);

    if (paramsChanged) this.spec = updateSpec(SPEC, nextParams)
  }

  render() {
    const { data } = this.props;

    return (
      <VegaChart spec={this.spec} theme={THEME} data={data} />
    );
  }
}

export default BarChart;
