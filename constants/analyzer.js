export const FETCH_CBA_DATASET_ID = 'a29768ea-d6ba-425f-bb5a-e19aa275269c';

export const SCENARIOS_OPTIONS = [
  { label: 'Business as usual', value: 'business as usual' },
  { label: 'Optimistic', value: 'optimistic' },
  { label: 'Pessimistic', value: 'pessimistic' }
];

export const DESIGN_PROTECTION_LEVEL_YEAR_OPTIONS = [
  { label: '2030', value: 2030 },
  { label: '2050', value: 2050 },
  { label: '2080', value: 2080 }
]

export const EXISTING_PROTECTION_LEVEL_OPTIONS = [2, 5 ,10, 25, 50, 100, 250, 500, 1000];
export const EXISTING_PROTECTION_LEVEL_MARKS = {};

EXISTING_PROTECTION_LEVEL_OPTIONS.forEach((opt) => {
  EXISTING_PROTECTION_LEVEL_MARKS[opt] = opt;
});

export const IMPLEMENTATION_YEAR_OPTIONS = [2020, 2079]
export const INFRASTRUCTURE_LIFE_TIME_OPTIONS = [1, 100];
export const UNIT_COST_OPTIONS = [0.8, 1.1];
export const DISCOUNT_RATE_OPTIONS = [0, 100];
export const OPERATION_MAINTENANCE_COST_OPTIONS = [0, 100];

export default {
  FETCH_CBA_DATASET_ID,
  SCENARIOS_OPTIONS,
  DESIGN_PROTECTION_LEVEL_YEAR_OPTIONS,
  EXISTING_PROTECTION_LEVEL_OPTIONS,
  EXISTING_PROTECTION_LEVEL_MARKS,
  IMPLEMENTATION_YEAR_OPTIONS,
  INFRASTRUCTURE_LIFE_TIME_OPTIONS,
  UNIT_COST_OPTIONS,
  DISCOUNT_RATE_OPTIONS,
  OPERATION_MAINTENANCE_COST_OPTIONS
};
