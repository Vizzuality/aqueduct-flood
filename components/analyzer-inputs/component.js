import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Field, CustomSelect, Range } from 'aqueduct-components';

// components
import SectionHeader from 'components/ui/section-header';

// constants
import { DESIGN_PROTECTION_LEVEL_OPTIONS } from './constants';

// styles
import './styles.scss';

class AnalyzerInputs extends PureComponent {
  static generateModalOptions = (type, key) => ({
    visible: true,
    options: { type, key }
  });

  static propTypes = {
    filters: PropTypes.shape({
      existingProtectionLevel: PropTypes.string,
      designProtectionLevel: PropTypes.string,
      targetYearDesignProtectionLevel: PropTypes.string,
      implementationStartYear: PropTypes.string,
      implementationEndYear: PropTypes.string,
      infrastructureLifetime: PropTypes.string,
      benefitStartYear: PropTypes.string,
      unitCost: PropTypes.string,
      annualDiscountRate: PropTypes.string,
      operationCost: PropTypes.string
    }).isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired
  };

  render() {
    const { filters, onChangeFilter, setModal } = this.props;
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
              name="test"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-bolder"
            >
              <Range
                min={0}
                max={20}
                theme="dark"
                defaultValue={[3, 10]}
                onAfterChange={value => console.log(value)}
              />
            </Field>

            <Field
              name="existing-protection-level"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.existingProtectionLevel}
                isClearable
                onChange={opt => onChangeFilter({ existingProtectionLevel: opt && opt.value })}
              />
            </Field>

            <Field
              name="design-protection-level"
              theme="dark"
              label="Design Protection Level (Return Period)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.designProtectionLevel}
                isClearable
                onChange={opt => onChangeFilter({ designProtectionLevel: opt && opt.value })}
              />
            </Field>

            <Field
              name="target-year-design-protection-level"
              theme="dark"
              label="Target Year for the Design Protection Level"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.targetYearDesignProtectionLevel}
                isClearable
                onChange={opt => onChangeFilter({ targetYearDesignProtectionLevel: opt && opt.value })}
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
              name="implementation-start-year"
              theme="dark"
              label="Implementatation Start Year"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.implementationStartYear}
                isClearable
                onChange={opt => onChangeFilter({ implementationStartYear: opt && opt.value })}
              />
            </Field>

            <Field
              name="implementation-end-year"
              theme="dark"
              label="Implementatation End Year"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.implementationEndYear}
                isClearable
                onChange={opt => onChangeFilter({ implementationEndYear: opt && opt.value })}
              />
            </Field>

            <Field
              name="infrastructure-life-time"
              theme="dark"
              label="Infrastructure Life Time"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.infrastructureLifetime}
                isClearable
                onChange={opt => onChangeFilter({ infrastructureLifetime: opt && opt.value })}
              />
            </Field>

            <Field
              name="benefit-start-year"
              theme="dark"
              label="Benefit Start Year"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.benefitStartYear}
                isClearable
                onChange={opt => onChangeFilter({ benefitStartYear: opt && opt.value })}
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
              name="unit-cost"
              theme="dark"
              label="Unit Cost ($million/meter/kilometer)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.unitCost}
                isClearable
                onChange={opt => onChangeFilter({ unitCost: opt && opt.value })}
              />
            </Field>

            <Field
              name="annual-discount-rate"
              theme="dark"
              label="Annual Discount Rate (%)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.annualDiscountRate}
                isClearable
                onChange={opt => onChangeFilter({ annualDiscountRate: opt && opt.value })}
              />
            </Field>

            <Field
              name="operation-maintenance-cost"
              theme="dark"
              label="Operation & Maintenance Cost (%)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                value={filters.operationCost}
                isClearable
                onChange={opt => onChangeFilter({ operationCost: opt && opt.value })}
              />
            </Field>
          </div>
        </section>
      </div>
    );
  }
}

export default AnalyzerInputs;
