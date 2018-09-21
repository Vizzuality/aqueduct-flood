import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// componets
import Widget from 'components/risk/widget';
import Chart from 'components/widgets';
// import BarChart from 'components/widgets/bar-chart';
// import LineChart from 'components/widgets/line';
// import MultiLineChart from 'components/widgets/multi-line';
import MapChart from 'components/widgets/map';
import TableChart from 'components/widgets/table';

// specs
// import AnnualDamageImpactDriversSpec from 'components/widgets/specs/risk/annual-damage-and-impact-drivers';
// import AnnualExpectedUrbanDamageByCountryInteractiveSpec from 'components/widgets/specs/risk/annual-expected-urban-damage-by-country-interactive';
// import AnnualExpectedUrbanDamageByCountrySpec from 'components/widgets/specs/risk/annual-expected-urban-damage-by-country';
// import AnnualExpectedUrbanDamageSpec from 'components/widgets/specs/risk/annual-expected-urban-damage';
// import ProbabilityFloodDamgeUrbanSpec from 'components/widgets/specs/risk/probability-of-flood-damage-to-urban';

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
    const widgetsReadyToDisplay = location && existingProt;

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
                  {({ data, params }) => {

                    if (params.type === 'bar') return (<Chart params={params} data={{ table: data }} />)

                    if (params.type === 'line') return (<Chart params={params} data={{ table: data }} />)

                    if (params.type === 'multi-line') return (<Chart params={params} data={{ table: data }} />)

                    if (params.type === 'map') return (<MapChart />)

                    if (params.type === 'table') return (<TableChart data={data} />)

                    return null;
                  }}
                </Widget>
              </div>
              {filtersCompare.geogunit_unique_name &&(
                <div className="col-md-6">
                  <WidgetCompare
                    title={replace(widget.params.title, filtersCompare)}
                    params={{ id: widget.id, filtersCompare }}
                  >
                    {({ data, params }) => {

                      if (params.type === 'bar') return (<BarChart data={{ table: data }} />)

                      if (params.type === 'line') return (<LineChart data={{ table: data }} />)

                      if (params.type === 'multi-line') return (<MultiLineChart data={{ table: data }} />)

                      if (params.type === 'map') return (<MapChart />)

                      if (params.type === 'table') return (<TableChart data={data} />)

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
