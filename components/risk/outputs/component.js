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
// import ProablityFloodDamgeUrbanSpec from 'components/widgets/specs/risk/probability-of-flood-damage-to-urban';

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
      <div className="c-risk-outputs">
        <div className="wrapper">
          <div className="container">
            {widgets.map(widget => (
              <div key={widget.id} className="widget-row">
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerOutputs;
