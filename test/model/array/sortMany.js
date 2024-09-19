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
  
  describe('#sortMany()', function () {
    it('should sort an arrayProp in multiple Docs, without error', function (done) {
      const newQuery = new Query()
        .where('isExtinct', '==', true);

      UnindexedCountry.sortMany(newQuery, 'dynasties', 'desc')
      .then(function (resolve) {
        let expectedResolve = ['country15', 'country16'];
        if (_.isEqual(expectedResolve, resolve)) {
          done()
        } else {
          done(new Error('Failure in #sortMany()'))
        }
      })
      .catch(function(reject) {
        done(reject)
      })
    });
  });
});