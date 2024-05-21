import _ from 'lodash';
import fireboose, {Schema} from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const countrySchemaDefinition = {
  name: {
    $type: String,
    required: true
  },
  rivers: {
    $type: Array,
    required: true
  },
};
const countrySchemaConfig = {};
const countrySchema = new Schema(countrySchemaDefinition, countrySchemaConfig);
const Country = fireboose.model('Country', countrySchema, 'countries');

// Test
Country.create({name: 'Spain', rivers: ['Ebro', 'Tajo', 'Duero']}, 'removeFromArrayTestId1');
const element = 'Tajo';

Country.removeFromArray('removeFromArrayTestId1', 'rivers', element)
  .then(function(resolve) {
    Country.findOneById(resolve)
      .then(function(resolve) {
        let expectedResolve = {name: 'Spain', rivers: ['Ebro', 'Duero']};

        if (!_.isEqual(expectedResolve, resolve)) {
          console.error('Failure at .removeFromArray()');
        }
      })
  })