import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', capital: 'Madrid'}, 'findOneByPropertyTestId1');
Country.create({name: 'France', capital: 'Paris'}, 'findOneByPropertyTestId2');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findOneByPropertyTestId3');

describe('Model', function () {
  describe('#findOneByProperty()', function () {
    it('should retrieve 1 Doc without error', function (done) {
      Country.findOneByProperty('name', 'Spain')
        .then(function (resolve) {
          let expectedResolve = {name: 'Spain', capital: 'Madrid'};
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findOneByProperty()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});