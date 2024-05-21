import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const dogSchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  age: {
    $type: Number,
    required: false
  },
};
const dogSchemaConfig = {};
const dogSchema = new Schema(dogSchemaDefinition, dogSchemaConfig);
const Dog = fireboose.model('Dog', dogSchema, 'dogs');

// Test
const newDog = new Dog({name:'newDog', age: 3}, 'newTestId1');

const expectedId = 'newTestId1'
if (expectedId != newDog.__id) {
  console.error('Failure at .__id')
}

newDog.save()
  .catch(function (reject) {
    console.debug(reject)
    console.error('Failure at .save()')
  });