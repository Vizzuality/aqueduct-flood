import React from "react";
import { Header as AQHeader } from 'aqueduct-components';

// constants
import { APP_NAVIGATION } from './constants';

// styles
import './styles.scss';

const Header = () => (
  <div className="l-header">
    <AQHeader
      title="flood"
      app="country-basin-risk-profiles-and-rankings"
    >
      {APP_NAVIGATION}
    </AQHeader>
  </div>
);

export default Header;
