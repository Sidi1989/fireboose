import {Country} from '../utils/country.js';




// Test (without Mocha)
const inspectCountry = new Country({name:'inspectCountry', continent: 'Pangea'}, 'inspectTestId');
inspectCountry.inspect();