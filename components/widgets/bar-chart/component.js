import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Vega from 'react-vega';

import SPEC from './spec';

class BarChart extends PureComponent {
  static propTypes = { data: PropTypes.object.isRequired }

  render() {
    const { data } = this.props;
    return (
      <Vega spec={SPEC} data={data} />
    );
  }
}

export default BarChart;
