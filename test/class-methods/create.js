import _ from 'lodash';
import {Country} from '../utils/load-db.js';



// Test 1
describe('Model', function () {
  describe('#create()', function () {
    it('should create 1 Doc without error', function (done) {
      Country.create({name: 'Spain', capital: 'Madrid'}, 'createTest1Id')
        .then(function (resolve) {
          let expectedResolve = 'createTestId';
          if (expectedResolve == resolve) {
            return resolve
          } else {
            done(new Error('Failure at create instance in #create() Test1'))
          }
        })
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'Spain', capital: 'Madrid'};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure at find created instance in #create() Test1'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});


// Test 2
describe('Model', function () {
  describe('#create()', function () {
    it('should create 1 Doc without error', function (done) {
      Country.create({name: 'France', capital: 'Paris'})
        .then(function (resolve) {
          Country.findOneById(resolve)
            .then(function(resolve) {
              let expectedResolve = {name: 'France', capital: 'Paris'};
              if (_.isEqual(expectedResolve, resolve)) {
                done()
              } else {
                done(new Error('Failure in #create() Test2'))
              }
            })
        })
        .catch(function(reject) {
          done(reject)
        })
    });
  });
});