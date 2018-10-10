import React from "react";
import { Header as AQHeader } from 'aqueduct-components';

// constants
import { APP_NAVIGATION } from './constants';

// styles
import './styles.scss';

const Header = (props) => (
  <div className="l-header">
    <AQHeader
      title="flood"
      app="country-basin-risk-profiles-and-rankings"
      {...props}
    >
      {APP_NAVIGATION}
    </AQHeader>
  </div>
);

export default Header;
