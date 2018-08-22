import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import AnalyzerFilters from 'components/analyzer/filters';
import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import ApplyFilters from 'components/analyzer/apply-filters';

// styles
import './styles.scss';

class Analyzer extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}).isRequired,
    setFilter: PropTypes.func.isRequired,
  }

  render() {
    const {
      filters,
      setFilter
    } = this.props;

    return (
      <div className="c-analyzer">
        <div className="l-filters">
          <AnalyzerFilters />
        </div>

        <div className="l-analyzer-inputs">
          <div className="wrapper">
            <div className="row">
              <div className="col-xs-12">
                <AnalyzerInputs onChangeFilter={setFilter} filters={filters} />
              </div>
            </div>
          </div>
        </div>

        <ApplyFilters />
      </div>
    );
  }
}

export default Analyzer;
