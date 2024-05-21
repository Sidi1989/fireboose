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
const validateDog = new Dog({name:'validateDog', age: 3}, 'validateTestId1');

validateDog.validate();