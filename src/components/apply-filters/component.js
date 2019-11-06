import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'aqueduct-components';

// styles
import './styles.scss';

class ApplyFilters extends PureComponent {
  static propTypes = {
    applyFilters: PropTypes.func.isRequired,
    setIsNullTime: PropTypes.func.isRequired
  }

  onClick = () => {
    const { applyFilters, setIsNullTime } = this.props;
    applyFilters(true);
    setIsNullTime(false);
  }

  render() {
    return (
      <div className="c-apply-filters">
        <Button
          onClick={this.onClick}
          theme="light"
          className="-large -bg-light-blue -uppercase -bold"
        >
          Apply Changes
        </Button>
      </div>
    )
  }
}

export default ApplyFilters;
