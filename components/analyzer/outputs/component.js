import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// components
import Widget from 'components/analyzer/widget';
import Chart from 'components/widgets';
import MapChart from 'components/widgets/map';
import TableChart from 'components/widgets/table';

// specs
import BarChartSpec from 'components/widgets/specs/cba/bar-chart';
import LineSpec from 'components/widgets/specs/cba/line';
import MultiLineSpec from 'components/widgets/specs/cba/multi-line';

// styles
import './styles.scss';

class AnalyzerOutputs extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersStatus: PropTypes.object.isRequired,
    widgets: PropTypes.array.isRequired,
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
    const { filters, widgets } = this.props;

    return (
      <div className="c-analyzer-outputs">
        <div className="wrapper">
          <div className="container">
            {widgets.map(widget => (
              <div key={widget.id} className="widget-row">
                <Widget
                  title={replace(widget.params.title, filters)}
                  params={{ id: widget.id, filters }}
                >
                  {({ data, params }) => {

                    if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'map') return (<MapChart />)

                    if (params.type === 'table') return (<TableChart data={data} />)

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
