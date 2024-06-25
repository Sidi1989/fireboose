import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




/**
 * @description
 * IndexedCountry Model
 */
fireboose.connect(firebooseConnectionSettings);

// Basic parameters of the Schema
const indexedCountrySchemaDefinition = {
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
const indexedCountrySchemaConfig = {
  autoIndex: true
};

// Instantiation of the Schema
const indexedCountrySchema = new Schema(indexedCountrySchemaDefinition, indexedCountrySchemaConfig);

// Addition of some indexes to the instanced schema
indexedCountrySchema.addIndex({name: 'asc', continent: 'asc'});
indexedCountrySchema.addIndex({name: 'asc', continent: 'desc'});
indexedCountrySchema.addIndex({continent: 'desc', population: 'desc'});
indexedCountrySchema.addIndex({continent: '==', population: '>'});
indexedCountrySchema.addIndex({name: '==', population: 'asc'});
indexedCountrySchema.addIndex({continent: '==', rivers: 'array-contains'});
indexedCountrySchema.addIndex({population: 'asc', rivers: 'array-contains'});

// While creating the Model, it will trigger Model.ensureIndexes():
const IndexedCountry = fireboose.model('IndexedCountry', indexedCountrySchema, 'indexedCountries');




export default IndexedCountry;