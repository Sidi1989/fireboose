import assert from 'assert';
import {Country} from '../utils/country.js';




// Test
describe('Document', function () {
  describe('#validate()', function () {
    it('should validate an schema, without error', function () {
      const validateCountry = new Country({name:'validateCountry', continent: 'Pangea'}, 'validateTestId');
      
      const actualResult = validateCountry.validate();
      const expectedResult = true;
      
      assert.equal(actualResult, expectedResult);
    });
  })
})