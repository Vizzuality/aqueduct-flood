import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'routes';
import { Field, CustomSelect, Button } from 'aqueduct-components';

// components
import AnalyzerInputs from 'components/analyzer-inputs';

// constants
import { SCENARIOS_OPTIONS } from 'constants/analyzer';

// styles
import './styles.scss';

class Analyzer extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      location: PropTypes.string,
      scenario: PropTypes.string,
      locationCompare: PropTypes.string
    }).isRequired,
    setFilter: PropTypes.func.isRequired,
    setCompareFilter: PropTypes.func.isRequired
  }

  render() {
    const {
      filters,
      setFilter,
      setCompareFilter
    } = this.props;

    return (
      <div className="c-analyzer">
        <div className="analyzer-filters">
          <div className="filter-row">
            {/* location */}
            <Field
              name="location-filter"
              label="Select a location"
              className="-bigger"
            >
              <CustomSelect
                options={SCENARIOS_OPTIONS}
                placeholder="Select a location"
                value={filters.location}
                onChange={opt => setFilter({ location: opt && opt.value })}
                isClearable
              />
            </Field>

            {/* location compare */}
            <Field
              name="location-compare-filter"
              label="Compare with"
              className="-bigger"
            >
              <CustomSelect
                options={SCENARIOS_OPTIONS}
                placeholder="Compare with"
                isDisabled={!filters.location}
                value={filters.compareLocation}
                onChange={(opt) => {
                  setCompareFilter({ location: opt && opt.value });
                  if (opt) Router.push('/analyzer-compare');
                }}
                isClearable
              />
            </Field>
          </div>
          <div className="filter-row">
            {/* future scenearios */}
            <Field
              name="future-scenario-filter"
              label="Select a future scenario"
              className="-bigger"
            >
              <CustomSelect
                options={SCENARIOS_OPTIONS}
                placeholder="Select a future scenario"
                value={filters.scenario}
                onChange={opt => setFilter({ scenario: opt && opt.value })}
                isClearable
              />
            </Field>
          </div>
        </div>

        <AnalyzerInputs onChangeFilter={setFilter} filters={filters} />

        <div className="filters-btn-container">
          <Button
            onClick={() => console.info('applies filters')}
            theme="light"
            className="-large -bg-light-blue -uppercase -bold"
          >
            apply changes
          </Button>
        </div>
      </div>
    );
  }
}

export default Analyzer;
