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
Country.create({name: 'Spain', capital: 'Madrid'}, 'findOneByIdTestId1');
Country.create({name: 'France', capital: 'Paris'}, 'findOneByIdTestId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findOneByIdTestId3');

const expectedResolve = {name: 'Spain', capital: 'Madrid'};
const country = await Country.findOneById('findOneByIdTestId1');

console.debug(country);
console.debug(expectedResolve);

if (expectedResolve != country) {
  console.error('Failure at .findOneById()');
}