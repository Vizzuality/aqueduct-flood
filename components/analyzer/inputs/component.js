import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Button,
  Field,
  CustomSelect,
  Range,
  Slider,
  Spinner
} from 'aqueduct-components';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

// components
import SectionHeader from 'components/ui/section-header';

// constants
import {
  DESIGN_PROTECTION_LEVEL_YEAR_OPTIONS,
  EXISTING_PROTECTION_LEVEL_OPTIONS,
  IMPLEMENTATION_YEAR_OPTIONS,
  INFRASTRUCTURE_LIFE_TIME_OPTIONS,
  UNIT_COST_OPTIONS,
  DISCOUNT_RATE_OPTIONS,
  OPERATION_MAINTENANCE_COST_OPTIONS
} from 'constants/analyzer';

// utils
import { generateModalOptions } from 'utils/modal';

// styles
import './styles.scss';

class AnalyzerInputs extends PureComponent {
  static propTypes = {
    filters: PropTypes.shape({
      existing_prot: PropTypes.number,
      prot_fut: PropTypes.number,
      ref_year: PropTypes.number.isRequired,
      implementation_start: PropTypes.number.isRequired,
      implementation_end: PropTypes.number.isRequired,
      infrastructure_life: PropTypes.number.isRequired,
      benefits_start: PropTypes.number.isRequired,
      user_urb_cost: PropTypes.number,
      discount_rate: PropTypes.number.isRequired,
      om_costs: PropTypes.number.isRequired
    }).isRequired,
    inputState: PropTypes.shape({ loading: PropTypes.bool.isRequired }).isRequired,
    isCompare: PropTypes.bool,
    onChangeFilter: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired,
    getCountryDefaults: PropTypes.func.isRequired,
    setInput: PropTypes.func.isRequired,
    setExistingProt: PropTypes.func.isRequired,
    setProtFut: PropTypes.func.isRequired,
    setExistingProtCompare: PropTypes.func.isRequired,
    setProtFutCompare: PropTypes.func.isRequired
  };

  static defaultProps = { isCompare: false }

  constructor(props) {
    super(props);

    const { filters } = props;
    const {
      existing_prot: existingProt,
      estimated_costs: estimatedCosts
    } = filters;
    const indexExistingProtection = EXISTING_PROTECTION_LEVEL_OPTIONS.findIndex(opt => opt === existingProt);
    const nextIndex = indexExistingProtection + 1 >= EXISTING_PROTECTION_LEVEL_OPTIONS.length ?
      indexExistingProtection : indexExistingProtection + 1;

    this.designProtectionOptions = EXISTING_PROTECTION_LEVEL_OPTIONS.slice(nextIndex);
    this.designProtectionMarks = {}
    this.designProtectionOptions.forEach(opt => { this.designProtectionMarks[opt] = opt; });

    this.state = {
      existingProtValue: existingProt,
      estimatedCosts
    };
  }

