import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'wri-api-components/dist/widgets';

import THEME from 'components/widgets/theme';
import SPEC from './spec';

class BarChart extends PureComponent {
  static propTypes = { data: PropTypes.object.isRequired }

  render() {
    const { data } = this.props;
    return (
      <VegaChart spec={SPEC} theme={THEME} data={data} />
    );
  }
}

export default BarChart;
