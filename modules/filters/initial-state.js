export default {
  // common
  common:  {
    geogunit_unique_name: 'Japan',
    scenario: 'Business as usual'
  },
  // hazard
  hazard: {},
  // risk
  risk: {
    scenario: 'Business as usual',
    flood: 'Riverine',
    exposure: 'urban_damage_v2',
    sub_scenario: false,
    advanced_settings: false,
  },
  // cost-benefit analyzer
  cba: {
    existing_prot: null,
    prot_fut: null,
    ref_year: 2050,
    implementation_start: 2020,
    implementation_end: 2040,
    infrastructure_life: 80,
    benefits_start: 2025,
    user_urb_cost: null,
    discount_rate: 5,
    estimated_costs: null,
    om_costs: 1
  }
};

// export default {
//   // common
//   geogunit_unique_name: 'Japan',
//   scenario: 'Business as usual',
//   // risk
//   flood: 'Riverine',
//   exposure: 'urban_damage_v2',
//   sub_scenario: false,
//   advanced_settings: false,
//   // cost-benefit analyzer
//   existing_prot: null,
//   prot_fut: null,
//   ref_year: 2050,
//   implementation_start: 2020,
//   implementation_end: 2040,
//   infrastructure_life: 80,
//   benefits_start: 2025,
//   user_urb_cost: null,
//   discount_rate: 5,
//   estimated_costs: null,
//   om_costs: 1
// };
