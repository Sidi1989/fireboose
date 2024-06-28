import _ from 'lodash';
import UnindexedCountry from '../hooks/unindexedCountryModel.js';




// Test
describe('Document', function () {
  describe('#toObject()', function () {
    it('should convert an instance into a POJO, without error', function () {
      const toObjectCountry = new UnindexedCountry(
        {name:'toObjectCountry', continent: 'Pangea'}, 'toObjectTestId'
      );
      
      const actualResult = toObjectCountry.toObject();
      const expectedResult = {
        name: 'toObjectCountry',
        continent: 'Pangea',
        __id: 'toObjectTestId'
      }
      
      _.isEqual(actualResult, expectedResult)
    });
  })
})