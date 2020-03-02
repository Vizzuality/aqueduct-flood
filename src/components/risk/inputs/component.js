import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Spinner } from 'aqueduct-components';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

// components
import SliderInput from 'components/ui/slider-input';

// constants
import { EXISTING_PROTECTION_LEVEL_OPTIONS } from 'constants/analyzer';

// styles
import './styles.scss';

class RiskInputs extends PureComponent {
  static generateModalOptions = (type, key) => ({
    visible: true,
    options: { type, key }
  });

  static propTypes = {
    filters: PropTypes.shape({ existing_prot: PropTypes.number }).isRequired,
    inputState: PropTypes.shape({ loading: PropTypes.bool.isRequired }).isRequired,
    onChangeFilter: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { filters } = props;
    const { existing_prot: existingProt } = filters;

    this.state = { existingProtValue: existingProt };
  }

  componentWillReceiveProps(nextProps) {
    const { existing_prot: nextExistingProt } = nextProps.filters;
    const { filters } = this.props;
    const { existing_prot: existingProt } = filters;
    const existingProtChanged = !isEqual(existingProt, nextExistingProt);

    if (existingProtChanged) this.setState({ existingProtValue: nextExistingProt });
  }

  onChangeExistingProtectionLevel = debounce((value) => {
    const { onChangeFilter } = this.props;

    onChangeFilter({ existing_prot: value });
  }, 300);

  render() {
    const { inputState, setModal } = this.props;
    const { loading } = inputState;
    const { existingProtValue } = this.state;

    return (
      <div className="c-analyzer-inputs">
        {loading && <Spinner className="-transparent" />}
        <section>
          <div className="selectors-container">
            {/* existing protection level */}
            <Field
              name="existing-protection-level"
              theme="dark"
              label="Existing Protection Level (Return Period)"
              className="-higher-margin-top -bolder"
              onMoreInfo={() => setModal(RiskInputs.generateModalOptions('info', 'existing-protection-level'))}
            >
              <SliderInput
                name="existing-protection-level"
                value={existingProtValue}
                min={EXISTING_PROTECTION_LEVEL_OPTIONS[0]}
                max={EXISTING_PROTECTION_LEVEL_OPTIONS[EXISTING_PROTECTION_LEVEL_OPTIONS.length - 1]}
                onChange={(value) => this.setState({ existingProtValue: value })}
                onAfterChange={this.onChangeExistingProtectionLevel}
              />
            </Field>
          </div>
        </section>
      </div>
    );
  }
}

export default RiskInputs;
