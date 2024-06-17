import _ from 'lodash';
import Query from '../../src/query/index.js';
import {Country} from '../utils/country.js';




// Test
const newQuery = new Query()
  .where('continent', '==', 'Europe')
  // .where('population', '>=', 50)
  // .orderBy('population', 'desc')
  // .skip(1)
  // .limit(6)

describe('Model', function () {
  describe('#findMany()', function () {
    it('should find multiple Docs without error', function (done) {
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