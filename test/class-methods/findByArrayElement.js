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
    $type: Array,
    required: true
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');

// Test
Country.create({name: 'Spain', seas: ['Atlantic', 'Mediterranean']}, 'findByArrayElementTestId1');
Country.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'findByArrayElementTestId2');
Country.create({name: 'Italy', seas: ['Mediterranean']}, 'findByArrayElementTestId3');
Country.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'findByArrayElementTestId4');

const countries = await Country.findByArrayElement('seas', 'Mediterranean', 2);
const expectedResolve = [
  {name: 'Spain', seas: ['Atlantic', 'Mediterranean']},
  {name: 'Italy', seas: ['Mediterranean']}
];

if (!_.isEqual(expectedResolve, countries)) {
  console.error('Failure at .findByArrayElement()');
}