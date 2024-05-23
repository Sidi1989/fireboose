import _ from 'lodash';
import {Country} from '../../utils/load-db.js';




Country.create({name: 'Spain', continent: 'Europe'}, 'findManyByPropertyTestId1');
Country.create({name: 'Morocco', continent: 'Africa'}, 'findManyByPropertyTestId2');
Country.create({name: 'Italy', continent: 'Europe'}, 'findManyByPropertyTestId3');
Country.create({name: 'Japan', continent: 'Asia'}, 'findManyByPropertyTestId4');

// Test 1
describe('Model', function () {
  describe('#findManyByProperty()', function () {
    it('should find multiple Docs without error', function (done) {
      const query = {documentsLimit: 2, equality: true};
      Country.findManyByProperty('continent', ['Europe', 'Africa'], query)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', continent: 'Europe'},
            {name: 'Morocco', continent: 'Africa'}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findManyByProperty() in Test 1'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});


// Test 2
describe('Model', function () {
  describe('#findManyByProperty()', function () {
    it('should find multiple Docs without error', function (done) {
      const query = {documentsLimit: 3, equality: false};
      Country.findManyByProperty('continent', ['Africa'], query)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Japan', continent: 'Asia'},
            {name: 'Spain', continent: 'Europe'},
            {name: 'Italy', continent: 'Europe'},
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findManyByProperty() in Test 2'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});


// Test 3
describe('Model', function () {
  describe('#findManyByProperty()', function () {
    it('should find multiple Docs without error', function (done) {
      Country.findManyByProperty('continent', ['Europe'])
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', continent: 'Europe'},
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure at #findManyByProperty() in Test 3'))
          }
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});