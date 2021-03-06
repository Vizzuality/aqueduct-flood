import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  MapControls,
  ZoomControl,
  Legend
} from 'vizzuality-components';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import { Spinner, Icon } from 'aqueduct-components';

// utils
import { logEvent } from 'utils/analytics';

// components
import HazardLegend from './legend';
import BasemapControl from './basemap-selector';


// constants
import { LABEL_LAYER_CONFIG } from './constants';


// styles
import './styles.scss';

class HazardMap extends PureComponent {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    mapOptions: PropTypes.object.isRequired,
    basemap: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setActiveLayer: PropTypes.func.isRequired,
    deleteActiveLayer: PropTypes.func.isRequired,
    setMapOptions: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.mapEvents = {
      zoomend: this.setMapBounds,
      dragend: this.setMapBounds
    };
  }

  setMapBounds = (e, map) => {
    const { setMapOptions } = this.props;

    const bounds = map.getBounds();
    const north = bounds.getNorth();
    const south = bounds.getSouth();
    const east = bounds.getEast();
    const west = bounds.getWest();

    setMapOptions({
      bounds: { bbox: [west, north, east, south] }
    });
  }

  handleBoundaries() {
    const { mapOptions: { boundaries }, setMapOptions } = this.props;

    setMapOptions({ boundaries: !boundaries });
    logEvent('[AQ-Flood]', 'hazard tab: user toggles bondaries', (!boundaries).toString());
  }

  render () {
    const {
      mapOptions: { bounds, boundaries },
      basemap,
      layers,
      loading
    } = this.props;

    return (
      <div className="l-hazard-map">
        {loading && <Spinner />}
        <Map
          mapOptions={{}}
          bounds={bounds}
          events={this.mapEvents}
          basemap={basemap}
          {...boundaries && { label: LABEL_LAYER_CONFIG }}
        >
          {(map) => (
            <Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {layers.map((l, i) => (
                  <Layer
                    key={l.id}
                    {...l}
                    zIndex={1000 - i}
                  />
                ))}
              </LayerManager>

              <MapControls customClass="map-controls">
                <ZoomControl
                  map={map}
                  customClass="zoom-controls"
                />
                <BasemapControl basemap={basemap.id} />
                <button
                  type="submit"
                  className="boundaries-button"
                  onClick={() => { this.handleBoundaries(); }}
                >
                  <Icon name="boundaries" />
                </button>
                <a
                  href="https://www.wri.org/resources/data-sets/aqueduct-floods-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  <Icon name="download" theme="dark" />
                </a>
              </MapControls>

              {layers.length && (
                <Legend
                  maxWidth={500}
                  maxHeight={300}
                >
                  <HazardLegend />
                </Legend>)}
            </Fragment>
          )}
        </Map>
      </div>
    )
  }
}

export default HazardMap;
