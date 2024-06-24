import _ from 'lodash';
import {UnindexedCountry} from '../utils/db.js';




// Test
describe('Model', function () {
  describe('#shiftFrom()', function () {
    it('should remove the first element of an arrayProp, without error', function (done) {
      UnindexedCountry.shiftFrom('country04', 'rivers')
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan', 
            continent: 'Asia', 
            population: 125, 
            rivers: ['Tone', 'Ishikari']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #shiftFrom()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});