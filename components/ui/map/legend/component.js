import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'aqueduct-components';

// styles
import './styles.scss';

class HazardLegend extends PureComponent {
  static propTypes = {
    layers: PropTypes.array.isRequired,
    onClickLayer: PropTypes.func.isRequired
  }

  onClickLayer = (checked, layer) => {
    const { onClickLayer } = this.props;

    onClickLayer(checked, layer);
  }

  render() {
    const { layers } = this.props;

    return (
      <div className="c-hazard-legend">
        <ul className="layer-list">
          {layers.map(_layer => (
            <li
              key={_layer.id}
              className="layer-list-item"
            >
              <Checkbox
                label={_layer.name}
                name={_layer.slug}
                value={_layer.slug}
                theme="dark"
                defaultChecked={_layer.active}
                onChange={({ checked }) => this.onClickLayer(checked, _layer)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HazardLegend;
