const locationData = require('../data/countries.json');
const citiesData = require('../data/cities.json');
const basinsData = require('../data/basins.json');

const valueMatch = (value, query) => value.toLowerCase().indexOf(query.toLowerCase()) >= 0;

const getByQuery = (req, res) => {
  const { query } = req;
  const { q } = query;

  // Searching in countries
  const countries = locationData.filter((country) => valueMatch(country.name, q));

  // Searching in states
  const states = [];
  locationData.forEach((country) => {
    const countryStates = country.state.filter((state) => valueMatch(state.name, q));
    countryStates.forEach((state) => states.push(state));
  });

  // Searching in cities
  const cities = citiesData.filter((city) => valueMatch(city.label, q));

  // Searching in basins
  const basins = basinsData.filter((basin) => valueMatch(basin.label, q));

  return res.json({
    countries,
    states,
    cities,
    basins
  });
};

module.exports = {
  getByQuery
};
