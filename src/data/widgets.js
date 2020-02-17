export const WIDGETS = {
  risk: [
    {
      id: 'table',
      title: '{{flood}} flood damage in {{geogunit_unique_name}}',
      description:  `<p>This table displays a summary of flood damage for each year of the analysis (2010, 2030, 2050, and 2080).
        The expected annual damage is listed (first row) and compared to the total asset value (second row) in order to estimate the
        relative amount of damage (third row). The level of flood protection through time is also displayed (fourth row) to reflect
        how changes in climate impact the amount of protection provided by flood infrastructure.</p>`
    },
    {
      id: 'annual_flood',
      title: '{{flood}} Flood {{widget_title}} in {{geogunit_unique_name}}',
      description: `<p>This figure displays the expected annual damage to be incurred (primary Y-axis) for each year of the analysis
        (X-axis). The relative amount of damage is also displayed (secondary Y-axis). Uncertainty bars for both the annual damage
        and relative damage can be accessed by checking on the "Error Bars" box. Error bars are bound by the minimum and maximum
        damage estimates.</p>`
    },
    {
      id: 'benchmark',
      title: 'Benchmarking flood damage against others',
      description:  `<p>This figure compares flood damage from the selected location (blue dot) to all other
        locations in the same class (countries, states, cities, or river basins). The level of flood protection is
        plotted on the Y-axis, and the magnitude of damage is plotted on the X-axis. Users can toggle between the
        expected annual damage (Total) or relative expected damage (Percentage).</p>`
    }
  ],
  advanced_risk: [
    {
      id: 'flood_drivers',
      title: 'Projected Change in {{flood}} Flood Annual Expected {{widget_title}} and Drivers in {{geogunit_unique_name}}',
      description: `<p>This figure illustrates the drivers of flood damage in the future compared to baseline (2010)
        flood damage. Annual expected damage (Y-axis) is displayed for each year of the analysis (2010, 2030, 2050, and 2080).
        For Riverine floods, climate and socio-economic conditions drive change in damage. For Coastal floods, climate,
        socio-economic, and/or land subsidence drive change in damage. Drivers that appear below the X-axis indicate
        a reduction in flood damage; drivers that appear above the X-axis indicate an intensification of flood damage.</p>`
    },
    {
      id: 'lp_curve',
      title: 'Loss-Probability Curves in {{flood}} Flood in {{geogunit_unique_name}}',
      description: `<p>This figure shows the Loss-Probability Curves for the five general circulation models, as well as their average.
        The magnitude of damage is listed on the Y-axis and the probability of occurrence on the X-Axis. Users can toggle between the years
        of the analysis (2030, 2050, and 2080).</p>`
    }
  ],
  hazard: [],
  'cba': [
    {
      id: 'net_benefits',
      title: 'cumulative net benefits from {{implementation_start}} through {{end}}',
      description: `This figure displays the cumulative net benefits of the designed project. The cumulative net benefit
        is calculated by summing the avoided damage to urban assets each year and subtracting out the cost to build, operate,
        and maintain the design infrastructure. When the bar plot rises above the X-axis, the project has profited.`
    },
    {
      id: 'annual_costs',
      title: 'annual Total Costs vs benefits from {{implementation_start}} through {{end}}',
      description: `This figure compares the annual cost  of the design infrastructure to the annual
        benefits (Y-axis) for every year in the “Infrastructure Life Time” of the project (X-axis).
        Costs include both construction costs and operation and maintenance. Benefits represent
        the accrual of avoided damage to urban assets.`
    },
    {
      id: 'inundation_map',
      type: 'side-map',
      title: 'Inundation probability maps: current scenario vs. future scenario',
      description: `<p>These maps show the probability of flooding event in 2010 given the current level of flood protection (left)
        compared to the probability of flooding extent in future using the design flood protection (right).</p>`
    },
    {
      id: 'table',
      title: 'summary of benefits from design infrastructure',
      description: `<p>This table summarizes the benefits of the design infrastructure. The design infrastructure provides benefits
        if the amount of damage incurred is less than it would have been without flood protection improvements. Benefits listed in
        this table are calculated by accruing the avoided damage to the population, GDP and urban assets throughout
        the “Infrastructure Life Time”.</p><p>To calculate the Cost-Benefit Ratio, the total cost of the design infrastructure is
        divided by the total avoided damage to urban assets. Ratios greater than 1 signal that the costs outpace the benefits; ratios
        less than 1 indicate that the benefits of the infrastructure exceed its costs.</p>`
    },
    {
      id: 'impl_cost',
      title: 'year-by-year implementation costs from {{implementation_start}} through {{end}}',
      description: `<p>This figure displays the annual costs (Y-Axis) of the design infrastructure incurred during the construction
        years (X-Axis), defined by the “Implementation Range”. Note: This figure does not include the discount rate.</p>`
    },
    {
      id: 'mainteinance',
      title: 'year-by-year operation & maintenance costs from {{implementation_start}} through {{end}}',
      description: `<p>This figure displays the annual costs (Y-Axis) for operating and maintaining (O&M) the design
        infrastructure over the lifespan of the project (X-Axis), defined by the “Infrastructure Life Time”. O&M costs during
        the construction years equal to the “Operation & Maintenance Cost (%)” rate times the annual cost of implementation.
        Once construction is completed, the remaining annual O&M costs equal the O&M costs from the last year of construction.</p>`
    },
    {
      id: 'flood_prot',
      title: 'year-by-year average flood protection levels from {{implementation_start}} through {{end}}',
      description: `<p>This figure displays the level of flood protection through time. The line begins with the existing level of
        protection up until the first "build" year, after which the line becomes dotted. Once construction is complete, the solid line
        returns. The slope of the solid lines reflects the influence of climate change on flood protection (both the magnitude and the direction).</p>`
    }
  ]
};

export default { WIDGETS };
