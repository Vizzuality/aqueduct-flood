import React from 'react';

// components
import HazardFilters from 'components/hazard/filters';

// styles
import './styles.scss';

const Hazard = () =>
  (
    <div className="c-hazard">
      <div className="l-filters">
        <HazardFilters />
      </div>
    </div>
  )

export default Hazard;
