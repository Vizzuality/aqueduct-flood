
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

// Translates filter options into regex expressions that match API layer names
export const getNameFromFilters = (filters = {}) => {
  const { year, flood, scenario, projection_model: model, sub_scenario: subScenario } = filters;
  const subsidience = subScenario ? 'wtsub' : 'nosub';

  const _scenario = year === '2010.0' ? 'historical' : scenario;

  // We want to query for all RPs so that the user can select the RP via the map legend.
  const return_period = '.*';

  if (flood === 'inunriver') {
    const _model = year === '2010.0' ? '000000000WATCH' : model;

    // Baseline year layers are labeled as 1980 in the API.
    // We receive other years with a decimal point, but in the API they are an int.
    const _year = year === '2010.0' ? '1980' : Math.round(+year);

    return `${flood}_${_scenario}_${_model}_${_year}_${return_period}`;
  } else if (flood === 'inuncoast') {
    const projection_model_translations = {
      "95.0": "0",
      "5.0": "0_perc_05",
      "50.0": "0_perc_50",
    }
    const _model = projection_model_translations[model]

    // Baseline year layers are labeled as "hist" in the API.
    // We receive other years with a decimal point, but in the API they are an int.
    const _year = year === '2010.0' ? 'hist' : Math.round(+year);

    return `${flood}_${_scenario}_${subsidience}_${_year}_${return_period}_${_model}$`;
  }

  return `${flood}_${_scenario}_${year}_perc_${subsidience}_${model}`;
}

export default { getUniqueVocabulary, getNameFromFilters };
