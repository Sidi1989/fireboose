import {Dog} from '../../utils/load-db.js';




// Test
const inspectDog = new Dog({name:'inspectDog', age: 3}, 'inspectTestId1');

const expectedId = 'inspectTestId1'
if (expectedId != inspectDog.__id) {
  console.error('Failure at inspect() when retrieving .__id')
}
const expectedName = 'inspectDog'
if (expectedName != inspectDog.name) {
  console.error('Failure at inspect() when retrieving .name')
}

inspectDog.inspect();