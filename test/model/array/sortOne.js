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
  
  describe('#sortOne()', function () {
    it('should sort an arrayProp of a Doc, without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Castille');

      UnindexedCountry.sortOne(newQuery, 'dynasties', 'desc')
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Castille', 
            isExtinct: true, 
            dynasties: [1504, 1367, 1157, 1029, 931]
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #sortOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});