  componentWillMount() {
    const { filters, getCountryDefaults, onChangeFilter, setInput } = this.props;
    const { geogunit_unique_name: location, existing_prot: existingProt } = filters;

    if (location && !existingProt) {
      setInput({ loading: true });

      getCountryDefaults({ location })
        .then((defaults) => {
          setInput({ loading: false });
          onChangeFilter({
            estimated_costs: defaults.estimated_costs,
            existing_prot: defaults.existing_prot,
            prot_fut: defaults.prot_fut,
            original_existing_prot: defaults.existing_prot,
            original_prot_fut: defaults.prot_fut,
            original_estimated_costs: defaults.estimated_costs
          });
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      existing_prot: nextExistingProt,
      prot_fut: nextProtFut,
      estimated_costs: nextEstimatedCosts
    } = nextProps.filters;
    const { filters } = this.props;
    const { existing_prot: existingProt, prot_fut: protFut } = filters;
    const existingProtChanged = !isEqual(existingProt, nextExistingProt);
    const protFutChanged = !isEqual(protFut, nextProtFut);

    if (existingProtChanged) {
      const indexExistingProtection = EXISTING_PROTECTION_LEVEL_OPTIONS.findIndex(opt => opt === nextExistingProt);
      const nextIndex = indexExistingProtection + 1 >= EXISTING_PROTECTION_LEVEL_OPTIONS.length ?
        indexExistingProtection : indexExistingProtection + 1;

      this.designProtectionOptions = EXISTING_PROTECTION_LEVEL_OPTIONS.slice(nextIndex);
      this.designProtectionMarks = {};
      this.designProtectionOptions.forEach(opt => { this.designProtectionMarks[opt] = opt; });

      this.setState({
        existingProtValue: nextExistingProt,
        protFut: AnalyzerInputs.getProtFutValue(nextExistingProt),
        estimatedCosts: nextEstimatedCosts
      });
    }

    if (protFutChanged && !existingProtChanged) {
      this.setState({ protFut: nextProtFut });
    }
  }

  onChangeExistingProtectionLevel = debounce((value) => {
    const {
      onChangeFilter,
      setExistingProt,
      setProtFut,
      isCompare,
      setExistingProtCompare,
      setProtFutCompare
    } = this.props;
    const protFutValue = AnalyzerInputs.getProtFutValue(value);

    if (isCompare) {
      setExistingProtCompare(value);
      setProtFutCompare(protFutValue);
    } else {
      setExistingProt(value);
      setProtFut(protFutValue);
    }

    onChangeFilter({
      existing_prot: value,
      prot_fut: protFutValue
    });
  }, 300);

  onChangeDesignProtectionLevel = debounce((value) => {
    const {
      onChangeFilter,
      isCompare,
      setProtFutCompare,
      setProtFut
    } = this.props;

    if (isCompare) {
      setProtFutCompare(value);
    } else {
      setProtFut(value);
    }

    onChangeFilter({ prot_fut: value });
    setProtFut(value);
  }, 300)

  static getProtFutValue = (existingProt) => {
    let result = 0;
    let found = false;

    EXISTING_PROTECTION_LEVEL_OPTIONS.forEach((value, index) => {
      const nextLevel = EXISTING_PROTECTION_LEVEL_OPTIONS[index + 1] ?
        EXISTING_PROTECTION_LEVEL_OPTIONS[index + 1] : EXISTING_PROTECTION_LEVEL_OPTIONS[index]

      if ((existingProt >= value && existingProt <= nextLevel) && !found) {
        result = nextLevel
        found = true;
      }
    })

    return result;
  }

  render() {
    const { filters, inputState, onChangeFilter, setModal } = this.props;
    const { loading } = inputState;
    const { existingProtValue, protFut, estimatedCosts } = this.state;

    return (
      <div className="c-analyzer-inputs">
        {loading && <Spinner />}
        <SectionHeader title="input table" />
        <section>
          <div className="category">
            <span className="category-name">
              Design Protection Standards
            </span>
            <Button
              onClick={() => setModal(generateModalOptions('info', 'design-protection-standards'))}
            >
              <Icon
                name="question"
                theme="dark"
                className="-round"
              />
            </Button>
          </div>
          <div className="selectors-container">
            {/* existing protection level */}
            <Field
              name="existing-protection-level"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-higher-margin-top -bolder"
              onClick={() => setModal(generateModalOptions('info', 'design-protection-standards'))}
            >
              <Slider
                min={EXISTING_PROTECTION_LEVEL_OPTIONS[0]}
                max={EXISTING_PROTECTION_LEVEL_OPTIONS[EXISTING_PROTECTION_LEVEL_OPTIONS.length - 1]}
                theme="dark"
                value={existingProtValue}
                onChange={(value) => this.setState({ existingProtValue: value })}
                defaultValue={existingProtValue}
                onAfterChange={this.onChangeExistingProtectionLevel}
              />
            </Field>

            <Field
              name="design-protection-level"
              theme="dark"
              label="Design Protection Level (Return Period)"
              className="-higher-margin-top -bolder"
            >
              <Slider
                min={this.designProtectionOptions[0]}
                max={this.designProtectionOptions[this.designProtectionOptions.length - 1]}
                disabled={this.designProtectionOptions.length <= 1}
                theme="dark"
                step={null}
                marks={this.designProtectionMarks}
                value={protFut}
                onChange={(value) => this.setState({ protFut: value })}
                defaultValue={AnalyzerInputs.getProtFutValue(existingProtValue)}
                onAfterChange={this.onChangeDesignProtectionLevel}
              />
            </Field>

            <Field
              name="target-year-design-protection-level"
              theme="dark"
              label="Target Year for the Design Protection Level"
              className="-inline -bolder"
            >
              <CustomSelect
                instanceId="year"
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
              onClick={() => setModal(generateModalOptions('info', 'timeframes'))}
            >
              <Icon name="question" theme="dark" className="-round" />
            </Button>
          </div>
          <div className="selectors-container">
            <Field
              name="implementation-year"
              theme="dark"
              label="Implementation Range"
              className="-higher-margin-top -bolder"
            >
              <Range
                min={IMPLEMENTATION_YEAR_OPTIONS[0]}
                max={IMPLEMENTATION_YEAR_OPTIONS[1]}
                theme="dark"
                defaultValue={[filters.implementation_start, filters.implementation_end]}
                onAfterChange={value => {
                  onChangeFilter({
                    implementation_start: value[0],
                    implementation_end: value[1],
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
              className="-higher-margin-top -bolder"
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
              className="-higher-margin-top -bolder"
            >
              <Slider
                min={filters.implementation_start}
                max={filters.implementation_end}
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
              onClick={() => setModal(generateModalOptions('info', 'costs'))}
            >
              <Icon name="question" theme="dark" className="-round" />
            </Button>
          </div>
          <div className="selectors-container">
            <Field
              name="user-urb-cost"
              theme="dark"
              label="Unit Cost ($million/meter/kilometer)"
              className="-higher-margin-top -bolder"
            >
              <Slider
                min={UNIT_COST_OPTIONS[0]}
                max={UNIT_COST_OPTIONS[1]}
                step={0.01}
                theme="dark"
                value={estimatedCosts}
                defaultValue={estimatedCosts}
                onChange={(value) => this.setState({ estimatedCosts: value })}
                onAfterChange={value => { onChangeFilter({ estimated_costs: value }) }}
              />
            </Field>
            <Field
              name="discount-rate"
              theme="dark"
              label="Annual Discount Rate (%)"
              className="-higher-margin-top -bolder"
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
              className="-higher-margin-top -bolder"
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
