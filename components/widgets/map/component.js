import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import Map, {
  MapControls,
  ZoomControl
} from 'wri-api-components/dist/map';

// styles
import './styles.scss';

class MapChart extends PureComponent {
  render() {
    return (
      <div className="c-map-widget">
        <div className="side">
          <Map customClass="widget-map">
            {(map) => (
              <MapControls>
                <ZoomControl map={map} />
              </MapControls>
            )}
          </Map>
        </div>
        <div className="side">
          <Map customClass="widget-map">
            {(map) => (
              <MapControls>
                <ZoomControl map={map} />
              </MapControls>
            )}
          </Map>
        </div>
      </div>
    );
  }
}

export default MapChart;
