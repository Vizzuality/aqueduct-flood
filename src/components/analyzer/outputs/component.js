import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// components
import Widget from 'components/analyzer/widget';
import WidgetMap from 'components/analyzer/widget-map';
import Chart from 'components/widgets';
import MapChart from 'components/widgets/map';
import TableChart from 'components/widgets/table/cba';

// specs
import BarChartSpec from 'components/widgets/specs/cba/bar-chart';
import LineSpec from 'components/widgets/specs/cba/line';
import MultiLineSpec from 'components/widgets/specs/cba/multi-line';

// utils
import {
  getCbaEmbedURL,
  getCbaPreviewURL,
  generateCbaDownloadURL
} from 'utils/share';
import { logEvent } from 'utils/analytics';

// styles
import './styles.scss';

class AnalyzerOutputs extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    originalFormatFilters: PropTypes.object.isRequired,
    filtersStatus: PropTypes.object.isRequired,
    currentLocation: PropTypes.object,
    widgets: PropTypes.array.isRequired,
    isNullTime: PropTypes.bool.isRequired,
    applyFilters: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
  }

  static defaultProps = { currentLocation: {} }

  shouldComponentUpdate(nextProps) {
    const { filtersStatus: nextFiltersStatus } = nextProps;

    return nextFiltersStatus.applied;
  }

  componentDidUpdate() {
    const { applyFilters } = this.props;

    applyFilters(false);
  }

  onMoreInfo = (widget) => {
    const {
      setModal,
      originalFormatFilters,
      filters
    } = this.props;

    setModal(({
      visible: true,
      options: {
        type: 'widget-info',
        widget: {
          ...widget,
          params: {
            ...widget.params,
            title: replace(widget.params.title, filters)
          }
        },
        embedURL: getCbaPreviewURL(widget, originalFormatFilters)
      }
    }));
  }

  onDownloadWidget = (option, widget) => {
    const {
      setModal,
      originalFormatFilters,
      filters
    } = this.props;

    if (option === 'embed') {
      setModal(({
        visible: true,
        options: {
          type: 'widget-share',
          widget: {
            ...widget,
            params: {
              ...widget.params,
              title: replace(widget.params.title, filters)
            }
          },
          embedURL: getCbaEmbedURL(widget, originalFormatFilters)
        }
      }));
    }

    if (['json', 'csv'].includes(option)) generateCbaDownloadURL(widget, originalFormatFilters, option);

    logEvent('[AQ-Flood]', `analyser tab: user downloads widget "${widget.id}" in format:`, option);
  }

  render() {
    const {
      filters,
      widgets,
      currentLocation,
      isNullTime,
    } = this.props;

    return (
      <div className="c-analyzer-outputs">
        <div className="wrapper">
          <div className="container">
            {widgets.map(widget => (
              <div key={widget.id} className="widget-row">
                {widget.id === 'inundation_map' ? (
                  <WidgetMap
                    title={replace(widget.params.title, filters)}
                    params={{ id: widget.id, filters }}
                    onMoreInfo={() => this.onMoreInfo(widget)}
                  >
                    {({ data, params }) => (
                      <MapChart
                        data={data}
                        params={params}
                        bbox={currentLocation.bbox}
                      />)}
                  </WidgetMap>) : (
                    <Widget
                      title={replace(
                        widget.params.title,
                        { ...filters,
                          end: filters.implementation_start + filters.infrastructure_life }
                      )}
                      params={{
                        id: widget.id,
                        filters,
                        isNullTime
                      }}
                      onMoreInfo={() => {
                        this.onMoreInfo(widget)

                        logEvent('[AQ-Flood]', `analyzer tab: user clicks in more info for widget ${widget.id}`);
                      }}
                      onDownloadWidget={(option, _widget) => this.onDownloadWidget(option, _widget)}
                    >
                      {({ data, params }) => {

                        if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'table') return (<TableChart data={data} />)

                        return null;
                      }}
                    </Widget>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzerOutputs;
