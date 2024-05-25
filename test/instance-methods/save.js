import {Country} from '../utils/load-db';




// Test
const expectedId = 'saveTestId'

describe('Document', function () {
  describe('#save()', function () {
    it('should save without error', function (done) {
      const saveCountry = new Country({name:'saveCountry', continent: 'Pangea'}, 'saveTestId');
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