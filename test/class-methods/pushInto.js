import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', rivers: ['Ebro', 'Tajo']}, 'pushIntoTestId1');

describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should add 1 element into an arrayProp, without error', function (done) {
      const element = 'Duero';
      Country.pushInto('pushIntoTestId1', 'rivers', element)
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Spain', rivers: ['Ebro', 'Tajo', 'Duero']};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure at #pushInto()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});