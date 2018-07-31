import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import AnalyzerFilters from './filters';
import AnalyzerInputs from './inputs';

// styles
import './styles.scss';

class Analyzer extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    setFilter: PropTypes.func.isRequired
  }

  render() {
    const { filters, setFilter } = this.props;


    return (
      <div className="c-analyzer">
        <AnalyzerFilters onChangeFilter={setFilter} filters={filters} />
        <AnalyzerInputs onChangeFilter={setFilter} filters={filters} />
      </div>
    );
  }
}

export default Analyzer;
