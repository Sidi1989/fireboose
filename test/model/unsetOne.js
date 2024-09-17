import _ from 'lodash';
import Query from '../../src/query/index.js';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';
import loadBeforeUnindexedCountries from '../hooks/loadBeforeUnindexedCountries.js';




// Test
describe('Model', function () {
  before(loadBeforeUnindexedCountries);

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#unsetOne()', function () {
    it('should delete 1 specific field from a Doc, without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Greece');
      const field = 'seas';
      
      UnindexedCountry.unsetOne(newQuery, field)
        .then(function(resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Greece',
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #unsetOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});