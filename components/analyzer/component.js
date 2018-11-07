import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'aqueduct-components';
// components
import AnalyzerFilters from 'components/analyzer/filters';
import AnalyzerInputs from 'components/analyzer/analyzer-inputs';
import ApplyFilters from 'components/apply-filters';

// styles
import './styles.scss';

class Analyzer extends PureComponent {
  static propTypes = {
    defaultsLoading: PropTypes.bool.isRequired,
    widgetLoading: PropTypes.bool.isRequired,
    filters: PropTypes.shape({}).isRequired,
    input: PropTypes.shape({ loading: PropTypes.bool.isRequired }).isRequired,
    setCostFilter: PropTypes.func.isRequired
  }

  render() {
    const {
      defaultsLoading,
      widgetLoading,
      filters,
      input,
      setCostFilter
    } = this.props;
    const { loading } = input;

    const loadingStyles = {
      ...loading && { overflowY: 'hidden' }
    };

    return (
      <div className="c-analyzer">
        <div className="l-filters">
          <AnalyzerFilters />
        </div>

        <div className="l-analyzer-inputs" style={loadingStyles}>
          <div className="wrapper">
            <div className="row">
              <div className="col-xs-12">
                {defaultsLoading && <Spinner className="-transparent" />}
                {!defaultsLoading &&
                  <AnalyzerInputs onChangeFilter={setCostFilter} filters={filters} />}
              </div>
            </div>
          </div>
        </div>
        {(!defaultsLoading && !widgetLoading) && <ApplyFilters />}
      </div>
    );
  }
}

export default Analyzer;
