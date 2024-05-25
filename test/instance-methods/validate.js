import {Country} from '../utils/load-db';




// Test
const validateCountry = new Country({name:'validateCountry', continent: 'Pangea'}, 'validateTestId');

validateCountry.validate();