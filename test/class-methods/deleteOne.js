import {Country} from '../utils/load-db.js';




// Test
describe('Model', function () {
  describe('#deleteOne()', function () {
    it('should delete 1 Doc without error', function (done) {
      Country.deleteOne('deleteOneTestId')
        .then(function (resolve) {
          let expectedResolve = 'deleteOneTestId';
          if (expectedResolve == resolve) {
            return resolve;
          } else {
            done(new Error('Failure at delete instance in #deleteOne()'))
          }
        })
        .then(function(resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = null;
              if (expectedResolve == resolve) {
                done()
              } else {
                done(new Error('Failure at find deleted instance in #deleteOne()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});