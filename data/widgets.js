const RISK_WIDGETS = [
  {
    id: 'table',
    title: 'cumulative net benefits from {{implementation_start}} through {{implementation_end}}',
  },
  {
    id: 'annual_flood',
    title: 'Annual expected urban damage',
  },
  {
    id: 'flood_drivers',
    title: 'Annual damage and impact drivers',
  }
];

const ADVANCED_RISK_WIDGETS = [
  {
    id: 'benchmark',
    title: 'cumulative net benefits from {{implementation_start}} through {{implementation_end}}',
  },
  {
    id: 'lp_curve',
    title: 'annual Total Costs vs benefits from {{implementation_start}} through {{implementation_end}}',
  }
];

export const WIDGETS = {
  risk: RISK_WIDGETS,
  advanced_risk: [...RISK_WIDGETS, ...ADVANCED_RISK_WIDGETS ],
  hazard: [],
  'cba': [
    {
      id: 'net_benefits',
      title: 'cumulative net benefits from {{implementation_start}} through {{implementation_end}}',
    },
    {
      id: 'annual_costs',
      title: 'annual Total Costs vs benefits from {{implementation_start}} through {{implementation_end}}',
    },
    {
      id: 'sample_map',
      title: 'inundation Map in {{implementation_start}} width {{existing_prot}}-year protection',
    },
    {
      id: 'table',
      title: 'river flood urban damage in {{geogunit_unique_name}}',
    },
    {
      id: 'impl_cost',
      title: 'annual Total Costs vs benefits from {{implementation_start}} to {{implementation_end}}',
    },
    {
      id: 'mainteinance',
      title: 'year-by-year operation & maintenance costs from {{implementation_start}} through {{implementation_end}}',
    },
    {
      id: 'flood_prot',
      title: 'year-by-year average flood protection levels from {{implementation_start}} through {{implementation_end}}',
    }
  ]
};

export default { WIDGETS };
