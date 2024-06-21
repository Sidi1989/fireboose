import _ from 'lodash';
import Query from '../../src/query/index.js';
import {Country} from '../utils/country.js';




// Test
const newQuery = new Query()
  .where('continent', '==', 'Europe').exec()

describe('Model', function () {
  describe('#deleteMany()', function () {
    it('should delete multiple Docs, without error', function (done) {
      Country.deleteMany(newQuery)
        .then(function (resolve) {
          let expectedResolve = ['country01', 'country02', 'country07', 'country08'];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #deleteMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});