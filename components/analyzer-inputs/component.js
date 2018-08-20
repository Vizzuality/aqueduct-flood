import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Button,
  Field,
  CustomSelect,
  Range,
  Slider
} from 'aqueduct-components';

// components
import SectionHeader from 'components/ui/section-header';

// constants
import {
  DESIGN_PROTECTION_LEVEL_YEAR_OPTIONS,
  EXISTING_PROTECTION_LEVEL_MARKS,
  EXISTING_PROTECTION_LEVEL_OPTIONS,
  IMPLEMENTATION_YEAR_OPTIONS,
  INFRASTRUCTURE_LIFE_TIME_OPTIONS,
  UNIT_COST_OPTIONS,
  DISCOUNT_RATE_OPTIONS,
  OPERATION_MAINTENANCE_COST_OPTIONS
} from './constants';

// styles
import './styles.scss';

class AnalyzerInputs extends PureComponent {
  static generateModalOptions = (type, key) => ({
    visible: true,
    options: { type, key }
  });

  static propTypes = {
    filters: PropTypes.shape({
      existing_prot: PropTypes.number.isRequired,
      prot_fut: PropTypes.number.isRequired,
      ref_year: PropTypes.number.isRequired,
      implementationYearRange: PropTypes.array.isRequired,
      infrastructure_life: PropTypes.number.isRequired,
      benefits_start: PropTypes.number.isRequired,
      user_urb_cost: PropTypes.number,
      discount_rate: PropTypes.number.isRequired,
      om_costs: PropTypes.number.isRequired
    }).isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { filters } = this.props;
    const indexExistingProtection = EXISTING_PROTECTION_LEVEL_OPTIONS.findIndex(opt => opt === filters.existing_prot);
    const nextIndex = indexExistingProtection + 1 > EXISTING_PROTECTION_LEVEL_OPTIONS.length ?
      indexExistingProtection : indexExistingProtection + 1;

    this.designProtectionOptions = [...EXISTING_PROTECTION_LEVEL_OPTIONS.slice(nextIndex)];
    this. designProtectionMarks = {};

    this.designProtectionOptions.forEach(opt => {
      this.designProtectionMarks[opt] = opt;
    });
  }

  componentWillReceiveProps(nextProps) {
    const { existing_prot: nextExistingProt } = nextProps.filters;
    const { filters } = this.props;
    const { existing_prot: existingProt } = filters;

    if (existingProt === nextExistingProt) {
      const indexExistingProtection = EXISTING_PROTECTION_LEVEL_OPTIONS.findIndex(opt => opt === existingProt);
      const nextIndex = indexExistingProtection + 1 > EXISTING_PROTECTION_LEVEL_OPTIONS.length ?
        indexExistingProtection : indexExistingProtection + 1;

      this.designProtectionOptions = [...EXISTING_PROTECTION_LEVEL_OPTIONS.slice(nextIndex)];
      this. designProtectionMarks = {};

      this.designProtectionOptions.forEach(opt => {
        this.designProtectionMarks[opt] = opt;
      });
    }
  }

