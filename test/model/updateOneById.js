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

  describe('#updateOneById()', function () {
    it('should update 1 Doc without error', function (done) {
      const update = {name: 'Macedonia'};
      
      UnindexedCountry.updateOneById('country06', update)
        .then(function(resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Macedonia', 
            seas: ['Mediterranean', 'Aegean']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at find updated instance in #updateOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});