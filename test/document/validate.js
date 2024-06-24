import assert from 'assert';
import {UnindexedCountry} from '../utils/db.js';




// Test
describe('Document', function () {
  describe('#validate()', function () {
    it('should validate an schema, without error', function () {
      const validateCountry = new UnindexedCountry(
        {name:'validateCountry', continent: 'Pangea'}, 'validateTestId'
      );
      
      const actualResult = validateCountry.validate();
      const expectedResult = true;
      
      assert.equal(actualResult, expectedResult);
    });
  })
})