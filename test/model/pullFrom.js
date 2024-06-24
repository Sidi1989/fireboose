import _ from 'lodash';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';




// Test
describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should remove 1 element from an arrayProp, without error', function (done) {
      const element = 'Shinano';
      UnindexedCountry.pullFrom('country04', 'rivers', element)
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
            done(new Error('Failure in #pullFrom()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});