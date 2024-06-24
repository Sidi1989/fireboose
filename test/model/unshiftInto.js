import _ from 'lodash';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';




// Test
describe('Model', function () {
  describe('#unshiftInto()', function () {
    it('should add 1 element at the beginning of an arrayProp, without error', function (done) {
      const element = 'Teshio';
      UnindexedCountry.unshiftInto('country04', 'rivers', element)
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan',
            continent: 'Asia',
            population: 125,
            rivers: ['Teshio', 'Shinano', 'Tone', 'Ishikari',]
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done();
          } else {
            done(new Error('Failure in #unshiftInto()'));
          }
        })
        .catch(function(reject) {
          done(reject);
        })
    });
  });
});