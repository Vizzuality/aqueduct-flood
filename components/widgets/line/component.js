import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'wri-api-components';

import SPEC from './spec';

class LineChart extends PureComponent {
  static propTypes = { data: PropTypes.object.isRequired }

  render() {
    const { data } = this.props;
    return (
      <VegaChart spec={SPEC} data={data} />
    );
  }
}

export default LineChart;
