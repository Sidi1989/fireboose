import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




// Test
Country.create({name: 'Spain', seas: ['Atlantic', 'Mediterranean']}, 'findByArrayElementTestId1');
Country.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'findByArrayElementTestId2');
Country.create({name: 'Italy', seas: ['Mediterranean']}, 'findByArrayElementTestId3');
Country.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'findByArrayElementTestId4');

describe('Model', function () {
  describe('#findByArrayElement()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findByArrayElement('seas', 'Mediterranean', 2)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', seas: ['Atlantic', 'Mediterranean']},
            {name: 'Italy', seas: ['Mediterranean']}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findByArrayElement()'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});