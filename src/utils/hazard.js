
export const getUniqueVocabulary = (filters = {}) => {
  const { year, flood, scenario, projection_model: model, sub_scenario: subScenario } = filters;
  const subsidience = subScenario ? 'wtsub' : 'nosub';

  const _scenario = year === '2010.0' ? 'historical' : scenario;

  if (flood === 'inunriver') {

    const _model = year === '2010.0' ? '000000000WATCH' : model;

    return `hazards_${flood}_${year}_${_scenario}_${_model}_None_None`;
  }

  return `hazards_${flood}_${year}_${_scenario}_perc_${subsidience}_${model}`;
}

export const getNameFromFilters = (filters = {}) => {
  const { year, flood, scenario, projection_model: model, sub_scenario: subScenario } = filters;
  const subsidience = subScenario ? 'wtsub' : 'nosub';

  const _scenario = year === '2010.0' ? 'historical' : scenario;

  if (flood === 'inunriver') {

    const _model = year === '2010.0' ? '000000000WATCH' : model;

    // TODO: this isn't working. How do we get the right layer name to match "2010",
    // i.e. the baseline year?
    const _year = year === '2010.0' ? 'hist' : Math.round(+year);

    // This returns something like inunriver_historical_000000000WATCH_2010
    // which matches inunriver_historical_000000000WATCH_2010_rp00050
    // or inunriver_historical_000000000WATCH_2010_rp00020
    // or any other RP (return period).
    // We want to query for all RPs so that the user can selct the RP via the map legend.
    return `${flood}_${_scenario}_${_model}_${_year}`;
  }

  return `${flood}_${_scenario}_${year}_perc_${subsidience}_${model}`;
}

export default { getUniqueVocabulary, getNameFromFilters };
