import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should remove 1 element from an arrayProp, without error', function (done) {
      const element = 'Shinano';
      Country.pullFrom('findByTestId6', 'rivers', element)
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Japan', continent: 'Asia', rivers: ['Tone', 'Ishikari']};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure in #pullFrom()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});