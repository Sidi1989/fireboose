import _ from 'lodash';
import {Country} from '../utils/country.js';




// Test
describe('Model', function () {
  describe('#popFrom()', function () {
    it('should remove the last element of an arrayProp, without error', function (done) {
      Country.popFrom('country04', 'rivers')
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone']};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure in #popFrom()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});