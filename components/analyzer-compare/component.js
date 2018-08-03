import React, { PureComponent } from 'react';

// components
import AnalyzerCompareFilters from './filters';

// styles
import './styles.scss';

class AnalyzerCompare extends PureComponent {
  render() {
    return (
      <div className="c-analyzer-compare">
        <div className="l-filters">
          <AnalyzerCompareFilters />
        </div>
      </div>
    );
  }
}

export default AnalyzerCompare;
