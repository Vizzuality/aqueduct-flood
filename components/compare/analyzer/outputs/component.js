import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// components
import Widget from 'components/analyzer/widget';
import WidgetCompare from 'components/compare/analyzer/widget';
import Chart from 'components/widgets';
import MapChart from 'components/widgets/map';
import TableChart from 'components/widgets/table/cba';

// specs
import BarChartSpec from 'components/widgets/specs/cba/bar-chart';
import LineSpec from 'components/widgets/specs/cba/line';
import MultiLineSpec from 'components/widgets/specs/cba/multi-line';

// styles
import './styles.scss';

class AnalyzerCompareOutputs extends Component {
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
    const { widgets, filters, filtersCompare } = this.props;
    const { geogunit_unique_name: location, existing_prot: existingProt } = filters;
    const { geogunit_unique_name: locationCompare, existing_prot: existingProtCompare } = filtersCompare;
    const widgetsReadyToDisplay = location && existingProt;
    const widgetsCompareReadyToDisplay = locationCompare && existingProtCompare;

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

                    if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

                    if (params.type === 'map') return (<MapChart />)

                    if (params.type === 'table') return (<TableChart data={data} />)

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

                      if (params.type === 'bar') return (<Chart spec={BarChartSpec} data={{ table: data }} />)

                      if (params.type === 'line') return (<Chart spec={LineSpec} data={{ table: data }} />)

                      if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} data={{ table: data }} />)

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

export default AnalyzerCompareOutputs;
