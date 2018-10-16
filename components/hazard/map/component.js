import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  MapControls,
  ZoomControl,
  Legend
} from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';
import { Spinner } from 'aqueduct-components';

// components
import HazardLegend from 'components/ui/map/legend';

// styles
import './styles.scss';

class HazardMap extends PureComponent {
  static propTypes = {
    // used by layerManager
    activeLayers: PropTypes.array.isRequired,
    // used by legend
    layers: PropTypes.array.isRequired,
    mapOptions: PropTypes.object.isRequired,
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

  onClickLayer = (checked, layer) => {
    const { setActiveLayer, activeLayers } = this.props

    if (checked) {
      setActiveLayer([...activeLayers.map(_l => _l.id), ...[layer.id]]);
    } else {
      setActiveLayer(activeLayers.filter(_layer => _layer.id !== layer.id).map(_l => _l.id))
    }
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

  render () {
    const {
      mapOptions,
      activeLayers,
      layers,
      loading
    } = this.props;
    const { bounds } = mapOptions;

    return (
      <div className="l-hazard-map">
        {loading && <Spinner />}
        <Map
          mapOptions={{}}
          bounds={bounds}
          events={this.mapEvents}
        >
          {(map) => (
            <Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {layerManager => activeLayers.map((l, i) => (
                  <Layer
                    layerManager={layerManager}
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
              </MapControls>

              {layers.length && (
                <Legend
                  maxWidth={500}
                  maxHeight={300}
                >
                  <HazardLegend
                    layers={layers}
                    onClickLayer={this.onClickLayer}
                  />
                </Legend>)}
            </Fragment>
          )}
        </Map>
      </div>
    )
  }
}

export default HazardMap;
