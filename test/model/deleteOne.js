import _ from 'lodash';
import {Country} from '../utils/country.js';




// Test
describe('Model', function () {
  describe('#deleteOne()', function () {
    it('should delete 1 Doc without error', function (done) {
      Country.findOneById('deleteOneTest')
        .then(function (resolve) {
          let expectedResolve = {name: 'Atlantis', seas: ['Atlantic']};
          if (_.isEqual(expectedResolve, resolve)) {
            return resolve;
          } else {
            done(new Error('Failure at finding the instance to be deleted in #deleteOne()'))
          }
        })
        .then(function (resolve) {
          Country.deleteOne('deleteOneTest')
            .then(function (resolve) {
              let expectedResolve = 'deleteOneTest';
              if (expectedResolve == resolve) {
                return resolve;
              } else {
                done(new Error('Failure at deleting instance in #deleteOne()'))
              }
            })
            .then(function(resolve) {
              Country.findOneById(resolve)
                .then(function(resolve) {
                  let expectedResolve = null;
                  if (expectedResolve == resolve) {
                    done()
                  } else {
                    done(new Error('Failure at finding the deleted instance in #deleteOne()'))
                  }
                })
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});