import _ from 'lodash';
import Query from '../../src/query/index.js';
import {Country} from '../utils/country.js';




// Test
const newQuery = new Query()
  .where('continent', '==', 'Europe').exec()
  // .where('population', '>=', 50)
  // .where('seas', 'array-contains', 'Mediterranean')
  // .where(seas, 'array-contains-any', ['Atlantic', 'Mediterranean']
  // .where('continent', 'in', ['Europe', 'Africa'])
  // .orderBy('population', 'desc')
  // .orderBy('name', 'desc')
  // .skip(1)
  // .limit(6)

describe('Model', function () {
  before('Model:before', function() {

  });

  describe('#findMany()', function () {
    it('should retrieve multiple Docs, without error', function (done) {
      Country.findMany(newQuery)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']},
            {name: 'Italy', continent: 'Europe', seas: ['Mediterranean']},
            {name: 'France', continent: 'Europe', capital: 'Paris', population: 68},
            {name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});