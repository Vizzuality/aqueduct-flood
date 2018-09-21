import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// componets
import Widget from 'components/risk/widget';
import Chart from 'components/widgets';
import TableChart from 'components/widgets/table/risk';

// specs
import AnnualFloodSpec from 'components/widgets/specs/risk/annual_flood';
import FloodDriversSpec from 'components/widgets/specs/risk/flood_drivers';
// specs – advanced
import BenchmarkSpec from 'components/widgets/specs/risk/advanced/benchmark';
import LPCurveSpec from 'components/widgets/specs/risk/advanced/lp_curve';

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
    const { geogunit_unique_name: location, existing_prot: existingProt } = filters;
    const widgetsReadyToDisplay = location && existingProt;

    return (
      <div className="c-risk-outputs">
        <div className="wrapper">
          <div className="container">
            {widgetsReadyToDisplay && widgets.map(widget => (
              <div key={widget.id} className="widget-row">
                <Widget
                  title={replace(widget.params.title, filters)}
                  params={{ id: widget.id, filters }}
                >
                  {({ data, params }) => {

                    if (params.type === 'table') return (<TableChart data={data} />)

                    if (params.type === 'annual_flood') return (<Chart spec={AnnualFloodSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'flood_drivers') return (<Chart spec={FloodDriversSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'benchmark') return (<Chart spec={BenchmarkSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'lp_curve') return (<Chart spec={LPCurveSpec} params={params} data={{ table: data }} />)

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
