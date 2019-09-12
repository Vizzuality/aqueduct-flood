import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';

// components
import { Icon, RadioGroup } from 'aqueduct-components';

// constants
import { BASEMAPS } from '../constants';

// styles
import './styles.scss';

class BasemapControl extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this._onScreenClick = this.onScreenClick.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-basemap-tooltip');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) this.toggleDropdown(false);
  }

  onBasemapChange({ value }) {
    this.props.setMapOptions({ basemap: value });
  }

  toggleDropdown(to) {
    const active = (typeof to !== 'undefined' && to !== null) ? to : !this.state.active;

    this.setState({ active });

    requestAnimationFrame(() => {
      if (to) {
        window.addEventListener('click', this._onScreenClick);
      } else {
        window.removeEventListener('click', this._onScreenClick);
      }
    });
    this.setState({ active });
  }

  // RENDER
  render() {
    const { basemap } = this.props;
    const { active } = this.state;

    return (
      <TetherComponent
        attachment="top right"
        constraints={[{
          to: 'window'
        }]}
        targetOffset="8px 100%"
        classes={{
          element: 'c-basemap-tooltip -arrow-right'
        }}
        renderTarget={(ref) => (
          <button type="button" ref={ref} className="basemap-button" onClick={() => this.toggleDropdown(true)}>
            <Icon name="layers" className="-small" />
          </button>
        )}
        renderElement={(ref) => {
          if (active) return (
            <div ref={ref}>
              <RadioGroup
                items={Object.keys(BASEMAPS).map((k) => {
                  const bs = BASEMAPS[k];
                  return {
                    label: bs.label,
                    value: bs.id,
                    checked: bs.id === basemap
                  };
                })}
                name="basemap"
                onChange={(_basemap) => { this.onBasemapChange(_basemap); }}
              />
            </div>
          );
          return null;
        }}
      />
    );
  }
}

BasemapControl.propTypes = {
  basemap: PropTypes.string.isRequired,
  setMapOptions: PropTypes.func.isRequired
};

export default BasemapControl;
