import _ from 'lodash';
import Query from '../../src/query/index.js';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';
import loadBeforeUnindexedCountries from '../hooks/loadBeforeUnindexedCountries.js';




// Test
describe('Model', function () {
  before(loadBeforeUnindexedCountries);

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#unshiftOne()', function () {
    it('should add 1 element at the beginning of an arrayProp, without error', function (done) {
      const newQuery = new Query()
        .where('name', '==', 'Japan');
      const element = 'Teshio';
      
      UnindexedCountry.unshiftOne(newQuery, 'rivers', element)
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan',
            continent: 'Asia',
            population: 125,
            rivers: ['Teshio', 'Shinano', 'Tone', 'Ishikari',]
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done();
          } else {
            done(new Error('Failure in #unshiftOne()'));
          }
        })
        .catch(function(reject) {
          done(reject);
        })
    });
  });
});