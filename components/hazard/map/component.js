import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  MapControls,
  ZoomControl,
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  LegendItemTimeline
} from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';
import { Spinner } from 'aqueduct-components';

// styles
import './styles.scss';

class HazardMap extends PureComponent {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    layerGroups: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    setActiveLayer: PropTypes.func.isRequired
  }

  render () {
    const {
      layers,
      layerGroups,
      loading,
      setActiveLayer
    } = this.props;

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
                {layerManager => layers.map((l, i) => (
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

              {!!layerGroups[0].layers.length && (
                <Legend
                  maxWidth={500}
                  maxHeight={300}
                >
                  {layerGroups.map((lg, i) => (
                    <LegendListItem
                      index={i}
                      key={lg.dataset}
                      layerGroup={lg}
                      toolbar={
                        <LegendItemToolbar onChangeLayer={l => setActiveLayer(l.id)} />
                      }
                    >
                      <LegendItemTypes />
                      <LegendItemTimeline onChangeLayer={l => console.info(l)} />
                    </LegendListItem>
                  ))}
                </Legend>)}
            </Fragment>
          )}
        </Map>
      </div>
    )
  }
}

export default HazardMap;
