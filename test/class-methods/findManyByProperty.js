import _ from 'lodash';
import {Country} from '../utils/load-db.js';




// Test 1
describe('Model', function () {
  describe('#findManyByProperty()', function () {
    it('should find multiple Docs without error', function (done) {
      const query = {documentsLimit: 2, equality: true};
      Country.findManyByProperty('continent', ['Europe', 'Africa'], query)
        .then(function (resolve) {
          let expectedResolve = [
            {name: 'Spain', seas: ['Atlantic', 'Mediterranean'], continent: 'Europe'},
            {name: 'Morocco', continent: 'Africa'}
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findManyByProperty() Test1'))
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
            {name: 'Spain', seas: ['Atlantic', 'Mediterranean'], continent: 'Europe'},
            {name: 'Italy', seas: ['Mediterranean'], continent: 'Europe'},
          ];
          if (_.isEqual(expectedResolve, resolve)) {
            done()
          } else {
            done(new Error('Failure in #findManyByProperty() Test2'))
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