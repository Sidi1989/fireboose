import {Dog} from '../../utils/load-db.js';




// Test
const expectedId = 'newTestId1'

describe('Document', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      const newDog = new Dog({name:'newDog', age: 3}, 'newTestId1');
      newDog.save()
        .then(function (resolve) {
          if (expectedId == resolve) {
            done()
          } else {
            done(new Error('Failure at #save()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});