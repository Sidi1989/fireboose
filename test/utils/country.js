import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

// Country Model

// Basic parameters of the Schema
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
  population: {
    $type: Number,
    required: false
  }
};
const countrySchemaConfig = {};

// Generate an instance of Schema
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);

// At the moment of generating the Model, it will trigger Model.ensureIndexes():
const Country = fireboose.model('Country', countrySchema, 'countries');




export {Country};