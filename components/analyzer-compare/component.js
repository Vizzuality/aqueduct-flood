import React from 'react';

// components
import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import AnalyzerCompareInputs from 'components/analyzer-compare/analyzer-inputs';
import AnalyzerCompareOutputs from 'components/analyzer-compare/outputs';
import AnalyzerCompareFilters from 'components/analyzer-compare/filters';
import ApplyFilters from 'components/analyzer/apply-filters';

// styles
import './styles.scss';

const AnalyzerCompare = () => (
  <div className="c-analyzer-compare">
    <div className="l-filters">
      <AnalyzerCompareFilters />
    </div>

    <div className="analyzer-compare-inputs">
      <div className="wrapper">
        <div className="row">
          <div className="col-md-6">
            <AnalyzerInputs />
          </div>
          <div className="col-md-6">
            <AnalyzerCompareInputs />
          </div>
        </div>
      </div>
    </div>

    <div className="analyzer-compare-outputs">
      <AnalyzerCompareOutputs />
    </div>

    <ApplyFilters />
  </div>);

export default AnalyzerCompare;
