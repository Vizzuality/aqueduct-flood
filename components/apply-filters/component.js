import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'aqueduct-components';

// styles
import './styles.scss';

class ApplyFilters extends PureComponent {
  static propTypes = { applyFilters: PropTypes.func.isRequired }

  render() {
    const { applyFilters } = this.props;

    return (
      <div className="c-apply-filters">
        <Button
          onClick={() => applyFilters(true)}
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
