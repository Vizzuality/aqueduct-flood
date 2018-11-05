
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

export default { getUniqueVocabulary};
