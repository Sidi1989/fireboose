import _ from 'lodash';
import {UnindexedCountry} from '../utils/db.js';




// Test
describe('Model', function () {
  describe('#findOneById()', function () {
    it('should find 1 Doc by its ID, without error', function (done) {
      UnindexedCountry.findOneById('country02')
        .then(function (resolve) {
          let expectedResolve = {
            name: 'Italy', 
            continent: 'Europe', 
            seas: ['Mediterranean']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});