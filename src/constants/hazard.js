export const FETCH_HAZARD_DATASET_ID = 'ae684dd2-14fb-4c8b-ba58-c3ed7b450ff8';

export const YEAR_OPTIONS = [
  { label: 'Baseline', value: '2010.0', selected: true },
  { label: '2030', value: '2030.0', selected: false },
  { label: '2050', value: '2050.0', selected: false },
  { label: '2080', value: '2080.0', selected: false }
];

export const FLOOD_TYPES_OPTIONS = [
  { label: 'Coastal', value: 'inuncoast', default: true },
  { label: 'Riverine', value: 'inunriver' }
];

export const RIVERINE_PROJECTION_MODEL_OPTIONS = [
  { label: 'GFDL-ESM2M', value: '0000GFDL-ESM2M', default: true },
  { label: 'HadGEM2_ES', value: '0000HadGEM2-ES' },
  { label: 'IPSL-CM5A-LR', value: '00IPSL-CM5A-LR' },
  { label: 'MIROC-ESM-CHEM', value: 'MIROC-ESM-CHEM' },
  { label: 'NorESM1-M', value: '00000NorESM1-M' }
];

export const COASTAL_PROJECTION_MODEL_OPTIONS = [
  { label: 'Sea level rise scenario (low)', value: '5.0' },
  { label: 'Sea level rise scenario (medium)', value: '50.0' },
  { label: 'Sea level rise scenario (high)', value: '95.0', default: true }
];

export default {
  FETCH_HAZARD_DATASET_ID,
  YEAR_OPTIONS,
  FLOOD_TYPES_OPTIONS,
  RIVERINE_PROJECTION_MODEL_OPTIONS,
  COASTAL_PROJECTION_MODEL_OPTIONS
};
