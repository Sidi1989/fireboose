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
const inspectDog = new Dog({name:'inspectDog', age: 3}, 'inspectTestId1');

const expectedId = 'inspectTestId1'
if (expectedId != inspectDog.__id) {
  console.error('Failure at .__id')
}
const expectedName = 'inspectDog'
if (expectedName != inspectDog.name) {
  console.error('Failure at .name')
}

inspectDog.inspect();