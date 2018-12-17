export const WIDGETS = {
  risk: [
    {
      id: 'table',
      title: 'flood damage'
    },
    {
      id: 'annual_flood',
      title: 'Annual expected {{widget_title}}',
      description: 'Annual flood description',
      sources: [
        { title: 'source 1', url: 'http://source1.com/'},
        { title: 'source 2', url: 'http://source2.com/'}
      ]
    },
    {
      id: 'benchmark',
      title: 'Benchmarking flood damage against others'
    }
  ],
  advanced_risk: [
    {
      id: 'flood_drivers',
      title: 'Annual damage and impact drivers'
    },
    {
      id: 'lp_curve',
      title: 'probability of flood damage to urban in {{geogunit_unique_name}}, {{existing_prot}}'
    }
  ],
  hazard: [],
  'cba': [
    {
      id: 'net_benefits',
      title: 'cumulative net benefits from {{implementation_start}} through {{end}}',
    },
    {
      id: 'annual_costs',
      title: 'annual Total Costs vs benefits from {{implementation_start}} through {{end}}',
    },
    {
      id: 'inundation_map',
      type: 'side-map',
      title: 'Inundation probability maps: current scenario vs. future scenario',
    },
    {
      id: 'table',
      title: 'summary of benefits from design infrastructure',
    },
    {
      id: 'impl_cost',
      title: 'year-by-year implementation costs from {{implementation_start}} to {{end}}',
    },
    {
      id: 'mainteinance',
      title: 'year-by-year operation & maintenance costs from {{implementation_start}} through {{end}}',
    },
    {
      id: 'flood_prot',
      title: 'year-by-year average flood protection levels from {{implementation_start}} through {{end}}',
    }
  ]
};

export default { WIDGETS };
