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
  
  describe('#sortOneById()', function () {
    it('should sort an arrayProp of a Doc, without error', function (done) {
      UnindexedCountry.sortOneById('country15', 'dynasties', 'desc')
        .then(function (resolve) {
          return UnindexedCountry.findOneById(resolve);
        })
        .then(function(resolve) {
          let expectedResolve = {
            name: 'Castille', 
            isExtinct: true, 
            dynasties: [1504, 1367, 1157, 1029, 931]
          };
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #sortOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});