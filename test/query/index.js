import _ from 'lodash';
import Query from '../../src/query/index.js';
import IndexedCountry from '../hooks/indexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';
import loadBeforeIndexedCountries from '../hooks/loadBeforeIndexedCountries.js'




const newQuery = new Query()
  .where('continent', '==', 'Europe')
  .where('population', '>', 50)
  // .where('seas', 'array-contains', 'Mediterranean')
  // .where(seas, 'array-contains-any', ['Atlantic', 'Mediterranean']
  // .where('continent', 'in', ['Europe', 'Africa'])
  // .orderBy('population', 'desc')
  // .orderBy('name', 'desc')
  // .skip(1)
  // .limit(6)

describe('Query', function () {
  before(loadBeforeIndexedCountries);

  after(async function () {
    await deleteCollectionDocs('indexedCountries');
  });

  describe('#ensureIndexes()', function () {
    it('should show as many links to Firestore as indexes are required for carrying on the query', function (done) {
      IndexedCountry.findMany(newQuery)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'France', continent: 'Europe', capital: 'Paris', population: 68},
            {name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #ensureIndexes()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});