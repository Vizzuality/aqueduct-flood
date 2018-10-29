import { SCENARIOS_OPTIONS, EXISTING_PROTECTION_LEVEL_OPTIONS } from 'constants/analyzer';
import { SCENARIOS_OPTIONS as HAZARD_SCENARIO_OPTIONS } from 'constants/hazard';

export const getUniqueVocabulary = (filters = {}, right = false) => {
  const { year, scenario } = filters;

  const scenarioIndex = SCENARIOS_OPTIONS.findIndex(_scenario => _scenario.value === scenario);

  const scenarioToSend = HAZARD_SCENARIO_OPTIONS[scenarioIndex].value;
  const model = right ? '0000GFDL-ESM2M' : '000000000WATCH';

  return `inunriver_${year}_${scenarioToSend}_${model}_None_None`;
}

export const calculateClosestPeriodRange = (returnPeriod) =>
  EXISTING_PROTECTION_LEVEL_OPTIONS.reduce((prev, curr) =>
    (returnPeriod >= prev && returnPeriod <= curr) ? prev: curr);


export default {
  getUniqueVocabulary,
  calculateClosestPeriodRange
};
