import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




/**
 * @description
 * UnindexedCountry Model
 */
fireboose.connect(firebooseConnectionSettings);

// Basic parameters of the Schema
const unindexedCountrySchemaDefinition = {
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
const unindexedCountrySchemaConfig = {};

// Instantiation of the Schema
const unindexedCountrySchema = new Schema(unindexedCountrySchemaDefinition, unindexedCountrySchemaConfig);

// While creating the Model, it will trigger Model.ensureIndexes():
const UnindexedCountry = fireboose.model('UnindexedCountry', unindexedCountrySchema, 'unindexedCountries');




export default UnindexedCountry;