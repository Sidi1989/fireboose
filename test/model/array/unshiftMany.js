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

  describe('#unshiftMany()', function () {
    it('should add 1 specific element at the beginning of an arrayProp in multiple Docs, without error', function (done) {
      const newQuery = new Query()
        .where('founder', '==', 'Spain');

      UnindexedCountry.unshiftMany(newQuery, 'languages', 'Portuguese')
        .then(function (resolve) {
          let expectedResolve = ['country10', 'country11'];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #unshiftMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});