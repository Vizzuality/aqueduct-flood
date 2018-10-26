import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';
import { Base64 } from 'js-base64';

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

// utils
import { getRiskEmbedURL, getRiskPreviewURL, generateRiskDownloadURL } from 'utils/share';

// styles
import './styles.scss';

class RiskCompareOutputs extends PureComponent {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    originalFormatFilters: PropTypes.object.isRequired,
    originalFormatCompareFilters: PropTypes.object.isRequired,
    setModal: PropTypes.func.isRequired
  }

  onMoreInfo = (widget, filters) => {
    const { setModal } = this.props;

    setModal(({
      visible: true,
      options: {
        type: 'widget-info',
        widget,
        embedURL: getRiskPreviewURL(widget, filters)
      }
    }));
  }

  onDownloadWidget = (option, widget, filters) => {
    const { setModal } = this.props;

    if (option === 'embed') {
      setModal(({
        visible: true,
        options: {
          type: 'widget-share',
          widget: {
            ...widget,
            params: {
              ...widget.params,
              title: replace(widget.params.title, { ...filters.common, ...filters.risk })
            }
          },
          embedURL: getRiskEmbedURL(widget, filters)
        }
      }));
    }

    if (option === 'json') generateRiskDownloadURL(widget, filters);
  }

  getEmbedURL = ({ id }, compare) => {
    const { originalFormatFilters, originalFormatCompareFilters } = this.props;
    const isAdvancedRisk = originalFormatFilters.risk.advanced_settings;

    return `/embed/${isAdvancedRisk ? 'advanced_risk' : 'risk'}/widget/${id}?p=${Base64.encode(JSON.stringify(compare ? originalFormatCompareFilters : originalFormatFilters))}`;
  }

  render() {
    const { widgets, filters,  filtersCompare, originalFormatFilters, originalFormatCompareFilters } = this.props;
    const { geogunit_unique_name: location } = filters;
    const { geogunit_unique_name: locationCompare, existing_prot: existingProtCompare } = filtersCompare;
    const widgetsReadyToDisplay = location;
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
                  onMoreInfo={() => this.onMoreInfo(widget, originalFormatFilters)}
                  onDownloadWidget={(option, _widget) => this.onDownloadWidget(option, _widget, originalFormatFilters)}
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
                    onShareWidget={() => this.onShareWidget(widget, true)}
                    onMoreInfo={() => this.onMoreInfo(widget, originalFormatCompareFilters)}
                    onDownloadWidget={(option, _widget) => this.onDownloadWidget(option, _widget, originalFormatCompareFilters)}
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
