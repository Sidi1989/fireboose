import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#findByArrayElements()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findByArrayElements('seas', ['Atlantic', 'Aegean'], 3)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', seas: ['Atlantic', 'Mediterranean']},
            {name: 'Denmark', seas: ['Atlantic', 'Baltic']},
            {name: 'Greece', seas: ['Mediterranean', 'Aegean']}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findByArrayElements()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});