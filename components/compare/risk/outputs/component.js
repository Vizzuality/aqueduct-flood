import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// componets
import Widget from 'components/risk/widget';
import WidgetCompare from 'components/compare/risk/widget';
import Chart from 'components/widgets';
import TableChart from 'components/widgets/table/risk';

// specs
import AnnualFloodSpec from 'components/widgets/specs/risk/annual_flood';
import BenchmarkSpec from 'components/widgets/specs/risk/benchmark';
// specs – advanced
import FloodDriversSpec from 'components/widgets/specs/risk/advanced/flood_drivers';
import LPCurveSpec from 'components/widgets/specs/risk/advanced/lp_curve';

// styles
import './styles.scss';

class RiskCompareOutputs extends Component {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    filtersStatus: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
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
    const { widgets, filters,  filtersCompare } = this.props;
    const { geogunit_unique_name: location, existing_prot: existingProt } = filters;
    const { geogunit_unique_name: locationCompare, existing_prot: existingProtCompare } = filtersCompare;
    const widgetsReadyToDisplay = location && existingProt;
    const widgetsCompareReadyToDisplay = !!locationCompare && !!existingProtCompare;

    return (
      <div className="c-analyzer-compare-outputs">
        <div className="wrapper">
          {widgetsReadyToDisplay && widgets.map(widget => (
            <div key={widget.id} className="row">
              <div className="col-md-6">
                <Widget
                  title={replace(widget.params.title, filters)}
                  params={{ id: widget.id, filters }}
                >
                  {({ data, params = {} }) => {

                    if (params.type === 'table') return (<TableChart data={data} />)

                    if (params.type === 'annual_flood') return (<Chart spec={AnnualFloodSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'flood_drivers') return (<Chart spec={FloodDriversSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'benchmark') return (<Chart spec={BenchmarkSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'lp_curve') return (<Chart spec={LPCurveSpec} params={params} data={{ table: data }} />)

                    return null;

                  }}
                </Widget>
              </div>
              {widgetsCompareReadyToDisplay && (
                <div className="col-md-6">
                  <WidgetCompare
                    title={replace(widget.params.title, filtersCompare)}
                    params={{ id: widget.id, filtersCompare }}
                  >
                    {({ data, params = {} }) => {

                      if (params.type === 'table') return (<TableChart data={data} />)

                      if (params.type === 'annual_flood') return (<Chart spec={AnnualFloodSpec} params={params} data={{ table: data }} />)

                      if (params.type === 'flood_drivers') return (<Chart spec={FloodDriversSpec} params={params} data={{ table: data }} />)

                      if (params.type === 'benchmark') return (<Chart spec={BenchmarkSpec} params={params} data={{ table: data }} />)

                      if (params.type === 'lp_curve') return (<Chart spec={LPCurveSpec} params={params} data={{ table: data }} />)

                      return null;
                    }}
                  </WidgetCompare>
                </div>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RiskCompareOutputs;
