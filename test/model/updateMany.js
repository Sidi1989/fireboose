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

  describe('#updateMany()', function () {
    it('should update multiple Docs, without error', function (done) {
      const update = {continent: 'Old'};
      const newQuery = new Query()
        .where('continent', '==', 'Europe');

      UnindexedCountry.updateMany(update, newQuery)
        .then(function (resolve) {
          let expectedResolve = ['country01', 'country02', 'country07', 'country08'];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #updateMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});