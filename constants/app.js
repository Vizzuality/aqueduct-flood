export const APP_TABS = [
  { label: 'Risk', value: 'risk', default: true },
  { label: 'Hazard', value: 'hazard' },
  { label: 'Cost-benefit Analyzer', value: 'cost-benefit-analyzer' }
];

export const APP_ENDPOINTS = {
  'cost-benefit-analyzer': 'cba',
  risk: 'risk',
  hazard: 'harzard'
}


export default {
  APP_TABS,
  APP_ENDPOINTS
};
