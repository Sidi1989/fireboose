import _ from 'lodash';
import {Country} from '../utils/country.js';




// Test
describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should add 1 element into an arrayProp, without error', function (done) {
      const element = 'Teshio';
      Country.pushInto('country04', 'rivers', element)
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Japan', continent: 'Asia', population: 125, rivers: ['Tone', 'Ishikari', 'Teshio']};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure in #pushInto()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});