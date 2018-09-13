import { createSelector } from 'reselect';


const locations = state => state.locations.list;
const locationsCompare = state => state.locations.listCompare;

const parser = (_locations) =>
[
  {
    label: 'Basins',
    options: _locations.basins || []
  },
   {
    label: 'Countries',
    options: (_locations.countries || []).map(_country => ({
      label: _country.name,
      value: _country.uniquename
    }))
  },
  {
    label: 'States',
    options: (_locations.states || []).map(_states => ({
      label: _states.name,
      value: _states.uniquename
    }))
  },
   {
    label: 'Cities',
    options: _locations.cities || []
  }
];

export const parseLocations = createSelector([locations], parser);
export const parseCompareLocations = createSelector([locationsCompare], parser);

export default {
  parseLocations,
  parseCompareLocations
};
