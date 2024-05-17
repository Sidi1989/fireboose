import _ from 'lodash';
import fireboose from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Country = fireboose.model('Country', 'countries');
Country.create({name: 'Spain', capital: 'Madrid'}, 'findManyId1');
Country.create({name: 'France', capital: 'Paris'}, 'findManyId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findManyId3');
Country.create({name: 'Morocco', capital: 'Rabat'}, 'findManyId4');

const expectedResolve = [
  {name: 'Spain', capital: 'Madrid'},
  {name: 'France', capital: 'Paris'}
];
const countries = await Country.findMany(2);

if (!_.isEqual(expectedResolve, countries)) {
  console.error('Failure in findMAny() test');
}