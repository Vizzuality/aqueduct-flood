
export const EXPOSURE_OPTIONS = [
  { label: 'Urban Damage', value: 'urban_damage_v2', default: true },
  { label: 'Affected Population', value: 'popexp' },
  { label: 'Affected GDP', value: 'gdpexp' }
];

export const FLOOD_TYPE_OPTIONS = [
  { label: 'Coastal', value: 'coastal' },
  { label: 'Riverine', value: 'riverine', default: true }
]

export default {
  EXPOSURE_OPTIONS,
  FLOOD_TYPE_OPTIONS
};
