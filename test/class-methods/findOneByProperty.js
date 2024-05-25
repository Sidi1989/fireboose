import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#findOneByProperty()', function () {
    it('should retrieve 1 Doc without error', function (done) {
      Country.findOneByProperty('name', 'Italy')
        .then(function (resolve) {
          let expectedResolve = {name: 'Italy', seas: ['Mediterranean'], continent: 'Europe'};
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findOneByProperty()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});