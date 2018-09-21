import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { VegaChart } from 'wri-api-components/dist/widgets';
import isEqual from 'lodash/isEqual';

// utils
import { updateSpec } from 'utils/widget';

import THEME from 'components/widgets/theme';

class Chart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    spec: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { spec, params } = this.props;
    this.spec = updateSpec(spec, params)

    console.log(this.spec)
  }

  componentWillReceiveProps(nextProps) {
    const { spec, params } = this.props;
    const { params: nextParams } = nextProps;
    const paramsChanged = !isEqual(params, nextParams);

    if (paramsChanged) this.spec = updateSpec(spec, nextParams)
  }

  render() {
    const { data } = this.props;

    return (
      <VegaChart spec={this.spec} theme={THEME} data={data} />
    );
  }
}

export default Chart;
