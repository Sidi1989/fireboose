import _ from 'lodash';
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
Country.create({name: 'Spain', capital: 'Madrid'}, 'findManyTestId1');
Country.create({name: 'France', capital: 'Paris'}, 'findManyTestId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findManyTestId3');
Country.create({name: 'Morocco', capital: 'Rabat'}, 'findManyTestId4');

const expectedResolve = [
  {name: 'Spain', capital: 'Madrid'},
  {name: 'France', capital: 'Paris'}
];
const countries = await Country.findMany(2);

if (!_.isEqual(expectedResolve, countries)) {
  console.error('Failure at .findMAny()');
}