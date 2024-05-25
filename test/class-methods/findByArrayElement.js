import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#findByArrayElement()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findByArrayElement('seas', 'Mediterranean', 2)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', seas: ['Atlantic', 'Mediterranean']},
            {name: 'Italy', seas: ['Mediterranean']}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findByArrayElement()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});