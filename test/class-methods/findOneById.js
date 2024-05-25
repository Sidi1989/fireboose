import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#findOneById()', function () {
    it('should find 1 Doc without error', function (done) {
      Country.findOneById('findByTestId1')
        .then(function (resolve) {
          let expectedResolve = {name: 'Spain', seas: ['Atlantic', 'Mediterranean'], continent: 'Europe'};
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