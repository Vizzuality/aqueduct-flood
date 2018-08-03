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
    setFilter: PropTypes.func.isRequired
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
          <AnalyzerInputs onChangeFilter={setFilter} filters={filters} />
        </div>

        <div className="filters-btn-container">
          <Button
            onClick={() => console.info('applies filters')}
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
