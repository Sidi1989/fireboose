import _ from 'lodash';
import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const countrySchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  seas: {
    $type: String,
    required: true
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');

// Test
Country.create({name: 'Spain', seas: ['Atlantic', 'Mediterranean']}, 'findByArrayElementsTestId1');
Country.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'findByArrayElementsTestId2');
Country.create({name: 'Italy', seas: ['Mediterranean']}, 'findByArrayElementsTestId3');
Country.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'findByArrayElementsTestId4');

const countries = await Country.findByArrayElements('seas', ['Atlantic', 'Aegean'], 3);
const expectedResolve = [
  {name: 'Spain', seas: ['Atlantic', 'Mediterranean']},
  {name: 'Denmark', seas: ['Atlantic', 'Baltic']},
  {name: 'Greece', seas: ['Mediterranean', 'Aegean']}
];

if (!_.isEqual(expectedResolve, countries)) {
  console.error('Failure at .findByArrayElements()');
}