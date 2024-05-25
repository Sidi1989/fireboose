import {Country} from '../utils/load-db';




// Test
const inspectCountry = new Country({name:'inspectCountry', age: 3}, 'inspectTestId');

const expectedId = 'inspectTestId'
if (expectedId != inspectCountry.__id) {
  console.error('Failure at inspect() when retrieving .__id')
}
const expectedName = 'inspectCountry'
if (expectedName != inspectCountry.name) {
  console.error('Failure at inspect() when retrieving .name')
}

inspectCountry.inspect();