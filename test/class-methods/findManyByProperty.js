import _ from 'lodash';
import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const countrySchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  continent: {
    $type: String,
    required: true
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');

Country.create({name: 'Spain', continent: 'Europe'}, 'findManyByPropertyTestId1');
Country.create({name: 'Morocco', continent: 'Africa'}, 'findManyByPropertyTestId2');
Country.create({name: 'Italy', continent: 'Europe'}, 'findManyByPropertyTestId3');
Country.create({name: 'Japan', continent: 'Asia'}, 'findManyByPropertyTestId4');

// Test 1
const matchProps1 = {documentsLimit: 2, equality: true}
const countries1 = await Country.findManyByProperty('continent', ['Europe', 'Africa'], matchProps1);
const expectedResolve1 = [
  {name: 'Spain', continent: 'Europe'},
  {name: 'Morocco', continent: 'Africa'}
];

if (!_.isEqual(expectedResolve1, countries1)) {
  console.error('Failure at .findManyByProperty() in Test 1');
}

// Test 2
const matchProps2 = {documentsLimit: 3, equality: false}
const countries2 = await Country.findManyByProperty('continent', ['Africa'], matchProps2);
const expectedResolve2 = [
  {name: 'Japan', continent: 'Asia'},
  {name: 'Spain', continent: 'Europe'},
  {name: 'Italy', continent: 'Europe'},
];

if (!_.isEqual(expectedResolve2, countries2)) {
  console.error('Failure at .findManyByProperty() in Test 2');
}

// Test 3
const countries3 = await Country.findManyByProperty('continent', ['Europe']);
const expectedResolve3 = [
  {name: 'Spain', continent: 'Europe'},
];

if (!_.isEqual(expectedResolve3, countries3)) {
  console.error('Failure at .findManyByProperty() in Test 3');
}