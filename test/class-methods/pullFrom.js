import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', rivers: ['Ebro', 'Tajo', 'Duero']}, 'pullFromTestId1');

describe('Model', function () {
  describe('#pullFrom()', function () {
    it('should remove 1 element from an arrayProp, without error', function (done) {
      const element = 'Tajo';
      Country.pullFrom('pullFromTestId1', 'rivers', element)
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Spain', rivers: ['Ebro', 'Duero']};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure at #pullFrom()'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});