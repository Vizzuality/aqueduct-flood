
export const getUniqueVocabulary = (filters = {}) => {
  const { year, flood, scenario, projection_model: model, sub_scenario: subScenario } = filters;
  const subsidience = subScenario ? 'wtsub' : 'nosub';

  if (flood === 'inunriver') return `${flood}_${year}_${scenario}_${model}_None_None`;

  const isPerc = ['5.0', '50.0'].includes(model);

  return `${flood}_${year}_${scenario}_${isPerc ? 'perc': 'None'}_${subsidience}_${model}`;
}

export default { getUniqueVocabulary};
