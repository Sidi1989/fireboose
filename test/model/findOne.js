import _ from 'lodash';
import Query from '../../src/query/index.js';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../src/utils/db.js';




// Test
describe('Model', function () {
  before(async function () {
    UnindexedCountry.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
    UnindexedCountry.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
    UnindexedCountry.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
    UnindexedCountry.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
    UnindexedCountry.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
    UnindexedCountry.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
    UnindexedCountry.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
    UnindexedCountry.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
    UnindexedCountry.create({name: 'Argentina', continent: 'America'}, 'country09');
  });

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