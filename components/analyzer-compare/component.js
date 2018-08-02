import React, { PureComponent } from 'react';

// components
import AnalyzerCompareFilters from './filters';

// styles
import './styles.scss';

class AnalyzerCompare extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <div className="c-analyzer-compare">
        <AnalyzerCompareFilters />
      </div>
    );
  }
}

export default AnalyzerCompare;
