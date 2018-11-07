import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Map, {
  MapControls,
  ZoomControl
} from 'wri-api-components/dist/map';
import { LayerManager } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

// styles
import './styles.scss';

class MapChart extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    bbox: PropTypes.arrayOf(PropTypes.number)
  }

  static defaultProps = { bbox: [0, 0, 0, 0] }

  render() {
    const { bbox, data } = this.props;

    return (
      <div className="c-map-widget">
        <div className="side">
          <Map
            customClass="widget-map"
            bounds={{ bbox }}
          >
            {(map) => (
              <Fragment>
                <LayerManager
                  map={map}
                  plugin={PluginLeaflet}
                  layersSpec={data.left}
                />
                <MapControls customClass="map-controls">
                  <ZoomControl
                    customClass="zoom-controls"
                    map={map}
                  />
                </MapControls>
              </Fragment>
            )}
          </Map>
        </div>
        <div className="side">
          <Map
            customClass="widget-map"
            bounds={{ bbox }}
          >
            {(map) => (
              <Fragment>
                <LayerManager
                  map={map}
                  plugin={PluginLeaflet}
                  layersSpec={data.right}
                />
                <MapControls customClass="map-controls">
                  <ZoomControl
                    customClass="zoom-controls"
                    map={map}
                  />
                </MapControls>
              </Fragment>
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default MapChart;
