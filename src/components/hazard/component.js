import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

// components
import HazardFilters from 'components/hazard/filters';

// styles
import './styles.scss';

class Hazard extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    setActiveLayer: PropTypes.func.isRequired,
    fetchLayers: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { fetchLayers } = this.props;

    fetchLayers();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, fetchLayers, setActiveLayer } = this.props;
    const { filters: nextFilters } = nextProps;
    const hazardFiltersChanged = !isEqual(filters.hazard, nextFilters.hazard);

    if (hazardFiltersChanged)  {
      setActiveLayer([]);
      fetchLayers();
    }
  }

  render() {
    return (
      <div className="c-hazard">
        <div className="l-filters">
          <HazardFilters />
        </div>
      </div>
    );
  }
}


export default Hazard;
