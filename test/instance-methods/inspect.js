import {Country} from '../utils/load-db.js';




// Test
const inspectCountry = new Country({name:'inspectCountry', continent: 'Pangea'}, 'inspectTestId');

const expectedId = 'inspectTestId'
if (expectedId != inspectCountry.__id) {
  console.error('Failure at inspect() when retrieving .__id')
}
const expectedName = 'inspectCountry'
if (expectedName != inspectCountry.name) {
  console.error('Failure at inspect() when retrieving .name')
}

inspectCountry.inspect();