import _ from 'lodash';
import Query from '../../../src/query/index.js';
import UnindexedCountry from '../../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../../src/utils/db.js';




// Test
describe('Model', function () {
  before(async function () {
    UnindexedCountry.create({name: 'Atlantis', seas: ['Atlantic']}, 'deleteOneTest');
  });

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#deleteOne()', function () {
    it('should delete 1 Doc without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Atlantis');

      UnindexedCountry.deleteOne(newQuery)
        .then(function (resolve) {
          let expectedResolve = 'deleteOneTest';
          if (expectedResolve == resolve) {
            return resolve;
          } else {
            done(new Error('Failure at deleting instance in #deleteOne()'))
          }
        })
        .then(function(resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = null;
          if (expectedResolve == resolve) {
            done()
          } else {
            done(new Error('Failure at finding the deleted instance in #deleteOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});