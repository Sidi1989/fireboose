import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', capital: 'Madrid'}, 'findManyTestId1');
Country.create({name: 'France', capital: 'Paris'}, 'findManyTestId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findManyTestId3');
Country.create({name: 'Morocco', capital: 'Rabat'}, 'findManyTestId4');

describe('Model', function () {
  describe('#findMany()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findMany(2)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'France', capital: 'Paris'},
            {name: 'Spain', capital: 'Madrid'}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findMany()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});