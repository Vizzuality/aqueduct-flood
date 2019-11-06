import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// layout
import LayoutEmbed from "layout/layout-embed";

// components
import RiskWidget from 'components/risk/widget';
import AnalyzerWidget from 'components/analyzer/widget';

// components
import Chart from 'components/widgets';
import TableChart from 'components/widgets/table/risk';
import MapChart from 'components/widgets/map';

// specs
// specs – risk
import AnnualFloodSpec from 'components/widgets/specs/risk/annual_flood';
import BenchmarkSpec from 'components/widgets/specs/risk/benchmark';
// specs – risk advanced
import FloodDriversSpec from 'components/widgets/specs/risk/advanced/flood_drivers';
import LPCurveSpec from 'components/widgets/specs/risk/advanced/lp_curve';

// specs – cba
import BarChartSpec from 'components/widgets/specs/cba/bar-chart';
import LineSpec from 'components/widgets/specs/cba/line';
import MultiLineSpec from 'components/widgets/specs/cba/multi-line';

// styles
import './styles.scss';

class EmbedWidget extends PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    widget: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired
  }

  render() {
    const { tab, widget, filters } = this.props;
    const Widget = ['risk', 'advanced_risk'].includes(tab) ? RiskWidget : AnalyzerWidget;
    const widgetTitle = replace(widget.params.title, filters);

    return (
      <LayoutEmbed
        title={widgetTitle}
        description="Aqueduct Flood description"
      >
        <section className="l-embed-widget">
          <Widget
            title={widgetTitle}
            params={{ id: widget.id, filters }}
            hideWidgetOptions
          >
            {({ data, params = {} }) => {

              // cba types
              if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

              if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

              if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

              // risk types
              if (params.type === 'annual_flood') return (<Chart spec={AnnualFloodSpec} params={params} data={{ table: data }} />)

              if (params.type === 'flood_drivers') return (<Chart spec={FloodDriversSpec} params={params} data={{ table: data }} />)

              if (params.type === 'benchmark') return (<Chart spec={BenchmarkSpec} params={params} data={{ table: data }} />)

              if (params.type === 'lp_curve') return (<Chart spec={LPCurveSpec} params={params} data={{ table: data }} />)

              // common types
              if (params.type === 'map') return (<MapChart />)

              if (params.type === 'table') return (<TableChart data={data} />)

              return null;
            }}
          </Widget>
        </section>
      </LayoutEmbed>
    );
  }
}

export default EmbedWidget;
