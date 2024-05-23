import fireboose, {Schema} from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);


// Country Model
const countrySchemaDefinition = {
  name: {
    $type: String,
    required: false
  },
  continent: {
    $type: String,
    required: false
  },
  capital: {
    $type: String,
    required: false
  },
  seas: {
    $type: Array,
    required: false
  },
  rivers: {
    $type: Array,
    required: false
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');


// Dog Model
const dogSchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  age: {
    $type: Number,
    required: true
  },
};
const dogSchemaConfig = {};
const dogSchema = new Schema(dogSchemaDefinition, dogSchemaConfig);
const Dog = fireboose.model('Dog', dogSchema, 'dogs');




export {Country, Dog}