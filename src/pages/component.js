import React, { Fragment } from 'react';
import { Icons as AQIcons }  from 'aqueduct-components';

// layout components
import { Icons as WRIIcons } from 'vizzuality-components';
import Icons from 'components/ui/icons';

// constants
import { PAGES_DICTIONARY } from './constants';

const Page = ({ page }) => {
  const ComponentPage = PAGES_DICTIONARY[page];
  return (
    <Fragment>
      <Icons />
      <AQIcons />
      <WRIIcons />

      <div className="l-page">
        <ComponentPage />
      </div>
    </Fragment>
  );
};

export default Page;