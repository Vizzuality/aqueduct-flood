import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Header as AQHeader } from 'aqueduct-components';

// constants
import { APP_NAVIGATION } from './constants';

// styles
import './styles.scss';

class Header extends PureComponent {
  static propTypes = { 
    className: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = { 
    className: null,
    title: 'floods'
  }

  render() {
    const { className, title } = this.props;
    const componentClass = classnames('l-header', { [className] : !!className});

    return (
      <div className={componentClass}>
        <AQHeader
          title={title}
          app="country-basin-risk-profiles-and-rankings"
          {...this.props}
        >
          {APP_NAVIGATION}
        </AQHeader>
      </div>
    );
  }
}

export default Header;
