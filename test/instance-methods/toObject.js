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
const toObjectDog = new Dog({name:'toObjectDog', age: 3}, 'toObjectTestId1');

console.log(toObjectDog.toObject());