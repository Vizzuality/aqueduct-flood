
export const EXPOSURE_OPTIONS = [
  { label: 'Urban Damage', value: 'urban_damage_v2', default: true },
  { label: 'Affected Population', value: 'popexp' },
  { label: 'Affected GDP', value: 'gdpexp' }
];

export const FLOOD_TYPE_OPTIONS = [
  { label: 'Coastal', value: 'coastal' },
  { label: 'Riverine', value: 'riverine', default: true }
]

export const WIDGET_TITLES = {
  urban_damage_v2: 'Urban Damage (US $)',
  popexp: 'Affected Population (number of people)',
  gdpexp: 'Affected GDP (US $)'
};
export const getWidgetTitle = (filters) => {
  const { exposure } = filters;

  const option = EXPOSURE_OPTIONS.find(_opt => _opt.value === exposure);

  return option.label;
}

export const WIDGET_TITLE_GENERATOR = (type, filters = {}) => {
  const { exposure } = filters;
  const currentTitle = WIDGET_TITLES[exposure];

  switch(type) {
    case 'annual_flood':
      return {
        legend: [`Anual Expected ${currentTitle}`, `% Annual Expected ${currentTitle}`],
        yAxisTitle: currentTitle,
      };
    case 'flood_drivers':
      return { yAxisTitle: currentTitle };
    case 'benchmark':
      return { chartTitleTop: currentTitle };
    case 'lp_curve':
      return {
        // chartTitleBottom: currentTitle,
        yAxisTitle: currentTitle
      };
    default:
      return {};
  }
}

export default {
  EXPOSURE_OPTIONS,
  FLOOD_TYPE_OPTIONS,
  WIDGET_TITLE_GENERATOR,
  getWidgetTitle
};
