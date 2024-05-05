const countries = require('../../../public/countries/countries.json');

const countriesMap = {};

countries.forEach(country => {
  countriesMap[country.zip] = country;
});
