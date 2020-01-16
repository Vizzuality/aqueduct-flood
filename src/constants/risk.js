
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
  const { 
    exposure,
    flood,
    geogunit_unique_name
  } = filters;
  const currentTitle = WIDGET_TITLES[exposure];
  const riskIndicator = getWidgetTitle(filters);

  switch(type) {
    case 'annual_flood':
      return {
        legend: [`Annual Expected ${riskIndicator}`, `% Annual Expected ${riskIndicator}`],
        yAxisTitle: `Annual Expected ${riskIndicator}`,
        yAxisTitleRight: `% Annual Expected ${riskIndicator}`,
      };
    case 'flood_drivers':
      return { 
        yAxisTitle: currentTitle,
        chartTitleBottom: `Projected Change in ${flood} Flood Annual Expected ${riskIndicator} and Drivers in ${geogunit_unique_name}`
      };
    case 'benchmark':
      return { chartTitleTop: `Annual Expected ${riskIndicator}` };
    case 'lp_curve':
      return {
        // chartTitleBottom: currentTitle,
        yAxisTitle: riskIndicator
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
