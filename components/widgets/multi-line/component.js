import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'wri-api-components/dist/widgets';

import SPEC from './spec';

class MultiLine extends PureComponent {
  static propTypes = { data: PropTypes.object.isRequired }

  render() {
    const { data } = this.props;
    return (
      <VegaChart spec={SPEC} data={data} />
    );
  }
}

export default MultiLine;
