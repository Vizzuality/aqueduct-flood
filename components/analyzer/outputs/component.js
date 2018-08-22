import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// componets
import Widget from 'components/widget';
import BarChart from 'components/widgets/bar-chart';
import LineChart from 'components/widgets/line';
import MultiLineChart from 'components/widgets/multi-line';
import MapChart from 'components/widgets/map';

// constants
import { WIDGETS } from 'mocks/widgets';

// styles
import './styles.scss';

class AnalyzerOutputs extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersStatus: PropTypes.object.isRequired,
    applyFilters: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps) {
    const { filtersStatus: nextFiltersStatus } = nextProps;

    return nextFiltersStatus.applied;
  }

  componentDidUpdate() {
    const { applyFilters } = this.props;

    applyFilters(false);
  }

  render() {
    const { filters } = this.props;

    return (
      <div className="c-analyzer-outputs">
        <div className="wrapper">
          <div className="container">
            {WIDGETS.map(widget => (
              <div key={widget.id} className="widget-row">
                <Widget
                  title={replace(widget.title, filters)}
                  params={{ id: widget.id, filters }}
                >
                  {({ data }) => {

                    if (widget.type === 'bar') return (<BarChart data={{ table: data }} />)

                    if (widget.type === 'line') return (<LineChart data={{ table: data }} />)

                    if (widget.type === 'multi-line') return (<MultiLineChart data={{ table: data }} />)

                    if (widget.type === 'map') return (<MapChart />)

                    return null;
                  }}
                </Widget>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerOutputs;
