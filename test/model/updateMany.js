import _ from 'lodash';
import Query from '../../src/query/index.js';
import {Country} from '../utils/country.js';




// Test
const newQuery = new Query()
  .where('continent', '==', 'Europe').exec()

describe('Model', function () {
  describe('#updateMany()', function () {
    it('should update multiple Docs, without error', function (done) {
      const update = {continent: 'Old'};
      Country.updateMany(update, newQuery)
        .then(function (resolve) {
          let expectedResolve = ['country01', 'country02', 'country07', 'country08'];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #updateMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});