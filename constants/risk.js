
export const EXPOSURE_OPTIONS = [
  { label: 'Urban Damage', value: 'urban_damage_v2', default: true },
  { label: 'Affected Population', value: 'POPexp' },
  { label: 'Affected GDP', value: 'GDPexp' }
];

export const FLOOD_TYPE_OPTIONS = [
  { label: 'Coastal', value: 'coastal' },
  { label: 'Riverine', value: 'riverine', default: true }
]

export default {
  EXPOSURE_OPTIONS,
  FLOOD_TYPE_OPTIONS
};
