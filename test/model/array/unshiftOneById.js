import _ from 'lodash';
import UnindexedCountry from '../../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../../src/utils/db.js';
import loadBeforeUnindexedCountries from '../../hooks/loadBeforeUnindexedCountries.js';




// Test
describe('Model', function () {
  before(loadBeforeUnindexedCountries);

  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#unshiftOneById()', function () {
    it('should add 1 specific element at the beginning of an arrayProp, without error', function (done) {
      const element = 'Teshio';
      
      UnindexedCountry.unshiftOneById('country04', 'rivers', element)
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
            done(new Error('Failure in #unshiftOneById()'));
          }
        })
        .catch(function(reject) {
          done(reject);
        })
    });
  });
});