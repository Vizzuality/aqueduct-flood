import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';
import { Base64 } from 'js-base64';

// components
import Widget from 'components/risk/widget';
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

class AnalyzerOutputs extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    originalFormatFilters: PropTypes.object.isRequired,
    widgets: PropTypes.array.isRequired,
    setModal: PropTypes.func.isRequired
  }

  onShareWidget = (widget) => {
    const { setModal } = this.props;

    setModal(({
      visible: true,
      options: {
        type: 'widget-share',
        widget,
        embedURL: this.getEmbedURL(widget)
      }
    }));
  }

  getEmbedURL = ({ id }) => {
    const { originalFormatFilters } = this.props;
    const isAdvancedRisk = originalFormatFilters.advanced_settings;

    return `/embed/${isAdvancedRisk ? 'advanced_risk' : 'risk'}/widget/${id}?p=${Base64.encode(JSON.stringify(originalFormatFilters))}`;
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
                  onShareWidget={() => this.onShareWidget(widget)}
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
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerOutputs;
