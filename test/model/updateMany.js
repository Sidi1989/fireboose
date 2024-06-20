import _ from 'lodash';
import Query from '../../src/query/index.js';
import {Country} from '../utils/country.js';




// Test
const newQuery = new Query()
  .where('continent', '==', 'Europe').exec()
  // .where('population', '>=', 50)
  // .where('seas', 'array-contains', 'Mediterranean')
  // .where(seas, 'array-contains-any', ['Atlantic', 'Mediterranean']
  // .orderBy('population', 'desc')
  // .orderBy('name', 'desc')
  // .skip(1)
  // .limit(6)

describe('Model', function () {
  describe('#updateMany()', function () {
    it('should update multiple Docs, without error', function (done) {
      const update = {
        continent: 'Old'
      };
      Country.updateMany(newQuery, update)
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