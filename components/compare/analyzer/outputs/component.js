import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { replace } from 'aqueduct-components';

// components
import Widget from 'components/analyzer/widget';
import WidgetCompare from 'components/compare/analyzer/widget';
import WidgetMap from 'components/analyzer/widget-map';
import WidgetMapCompare from 'components/compare/analyzer/widget-map';
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


// styles
import './styles.scss';

class AnalyzerCompareOutputs extends Component {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    filtersStatus: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    applyFilters: PropTypes.func.isRequired,
    originalFormatFilters: PropTypes.object.isRequired,
    originalFormatCompareFilters: PropTypes.object.isRequired,
    currentLocation: PropTypes.object,
    currentLocationCompare: PropTypes.object,
    setModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    currentLocation: {},
    currentLocationCompare: {}
  }

  shouldComponentUpdate(nextProps) {
    const { filtersStatus: nextFiltersStatus } = nextProps;

    return nextFiltersStatus.applied;
  }

  componentDidUpdate() {
    const { applyFilters } = this.props;

    applyFilters(false);
  }

  onMoreInfo = (widget, filters) => {
    const { setModal } = this.props;

    setModal(({
      visible: true,
      options: {
        type: 'widget-info',
        widget: {
          ...widget,
          params: {
            ...widget.params,
            title: replace(widget.params.title, { ...filters.common, ...filters.cba })
          }
        },
        embedURL: getCbaPreviewURL(widget, filters)
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
              title: replace(widget.params.title, { ...filters.common, ...filters.cba })
            }
          },
          embedURL: getCbaEmbedURL(widget, filters)
        }
      }));
    }

    if (['json', 'csv'].includes(option)) generateCbaDownloadURL(widget, filters, option);
  }

  render() {
    const {
      widgets,
      filters,
      filtersCompare,
      originalFormatFilters,
      originalFormatCompareFilters ,
      currentLocation,
      currentLocationCompare
    } = this.props;
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
                {widget.id === 'inundation_map' ? (
                  <WidgetMap
                    title={replace(widget.params.title, filters)}
                    params={{ id: widget.id, filters }}
                    onShareWidget={() => this.onShareWidget(widget)}
                  >
                    {({ params }) => (<MapChart params={params} bbox={currentLocation.bbox} />)}
                  </WidgetMap>) : (
                    <Widget
                      title={replace(widget.params.title, filters)}
                      params={{ id: widget.id, filters }}
                      onMoreInfo={() => this.onMoreInfo(widget, originalFormatFilters)}
                      onDownloadWidget={(option, _widget) => this.onDownloadWidget(option, _widget, originalFormatFilters)}
                    >
                      {({ data, params = {} }) => {

                        if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

                        if (params.type === 'table') return (<TableChart data={data} />)

                        return null;
                      }}
                    </Widget>
                  )}
              </div>
              {widgetsCompareReadyToDisplay && (
                <div className="col-md-6">
                  {widget.id === 'inundation_map' ? (
                    <WidgetMapCompare
                      title={replace(widget.params.title, filtersCompare)}
                      params={{ id: widget.id, filtersCompare }}
                      onShareWidget={() => this.onShareWidget(widget)}
                      isCompare
                    >
                      {({ params }) => (<MapChart params={params} isCompare bbox={currentLocationCompare.bbox} />)}
                    </WidgetMapCompare>) : (
                      <WidgetCompare
                        title={replace(widget.params.title, filtersCompare)}
                        params={{ id: widget.id, filtersCompare }}
                        onMoreInfo={() => this.onMoreInfo(widget, originalFormatCompareFilters)}
                        onDownloadWidget={(option, _widget) => this.onDownloadWidget(option, _widget, originalFormatCompareFilters)}
                      >
                        {({ data, params = {} }) => {

                          if (params.type === 'bar') return (<Chart spec={BarChartSpec} params={params} data={{ table: data }} />)

                          if (params.type === 'line') return (<Chart spec={LineSpec} params={params} data={{ table: data }} />)

                          if (params.type === 'multi-line') return (<Chart spec={MultiLineSpec} params={params} data={{ table: data }} />)

                          if (params.type === 'table') return (<TableChart data={data} />)

                          return null;
                        }}
                      </WidgetCompare>
                    )}
                </div>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AnalyzerCompareOutputs;
