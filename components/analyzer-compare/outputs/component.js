import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// components
import Widget from 'components/widget';
import WidgetCompare from 'components/widget-compare';
import BarChart from 'components/widgets/bar-chart';
import LineChart from 'components/widgets/line';
import MultiLineChart from 'components/widgets/multi-line';
import MapChart from 'components/widgets/map';
import TableChart from 'components/widgets/table';

// styles
import './styles.scss';

class AnalyzerCompareOutputs extends Component {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
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

    return (
      <div className="c-analyzer-compare-outputs">
        <div className="wrapper">
          {widgets.map(widget => (
            <div key={widget.id} className="row">
              <div className="col-md-6">
                <Widget
                  title={replace(widget.params.title, filters)}
                  params={{ id: widget.id, filters }}
                >
                  {({ data, params }) => {

                    if (params.type === 'bar') return (<BarChart params={params} data={{ table: data }} />)

                    if (params.type === 'line') return (<LineChart params={params} data={{ table: data }} />)

                    if (params.type === 'multi-line') return (<MultiLineChart params={params} data={{ table: data }} />)

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

export default AnalyzerCompareOutputs;
