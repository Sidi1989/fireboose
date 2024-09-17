import _ from 'lodash';
import Query from '../../../src/query/index.js';
import UnindexedCountry from '../../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../../src/utils/db.js';
import loadBeforeUnindexedCountries from '../../hooks/loadBeforeUnindexedCountries.js';




// Test
describe('Model', function () {
  before(loadBeforeUnindexedCountries);

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#renameMany()', function () {
    it('should rename 1 specific field from multiple Docs, without error', function (done) {
      const newQuery = new Query()
        .where('continent', '==', 'Europe');
      const oldKey = 'seas';
      const newKey = 'frontiers';
      
      UnindexedCountry.renameMany(newQuery, oldKey, newKey)
      .then(function (resolve) {
        let expectedResolve = ['country01', 'country02', 'country07', 'country08'];
        if (_.isEqual(expectedResolve, resolve)) {
          done()
        } else {
          done(new Error('Failure in #renameMany()'))
        }
      })
      .catch(function(reject) {
        done(reject)
      })
    });
  });
});