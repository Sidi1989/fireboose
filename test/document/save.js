import {UnindexedCountry} from '../utils/db.js';




// Test
const expectedId = 'saveTestId'

describe('Document', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      const saveCountry = new UnindexedCountry(
        {name:'saveCountry', continent: 'Pangea'}, 'saveTestId'
      );
      
      saveCountry.save()
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