import {Dog} from '../../utils/load-db.js';




// Test
const validateDog = new Dog({name:'validateDog', age: 3}, 'validateTestId1');

validateDog.validate();