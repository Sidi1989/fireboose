import {Dog} from '../../utils/load-db.js';




// Test
const toObjectDog = new Dog({name:'toObjectDog', age: 3}, 'toObjectTestId1');

console.log(toObjectDog.toObject());