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

  describe('#updateOne()', function () {
    it('should update 1 Doc, without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Greece');
      const update = {name: 'Macedonia'};
      
      UnindexedCountry.updateOne(newQuery, update)
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
            done(new Error('Failure in #updateOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});