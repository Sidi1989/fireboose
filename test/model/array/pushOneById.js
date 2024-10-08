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

  describe('#pushOneById()', function () {
    it('should add 1 specific element at the end of an arrayProp, without error', function (done) {
      const element = 'Teshio';

      UnindexedCountry.pushOneById('country04', 'rivers', element)
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan', 
            continent: 'Asia', 
            population: 125, 
            rivers: ['Shinano', 'Tone', 'Ishikari', 'Teshio']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #pushOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});