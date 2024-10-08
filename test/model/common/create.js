import _ from 'lodash';
import UnindexedCountry from '../../hooks/unindexedCountryModel.js';
import { deleteCollectionDocs } from '../../../src/utils/db.js';




// Test 1
describe('Model', function () {
  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });

  describe('#create()', function () {
    it('should create 1 Doc without error', function (done) {
      UnindexedCountry.create(
        {name: 'Mongolia', capital: 'Ulán Bator'}, 'createTest'
      )
      .then(function (resolve) {
        let expectedResolve = 'createTest';
        if (expectedResolve == resolve) {
          return resolve
        } else {
          done(new Error('Failure at create instance in #create() Test1'))
        }
      })
      .then(function (resolve) {
        return UnindexedCountry.findOneById(resolve)
      })
      .then(function(resolve) {
        let expectedResolve = {name: 'Mongolia', capital: 'Ulán Bator'};
        if (_.isEqual(expectedResolve, resolve)) {
          done()
        } else {
          done(new Error('Failure at find created instance in #create() Test1'))
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
  after(async function () {
    await deleteCollectionDocs('unindexedCountries');
  });
  
  describe('#create()', function () {
    it('should create 1 Doc without error', function (done) {
      UnindexedCountry.create(
        {name: 'China', capital: 'Pekín'}
      )
      .then(function (resolve) {
        return UnindexedCountry.findOneById(resolve)
      })
      .then(function(resolve) {
        let expectedResolve = {
          name: 'China', 
          capital: 'Pekín'
        };
        if (_.isEqual(expectedResolve, resolve)) {
          done()
        } else {
          done(new Error('Failure in #create() Test2'))
        }
      })
      .catch(function(reject) {
        done(reject)
      })
    });
  });
});