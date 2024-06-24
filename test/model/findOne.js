import _ from 'lodash';
import Query from '../../src/query/index.js';
import {UnindexedCountry} from '../utils/db.js';




// Test
const newQuery = new Query()
  .where('population', '>=', 120)

describe('Model', function () {
  describe('#findOne()', function () {
    it('should retrieve 1 Doc, without error', function (done) {
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