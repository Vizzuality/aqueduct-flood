export const WIDGETS = {
  risk: [
    {
      id: 'widget_risk_1',
      title: 'cumulative net benefits from {{implementation_start}} through {{implementation_end}}',
    },
    {
      id: 'widget_risk_2',
      title: 'annual Total Costs vs benefits from {{implementation_start}} through {{implementation_end}}',
    },
    {
      id: 'widget_risk_3',
      title: 'inundation Map in {{implementation_start}} width {{existing_prot}}-year protection',
    }
  ],
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
