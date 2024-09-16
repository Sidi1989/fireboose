import _ from 'lodash';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';




// Test
describe('Model', function () {
  before(async function () {
    UnindexedCountry.create({name: 'Atlantis', seas: ['Atlantic']}, 'deleteOneByIdTest');
  });

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#deleteOneById()', function () {
    it('should delete 1 Doc without error', function (done) {
      UnindexedCountry.deleteOneById('deleteOneByIdTest')
        .then(function (resolve) {
          let expectedResolve = 'deleteOneByIdTest';
          if (expectedResolve == resolve) {
            return resolve;
          } else {
            done(new Error('Failure at deleting instance in #deleteOneById()'))
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
            done(new Error('Failure at finding the deleted instance in #deleteOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});