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

  describe('#shiftMany()', function () {
    it('should remove the first element of an arrayProp from multiple Docs, without error', function (done) {
      const newQuery = new Query()
        .where('founder', '==', 'France');

      UnindexedCountry.shiftMany(newQuery, 'languages')
        .then(function (resolve) {
          let expectedResolve = ['country12', 'country13', 'country14'];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #shiftMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});