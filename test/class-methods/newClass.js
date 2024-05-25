import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const countrySchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  capital: {
    $type: String,
    required: true
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');

// Test
if (!fireboose.db) {
  console.error('Failure in newClass() DbTest')
}

const actualCollection = Country.collection;
const expectedCollection = 'countries';
if (expectedCollection != actualCollection) {
  console.error('Failure in newClass() CollectionTest')
}

const actualName = Country.name;
const expectedName = 'Country';
if (expectedName != actualName) {
  console.error('Failure in newClass() NameTest')
}

