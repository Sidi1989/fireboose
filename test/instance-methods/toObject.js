import {Country} from '../utils/load-db.js';




// Test
const toObjectCountry = new Country({name:'toObjectCountry', continent: 'Pangea'}, 'toObjectTestId');

console.log(toObjectCountry.toObject());