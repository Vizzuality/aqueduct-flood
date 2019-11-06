const locationData = require('data/countries.json');
const citiesData = require('data/cities.json');
const basinsData = require('data/basins.json');

const valueMatch = (value, query) => {
  const expr = new RegExp(query, 'i');
  return value.match(expr);
};

export const getLocationByQuery = (filter) => {
  // Searching in countries
  const countries = locationData.filter((country) => valueMatch(country.name, filter));

  // Searching in states
  const states = [];
  locationData.forEach((country) => {
    const countryStates = country.state.filter((state) => valueMatch(state.name, filter));
    countryStates.forEach((state) => states.push(state));
  });

  // Searching in cities
  const cities = citiesData.filter((city) => valueMatch(city.label, filter));

  // Searching in basins
  const basins = basinsData.filter((basin) => valueMatch(basin.label, filter));

  return ({
    countries,
    states,
    cities,
    basins
  });
};

export default { getLocationByQuery }
