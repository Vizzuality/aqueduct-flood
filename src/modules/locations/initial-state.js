import countries from 'data/countries';
import basins from 'data/basins';
import cities from 'data/cities';

export const list = {
  countries: countries.map(_country => ({
    name: _country.name,
    uniquename: _country.uniquename,
    bbox: _country.bbox
  })),
  basins: basins.map(_basin => ({ label: _basin.label, value: _basin.value })),
  cities
};

export default {
  list,
  listCompare: list,
  loaders: {
    defaults: false,
    compareDefaults: false
  }
};
