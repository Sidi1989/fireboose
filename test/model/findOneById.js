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
  
  describe('#findOneById()', function () {
    it('should find 1 Doc by its ID, without error', function (done) {
      UnindexedCountry.findOneById('country02')
        .then(function (resolve) {
          let expectedResolve = {
            name: 'Italy', 
            continent: 'Europe', 
            seas: ['Mediterranean']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});