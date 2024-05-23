import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', capital: 'Madrid'}, 'findOneByIdTestId1');
Country.create({name: 'France', capital: 'Paris'}, 'findOneByIdTestId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findOneByIdTestId3');

describe('Model', function () {
  describe('#findOneById()', function () {
    it('should find 1 Doc without error', function (done) {
      Country.findOneById('findOneByIdTestId1')
        .then(function (resolve) {
          let expectedResolve = {name: 'Spain', capital: 'Madrid'};
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findOneById()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});