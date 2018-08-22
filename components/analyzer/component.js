import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'aqueduct-components';

// components
import AnalyzerFilters from 'components/analyzer/filters';
import AnalyzerInputs from 'components/analyzer-inputs';

// styles
import './styles.scss';

class Analyzer extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}).isRequired,
    setFilter: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired
  }

  render() {
    const {
      filters,
      setFilter,
      applyFilters
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

        <div className="filters-btn-container">
          <Button
            onClick={() => applyFilters(true)}
            theme="light"
            className="-large -bg-light-blue -uppercase -bold"
          >
            apply changes
          </Button>
        </div>
      </div>
    );
  }
}

export default Analyzer;
