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
  
  describe('#findOne()', function () {
    it('should retrieve 1 Doc, without error', function (done) {
      const newQuery = new Query()
        .where('population', '>=', 120);

      UnindexedCountry.findOne(newQuery)
        .then(function (resolve) {
          let expectedResolve = {
            name: 'Japan', 
            continent: 'Asia', 
            population: 125, 
            rivers: ['Shinano', 'Tone', 'Ishikari']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});