import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Base64 } from 'js-base64';
import { Router } from 'routes';
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
    filters: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setActiveLayer: PropTypes.func.isRequired,
    deleteActiveLayer: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    const { activeLayers } = this.props;
    const {
      activeLayers: nextActiveLayers,
      filters: nextFilters
    } = nextProps;

    const layersChanged = !isEqual(activeLayers, nextActiveLayers);


    if (layersChanged) {
      Router.replaceRoute('home',
        {
          tab: 'hazard',
          p: Base64.encode(JSON.stringify({
            ...nextFilters,
            activeLayers: nextActiveLayers.map(_layer => _layer.id)
          }))
        },
        { shallow: true });
    }
  }

  onClickLayer = (checked, layer) => {
    const { setActiveLayer, deleteActiveLayer } = this.props;

    return checked ? setActiveLayer(layer.id) : deleteActiveLayer(layer.id)
  }

  render () {
    const { activeLayers, layers, loading } = this.props;

    return (
      <div className="l-hazard-map">
        {loading && <Spinner />}
        <Map
          mapOptions={{}}
          events={{}}
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

              <MapControls>
                <ZoomControl map={map} />
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
