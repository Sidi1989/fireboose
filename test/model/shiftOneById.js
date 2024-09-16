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
  
  describe('#shiftOneById()', function () {
    it('should remove the first element of an arrayProp, without error', function (done) {
      UnindexedCountry.shiftOneById('country04', 'rivers')
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Japan', 
            continent: 'Asia', 
            population: 125, 
            rivers: ['Tone', 'Ishikari']
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #shiftOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});