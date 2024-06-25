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

  describe('#updateOne()', function () {
    it('should update 1 Doc without error', function (done) {
      const update = {name: 'Macedonia'};
      
      UnindexedCountry.updateOne(update, 'country06')
        .then(function (resolve) {
          let expectedResolve = 'country06';
          if (expectedResolve == resolve) {
            return resolve
          } else {
            done(new Error('Failure at update instance in #updateOne()'))
          }
        })
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
            done(new Error('Failure at find updated instance in #updateOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});