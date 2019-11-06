const renderProjectionModelTable =
  `<div class="projection-model-table">
    <table>
      <thead>
        <tr>
          <td>
            Code
          </td>
          <td>
            Organization
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            GFDL-ESM2M
          </td>
          <td>
            Geophysical Fluid Dynamics Laboratory (NOAA)
          </td>
        </tr>
        <tr>
          <td>
            HadGEM2-es
          </td>
          <td>
            Met Office Hadley Centre
          </td>
        </tr>
        <tr>
          <td>
            IPSL-CM5A-LR
          </td>
          <td>
            Institut Pierre Simon Laplace
          </td>
        </tr>
        <tr>
          <td>
            MIROC-ESM-CHEM
          </td>
          <td>
            Atmosphere and Ocean Research Institute (The University of Tokyo), National
            Institute for Environmental Studies, and Japan Agency for Marine-Earth Science and Technology
          </td>
        </tr>
        <tr>
          <td>
            NorESM1-M
          </td>
          <td>
            Bjerknes Centre for Climate Research, Norwegian Meteorological Institute
          </td>
        </tr>
      </tbody>
    </table>
  </div>`;

export const MODAL_INFO_DEFINITIONS = {
  // hazard
  'year': {
    title: 'Year',
    instructions: '<p>Select a timeframe for the flood maps.</p>',
    description: `<p>"Baseline" represents current (2010) expected annual flood extent and depth.
      Future years of “2030”, “2050”, and “2080” represent projected expected annual flood extent and depth.
      For future years, also specify the Future Scenario and Project Model of interest.</p>`
  },
  'flood-type': {
    title: 'Flood Type',
    instructions: '<p>Select the type of flood hazard.</p>',
    description: `<p>The “Coastal” hazard represents flooding from storm surges and occurs along coastlines
      around the world. The “Riverine” hazard represents flooding from river overflow and occurs
      in river basins with an area of at least 10,000 km2.</p>`,
    source: `<p>See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming)
      to learn more about the types of hazards featured in this analysis.</p>`
  },
  'future-scenario': {
    title: 'Future Scenario',
    instructions: '<p>Select a climate scenario to project inundation in future years.</p>',
    description: `<p>The "Business as Usual/ Pessimistic" scenario (Representative Concentration Pathways 8.5)
      represents a world with steadily rising global carbon emissions. The "Optimistic" scenario (Representative Concentration Pathways 4.5)
      represents a world with carbon emissions peaking and declining by 2040.</p>`,
    source: `<p>See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about
      climate scenarios used in this analysis. The scenarios are based on the
      <a href="https://www.ipcc.ch/report/ar5/syr/" target="_blank" rel="noopener noreferrer">IPCC 5th assessment report</a>.</p>`
  },
  'projection-model': {
    title: 'Projection Model',
    instructions: '<p>Select a model to project inundation in future years. Each model is forced by the climate scenario chosen in Future Scenario.</p>',
    description: `<p>For “Coastal” floods, projection models refer to simulations of sea level change derived from the RISES-AM project.
      Three different probabilities for sea level change are available: 5%, 50% and 95%.</p>
      <p>For “Riverine” floods, projection models refer to five common general circulation models from the following organizations:</p>
      ${renderProjectionModelTable}`,
    source: `<p>See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about the projection
      models used in this analysis. For Coastal projection models , see the RISES-AM project
      <a href="dx.doi.org/10.1088/1748-9326/9/10/104008" target="_blank" rel="noopener noreferrer">(Jevrejeva et al., 2014)</a>.
      For Riverine projection models, see the
      <a href="https://www.ipcc.ch/report/ar5/syr/" target="_blank" rel="noopener noreferrer">IPCC 5th assessment report</a>.</p>`

  },
  'subsidience': {
    title: 'Subsidience',
    instructions: `<p>Check on “Subsidence” to project inundation depths in future years using both climate change and land
      subsidence scenarios. Check off “Subsidence” to project inundation depths in future years using only climate change scenarios.</p>`,
    description: '<p>Subsidence refers to the lowering of land levels. Groundwater extraction is a dominant cause of human-induced land subsidence in many coastal areas.</p>',
    source: '<p>See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about subsidence modeling.</p>'
  },
  'flood-magnitude': {
    title: 'Flood magnitude (return period in years)',
    instructions: '<p>Select the severity of the flooding hazard, expressed in return periods.</p>',
    description: '<p>Smaller flood occur more regularly than larger floods. For example, a 5-year flood (20% probability of occurrence) is less severe than a 50-year (2% probability of occurrence).</p>'
  },
  // risk
  'location': {
    title: 'Select a location',
    instructions: '<p>Type in or select from the drop-down menu the name of a country, state, river basin, or city</p>'
  },
  'risk-future-scenario': {
    title: 'Future Scenario',
    instructions: '<p>Select a socioeconomic and climate scenario to project flooding in future years.</p>',
    description: `<p>The "Business as Usual" scenario (Shared Socioeconomic Pathway (SSP) 2, Representative Concentration Pathways (RCP) 8.5)
      represents a world with stable economic development and steadily rising global carbon emissions. The "Optimistic" scenario (SSP 2, RCP 4.5)
      represents a world with stable economic development and carbon emissions peaking and declining by 2040. The "Pessimistic" scenario (SSP 3, RCP 8.5)
      represents a fragmented world with uneven economic development and steadily rising global carbon emissions.</p>`,
    source: `<p> See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about
    climate scenarios used in this analysis. The scenarios are based on the <a href="https://www.ipcc.ch/report/ar5/syr/" target="_blank" rel="noopener noreferrer">IPCC 5th assessment report.</a></p>`
  },
  'risk-indicator': {
    title: 'Risk Indicator',
    instructions: 'Select the type exposure used to calculate risk.',
    description: `For “Affected Population” and “Affected GDP”, exposure was measured using gridded maps of population count and GDP respectively.
      For urban damage, exposure was measured using a land use map showing which cells are built-up and not built-up.`,
    source: 'See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about the types of exposure to flood risk.'
  },
  'existing-protection-level': {
    title: 'Existing Protection Level (Return Period)',
    instructions: '<p>Select the level of flood protection as of 2010 to be used in the risk analysis.</p>',
    description: `<p>The “Existing Protection Level” reflects the level of flood protection provided by dikes in each location,
      expressed as a return period. For example, if the flood protection level in a given state is for a return period of 100 years,
      this means that floods up to that return period would not lead to impacts. The default level of flood protection for 2010 comes
      from the FLOPROS model. Users may select any protection level from 2 to 1,000.</p>`,
    source: '<p>See <i>A methodology to estimate global riverine and coastal flood risks</i> (forthcoming) to learn more about modeling flood protection standards.</p>'
  },
  'advanced-settings-notification': {
    description: `<p>In the Advanced Setting, users can customize the Risk Analysis by altering the level of flood protection.
      Due to the complexity of the calculation, the Advanced analysis runs at a coarser scale than the default analysis. Therefore,
      <strong>Advanced results may look different than default results.</strong></p>`
  },
  // CBA
  'design-protection-standards': {
    title: 'Design Protection Standards',
    instructions: '<p>Set the existing (current) and design (target) levels of protection for the analysis.</p>',
    description: `<p>Users must also define the year in which the design level of protection should be valid. For example, selecting a
      design protection level of 100 with a target year of 2050 means that floods up the 100-year return period would not lead to impacts
      in the year 2050.</p><p>The "Existing Protection Level" will be used to calculate the baseline flood damage (expected annual damage
      if no improvements to flood protection are made). Flood damage will then be recalculated using the "Design Protection Level".
      The analysis calculates difference between the baseline and design scenarios. Benefits represent the avoided damage to urban assets,
      population, and GDP provided by the design infrastructure.</p>`
  },
  'timeframes': {
    title: 'Timeframes',
    instructions: '<p>Set the time bounds of the analysis.</p>',
    description: `<p>The "Implementation Range" represents the years in which the design infrastructure will be constructed.
      The "Infrastructure Lifetime" represents how long the infrastructure will be functional (and thus provide benefits).
      The "Benefit Start year" represents the year when benefits will start to accrue. Only a fraction of the benefits can
      be accrued during construction-- full benefits will be accumulated once the construction is complete.</p>`
  },
  'costs': {
    title: 'Costs',
    instructions: '<p>Set the financial parameters for the analysis.</p>',
    description: `<p>The "Unit Costs" represents the rate (in $US) to construct dike infrastructure per meter (depth)
      per kilometer (length). A default rate that incorporates a country's purchasing power parity (PPP) is provided.
      The "Annual Discount Rate" represents rate in which present value will change through time. The "Operation & Maintenance Cost"
      represents the fraction of the total construction cost to be used to estimate the operation and maintenance expenses annually.</p>`
  },
  'cumulative-benefits': {
    title: 'Cumulative Benefits',
    description: `<p>This figure displays the cumulative net benefits of the designed project. The cumulative net benefit is calculated by
      summing the avoided damage to urban assets each year and subtracting out the cost to build, operate, and maintain the design infrastructure.
      When the bar plot rises above the X-axis, the project has profited.</p>`
  },
  'annual-total-costs-benefits': {
    title: 'Annual Total Costs vs. Benefits',
    description: `<p>This figure compares the annual cost  of the design infrastructure to the annual benefits (Y-axis) for every year in
      the “Infrastructure Life Time” of the project (X-axis). Costs include both construction costs and operation and maintenance.
      Benefits represent the accrual of avoided damage to urban assets.</p>`
  },
  'cba-notification': {
    description: `<p>The Cost-Benefit Analysis assesses the feasibility of improving dike infrastructure in a given country, state, or
      river basin. The analysis is highly customizable, so please allow time for extra time as the calculations run in the background.</p>`
  }
}

export default { MODAL_INFO_DEFINITIONS };
