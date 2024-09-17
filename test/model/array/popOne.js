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
  
  describe('#popOne()', function () {
    it('should remove the last element of an arrayProp, without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Japan');

      UnindexedCountry.popOne(newQuery, 'rivers')
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan', 
            continent: 'Asia', 
            population: 125, 
            rivers: ['Shinano', 'Tone']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #popOne()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});