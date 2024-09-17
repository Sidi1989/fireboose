import _ from 'lodash';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';
import loadBeforeUnindexedCountries from '../hooks/loadBeforeUnindexedCountries.js';




// Test
describe('Model', function () {
  before(loadBeforeUnindexedCountries);

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#renameOneById()', function () {
    it('should rename 1 specific field from a Doc, without error', function (done) {
      const oldKey = 'seas';
      const newKey = 'frontiers';
      
      UnindexedCountry.renameOneById('country02', oldKey, newKey)
        .then(function(resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Italy', continent: 'Europe', frontiers: ['Mediterranean']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #renameOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});