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

// Test 1
Country.create({name: 'Spain', capital: 'Madrid'}, 'createTestId1')
  .then(function(resolve) {
    let expectedResolve = 'createTestId1';
    if (expectedResolve != resolve) {
      console.error('Failure at first promise of .create() in Test 1');
    }
    return resolve;
  })
  .then(function(resolve) {
    Country.findOneById(resolve)
      .then(function(resolve) {
        let expectedResolve = {name: 'Spain', capital: 'Madrid'};
        if (!_.isEqual(expectedResolve, resolve)) {
          console.error('Failure at second promise of .create() in Test 1');
        }
      })
  })

// Test 2
Country.create({name: 'France', capital: 'Paris'})
  .then(function(resolve) {
    Country.findOneById(resolve)
      .then(function(resolve) {
        let expectedResolve = {name: 'France', capital: 'Paris'};
        if (!_.isEqual(expectedResolve, resolve)) {
          console.error('Failure at first promise of .create() in Test 2');
        }
      })
  })