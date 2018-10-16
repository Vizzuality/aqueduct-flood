import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// styles
import './styles.scss';

class ApplyFilters extends PureComponent {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    filtersCompare: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,
    fetchCache: PropTypes.func.isRequired,
    applyFilters: PropTypes.func.isRequired
  }

  state = { disabled: true }

  componentWillReceiveProps(nextProps) {
    const { filters, filtersCompare } = this.props;
    const {
      filters: nextFilters,
      filtersCompare: nextFiltersCompare
    } = nextProps;
    const filtersChanged = !isEqual(nextFilters, filters);
    const filtersCompareChanged = !isEqual(nextFiltersCompare, filtersCompare);

    if (filtersChanged || filtersCompareChanged) {
      this.setState({ disabled: false })
    }
  }

  onApplyFilters = () => {
    const { tab, applyFilters, fetchCache } = this.props;

    this.setState({ disabled: true}, () => {
      if (tab === 'cba') fetchCache();
      applyFilters(true);
    });
  }

  render() {
    // const { applied } = this.props;
    const { disabled } = this.state;

    return (
      <div className="c-apply-filters">
        <Button
          onClick={this.onApplyFilters}
          theme="light"
          disabled={disabled}
          // disabled={applied}
          className="-large -bg-light-blue -uppercase -bold"
        >
          Apply Changes
        </Button>
      </div>
    )
  }
}

export default ApplyFilters;
