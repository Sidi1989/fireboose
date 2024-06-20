import _ from 'lodash';
import {Country} from '../utils/country.js';




// Test
describe('Model', function () {
  describe('#unshiftInto()', function () {
    it('should add 1 element at the beginning of an arrayProp, without error', function (done) {
      const element = 'Teshio';
      Country.unshiftInto('country04', 'rivers', element)
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Japan', continent: 'Asia', population: 125, rivers: ['Teshio', 'Shinano', 'Tone', 'Ishikari',]};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure in #unshiftInto()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});