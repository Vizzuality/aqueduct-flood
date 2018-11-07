import { createSelector } from 'reselect';


const locations = state => state.locations.list;
const locationsCompare = state => state.locations.listCompare;

const locationId = state => state.filters.common.geogunit_unique_name;
const locationIdCompare = state => state.filtersCompare.common.geogunit_unique_name;

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


export const getLocationData = createSelector(
  [locations, locationId],
  (_locations = {}, _locationId) => {
    const allLocations = [
      ...(_locations.countries || []),
      ...(_locations.states || []),
      ...(_locations.cities || []),
      ...(_locations.basins || [])].map(_l => ({
        uniquename: _l.uniquename || _l.value,
        bbox: _l.bbox
      }));

    return allLocations.find(_location => _location.uniquename === _locationId);
  }

);

export const getLocationDataCompare = createSelector(
  [locations, locationIdCompare],
  (_locations, _locationId) => {
    const allLocations = [
      ...(_locations.countries || []),
      ...(_locations.states || []),
      ...(_locations.cities || []),
      ...(_locations.basins || [])].map(_l => ({
        uniquename: _l.uniquename || _l.value,
        bbox: _l.bbox
      }));

    return allLocations.find(_location => _location.uniquename === _locationId)
  }

);

export default {
  parseLocations,
  parseCompareLocations,
  getLocationData,
  getLocationDataCompare
};
