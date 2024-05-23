import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', capital: 'Madrid'}, 'updateOneTestId1');

describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should update 1 Doc without error', function (done) {
      const update = {
        name: 'Spanish Empire'
      };
      Country.updateOne(update, 'updateOneTestId1')
        .then(function (resolve) {
          let expectedResolve = 'updateOneTestId1';
          if (expectedResolve == resolve) {
            return resolve
          } else {
            done(new Error('Failure at first step of #updateOne()'))
          }
        })
        .then(function(resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Spanish Empire', capital: 'Madrid'};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure at second step of #updateOne()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});