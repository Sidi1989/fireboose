import {Country} from '../../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#deleteOne()', function () {
    it('should delete 1 Doc without error', function (done) {
      Country.create({name: 'Spain', capital: 'Madrid'}, 'deleteOneTestId1')
        .then(function (resolve) {
          Country.deleteOne(resolve)
          return resolve;
        })
        .then(function (resolve) {
          let expectedResolve = 'deleteOneTestId1';
          if (expectedResolve == resolve) {
            return resolve;
          } else {
            done(new Error('Failure at first step #deleteOne()'))
          }
        })
        .then(function(resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = null;
              if (expectedResolve == resolve) {
                done()
              } else {
                done(new Error('Failure at second step #deleteOne()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});