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

// Test
Country.create({name: 'Spain', capital: 'Madrid'}, 'updateOneTestId1');
const update = {
  name: 'Spanish Empire'
};

Country.updateOne(update, 'updateOneTestId1')
  .then(function(resolve) {
    let expectedResolve = 'updateOneTestId1';
    if (expectedResolve != resolve) {
      console.error('Failure at first promise of .updateOne()');
    }
    return resolve;
  })
  .then(function(resolve) {
    Country.findOneById(resolve)
      .then(function(resolve) {
      let expectedResolve = {name: 'Spanish Empire', capital: 'Madrid'};
      if (!_.isEqual(expectedResolve, resolve)) {
        console.error('Failure at second promise of .updateOne()');
      }
    })
  })