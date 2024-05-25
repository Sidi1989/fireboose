import {Country} from '../utils/load-db.js';




// Test
const validateCountry = new Country({name:'validateCountry', continent: 'Pangea'}, 'validateTestId');

validateCountry.validate();