import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Field, CustomSelect } from 'aqueduct-components';

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
              name="existing-protection-level"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-inline -bolder"
            >
              <CustomSelect
                options={DESIGN_PROTECTION_LEVEL_OPTIONS}
                placeholder="Select a year"
                theme="dark"
                defaultValue={filters.existingProtectionLevel}
                onChange={({ value }) => onChangeFilter({ existingProtectionLevel: value })}
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
                defaultValue={filters.designProtectionLevel}
                onChange={({ value }) => onChangeFilter({ designProtectionLevel: value })}
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
                defaultValue={filters.targetYearDesignProtectionLevel}
                onChange={({ value }) => onChangeFilter({ targetYearDesignProtectionLevel: value })}
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
                defaultValue={filters.implementationStartYear}
                onChange={({ value }) => onChangeFilter({ implementationStartYear: value })}
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
                defaultValue={filters.implementationEndYear}
                onChange={({ value }) => onChangeFilter({ implementationEndYear: value })}
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
                defaultValue={filters.infrastructureLifetime}
                onChange={({ value }) => onChangeFilter({ infrastructureLifetime: value })}
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
                defaultValue={filters.benefitStartYear}
                onChange={({ value }) => onChangeFilter({ benefitStartYear: value })}
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
                defaultValue={filters.unitCost}
                onChange={({ value }) => onChangeFilter({ unitCost: value })}
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
                defaultValue={filters.annualDiscountRate}
                onChange={({ value }) => onChangeFilter({ annualDiscountRate: value })}
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
                defaultValue={filters.operationCost}
                onChange={({ value }) => onChangeFilter({ operationCost: value })}
              />
            </Field>
          </div>
        </section>
      </div>
    );
  }
}

export default AnalyzerInputs;
