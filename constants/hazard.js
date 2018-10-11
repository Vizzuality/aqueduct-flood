// export const FETCH_DATASET_ID = 'c53a195f-d5f0-4acc-b1be-b773420a6606';
export const FETCH_DATASET_ID = 'aba995e4-7171-4e5a-9356-05041e6b2d4a';

export const YEAR_OPTIONS = [
  { label: 'Baseline', value: 2010, selected: true },
  { label: '2030', value: 2030, selected: false },
  { label: '2050', value: 2050, selected: false },
  { label: '2080', value: 2080, selected: false }
];

export const FLOOD_TYPES_OPTIONS = [
  { label: 'Coastal', value: 'inuncoast', default: true },
  { label: 'Riverine', value: 'inunriver' },
];

export const SCENARIOS_OPTIONS = [
  { label: 'Business as usual', value: 'historical', default: true },
  { label: 'Optimistic', value: 'rcp4p5' },
  { label: 'Pessimistic', value: 'rcp8p5' }
];

export const RIVERINE_PROJECTION_MODEL_OPTIONS = [
  { label: 'GFDL-ESM2M', value: '0000GFDL-ESM2M', default: true },
  { label: 'HadGEM2_ES', value: '0000HadGEM2-ES' },
  { label: 'IPSL-CM5A-LR', value: '00IPSL-CM5A-LR' },
  { label: 'MIROC-ESM-CHEM', value: 'MIROC-ESM-CHEM' },
  { label: 'NorESM1-M', value: '00000NorESM1-M' }
];

export const COASTAL_PROJECTION_MODEL_OPTIONS = [
  { label: 'Sea level rise scenario (low)', value: 'None' },
  { label: 'Sea level rise scenario (medium)', value: '5.0' },
  { label: 'Sea level rise scenario (high)', value: '50.0', default: true }
];

export default {
  FETCH_DATASET_ID,
  YEAR_OPTIONS,
  FLOOD_TYPES_OPTIONS,
  SCENARIOS_OPTIONS,
  RIVERINE_PROJECTION_MODEL_OPTIONS,
  COASTAL_PROJECTION_MODEL_OPTIONS
};
