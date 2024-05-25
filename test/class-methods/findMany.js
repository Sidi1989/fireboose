import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#findMany()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findMany(2)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'France', capital: 'Paris'},
            {name: 'Spain', capital: 'Madrid'}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});