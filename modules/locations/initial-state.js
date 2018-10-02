import countries from 'data/countries';
import basins from 'data/basins';
import cities from 'data/cities';

const list = {
  countries: countries.map(_country => ({ name: _country.name, uniquename: _country.uniquename })),
  basins: basins.map(_basin => ({ label: _basin.label, value: _basin.value })),
  cities
};

export default {
  list,
  listCompare: list
};


// export default {
//   list: {
//     countries: [{ name: 'Japan', uniquename: 'Japan'}],
//   },
//   listCompare: {}
// };