  render() {
    const { filters, onChangeFilter, setModal } = this.props;

    console.log(this.designProtectionOptions);
    console.log(this. designProtectionMarks);

    return (
      <div className="c-analyzer-inputs">
        <SectionHeader title="input table" />
        <section>
          <div className="category">
            <span className="category-name">
              Design Protection Standards
            </span>
            <Button
              onClick={() => setModal(AnalyzerInputs.generateModalOptions('info', 'design-protection-standards'))}
            >
              <Icon name="question" theme="dark" className="-round" />
            </Button>
          </div>
          <div className="selectors-container">
            <Field
              name="existing-protection-level"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-bolder"
            >
              <Slider
                min={EXISTING_PROTECTION_LEVEL_OPTIONS[0]}
                max={EXISTING_PROTECTION_LEVEL_OPTIONS[EXISTING_PROTECTION_LEVEL_OPTIONS.length - 1]}
                theme="dark"
                step={null}
                marks={EXISTING_PROTECTION_LEVEL_MARKS}
                defaultValue={filters.existing_prot}
                onAfterChange={value => { onChangeFilter({ existing_prot: value }) }}
              />
            </Field>

            <Field
              name="design-protection-level"
              theme="dark"
              label="Design Protection Level (Return Period)"
              className="-bolder"
            >
              <Slider
                min={this.designProtectionOptions[0]}
                max={this.designProtectionOptions[this.designProtectionOptions.length - 1]}
                disabled={this.designProtectionOptions[0] === this.designProtectionOptions[this.designProtectionOptions.length - 1]}
                theme="dark"
                step={null}
                marks={this.designProtectionMarks}
                defaultValue={filters.prot_fut}
                onAfterChange={value => { onChangeFilter({ prot_fut: value }) }}
              />
            </Field>

            <Field
              name="target-year-design-protection-level"
              theme="dark"
              label="Target Year for the Design Protection Level"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_YEAR_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.ref_year}
                onChange={opt => onChangeFilter({ ref_year: opt && opt.value })}
              />
            </Field>
          </div>
        </section>
        <section>
          <div className="category">
            <span className="category-name">
              Timeframes
            </span>
            <Button
              onClick={() => setModal(AnalyzerInputs.generateModalOptions('info', 'timeframes'))}
            >
              <Icon name="question" theme="dark" className="-round" />
            </Button>
          </div>
          <div className="selectors-container">
            <Field
              name="implementation-year"
              theme="dark"
              label="Implementation Range"
              className="-bolder"
            >
              <Range
                min={IMPLEMENTATION_YEAR_OPTIONS[0]}
                max={IMPLEMENTATION_YEAR_OPTIONS[1]}
                theme="dark"
                defaultValue={filters.implementationYearRange}
                onAfterChange={value => {
                  onChangeFilter({
                    implementationYearRange: value,
                    benefits_start: value[0]
                  })
                }}
                pushable
              />
            </Field>

            <Field
              name="infrastructure-life-time"
              theme="dark"
              label="Infrastructure Life Time"
              className="-bolder"
            >
              <Slider
                min={INFRASTRUCTURE_LIFE_TIME_OPTIONS[0]}
                max={INFRASTRUCTURE_LIFE_TIME_OPTIONS[1]}
                theme="dark"
                defaultValue={filters.infrastructure_life}
                onAfterChange={value => { onChangeFilter({ infrastructure_life: value }) }}
              />
            </Field>

            <Field
              name="benefit-start-year"
              theme="dark"
              label="Benefit Start Year"
              className="-bolder"
            >
              <Slider
                min={filters.implementationYearRange[0]}
                max={filters.implementationYearRange[1]}
                theme="dark"
                defaultValue={filters.benefits_start}
                onAfterChange={value => { onChangeFilter({ benefits_start: value }) }}
              />
            </Field>
          </div>
        </section>
        <section>
          <div className="category">
            <span className="category-name">
              Costs
            </span>
            <Button
              onClick={() => setModal(AnalyzerInputs.generateModalOptions('info', 'costs'))}
            >
              <Icon name="question" theme="dark" className="-round" />
            </Button>
          </div>
          <div className="selectors-container">
            <Field
              name="user-urb-cost"
              theme="dark"
              label="Unit Cost ($million/meter/kilometer)"
              className="-bolder"
            >
              <Slider
                min={UNIT_COST_OPTIONS[0]}
                max={UNIT_COST_OPTIONS[1]}
                step={0.01}
                theme="dark"
                defaultValue={filters.user_urb_cost}
                onAfterChange={value => { onChangeFilter({ user_urb_cost: value }) }}
              />
            </Field>

            <Field
              name="discount-rate"
              theme="dark"
              label="Annual Discount Rate (%)"
              className="-bolder"
            >
              <Slider
                min={DISCOUNT_RATE_OPTIONS[0]}
                max={DISCOUNT_RATE_OPTIONS[1]}
                theme="dark"
                defaultValue={filters.discount_rate}
                formatValue={value => `${value}%`}
                onAfterChange={value => { onChangeFilter({ discount_rate: value }) }}
              />
            </Field>

            <Field
              name="operation-maintenance-cost"
              theme="dark"
              label="Operation & Maintenance Cost (%)"
              className="-bolder"
            >
              <Slider
                min={OPERATION_MAINTENANCE_COST_OPTIONS[0]}
                max={OPERATION_MAINTENANCE_COST_OPTIONS[1]}
                theme="dark"
                defaultValue={filters.om_costs}
                formatValue={value => `${value}%`}
                onAfterChange={value => { onChangeFilter({ om_costs: value }) }}
              />
            </Field>
          </div>
        </section>
      </div>
    );
  }
}

export default AnalyzerInputs;
