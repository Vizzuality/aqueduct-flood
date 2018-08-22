import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// componets
import Widget from 'components/widget';
import WidgetCompare from 'components/widget-compare';
import BarChart from 'components/widgets/bar-chart';
import LineChart from 'components/widgets/line';
import MultiLineChart from 'components/widgets/multi-line';

// styles
import './styles.scss';

class AnalyzerCompareOutputs extends PureComponent {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired
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
                  params={{ id: widget.id, filters }}
                >
                  {({ data }) => {

                    if (widget.params.type === 'bar') return (<BarChart data={{ table: data }} />)

                    if (widget.params.type === 'line') return (<LineChart data={{ table: data }} />)

                    if (widget.params.type === 'multi-line') return (<MultiLineChart data={{ table: data }} />)

                    return null;
                  }}
                </Widget>
              </div>
              <div className="col-md-6">
                <WidgetCompare
                  params={{ id: widget.id, filtersCompare }}
                >
                  {({ data }) => {

                    if (widget.params.type === 'bar') return (<BarChart data={{ table: data }} />)

                    if (widget.params.type === 'line') return (<LineChart data={{ table: data }} />)

                    if (widget.params.type === 'multi-line') return (<MultiLineChart data={{ table: data }} />)

                    return null;
                  }}
                </WidgetCompare>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AnalyzerCompareOutputs;
