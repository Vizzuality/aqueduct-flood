export const FETCH_DATASET_ID = 'c53a195f-d5f0-4acc-b1be-b773420a6606';

export const YEAR_OPTIONS = [
  { label: 'Baseline', value: 2010, selected: true },
  { label: '2030', value: 2030, selected: false },
  { label: '2050', value: 2050, selected: false },
  { label: '2080', value: 2080, selected: false }
];

export const RIVERINE_PROJECTION_MODEL_OPTIONS = [
  { label: 'GFDL-ESM2M', value: 'gf', default: true },
  { label: 'HadGEM2_ES', value: 'ha' },
  { label: 'IPSL-CM5A-LR', value: 'ip' },
  { label: 'MIROC-ESM-CHEM', value: 'mi' },
  { label: 'NorESM1-M', value: 'nr' }
];

export const COASTAL_PROJECTION_MODEL_OPTIONS = [
  { label: 'Sea level rise scenario (low)', value: '05' },
  { label: 'Sea level rise scenario (medium)', value: '50' },
  { label: 'Sea level rise scenario (high)', value: '95', default: true }
];

export default {
  FETCH_DATASET_ID,
  YEAR_OPTIONS,
  RIVERINE_PROJECTION_MODEL_OPTIONS,
  COASTAL_PROJECTION_MODEL_OPTIONS
};
