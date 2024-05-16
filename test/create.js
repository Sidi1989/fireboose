import fireboose from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Pet = fireboose.model('Pet', 'pets');

// Test
Pet.create({name: 'kira'}, 'test2id')
  .then(function(resolve) {
    let expectedResolve = 'test2id';
    if (expectedResolve != resolve) {
      console.error('First resolve test failed');
    }
    return resolve;
  })
  .then(function(resolve) {
    Pet.findOneById(resolve)
      .then(function(resolve) {
        console.debug('findOneByIdResolve', resolve);
      })
  })
  .catch(function(reject) {
    console.error('Error in create Test 2!');
  })

Pet.create({name: 'pancho'},)
  .then(function(resolve) {
    console.debug('addResolve', resolve);
    return resolve;
  })
  .then(function(resolve) {
    Pet.findOneById(resolve)
      .then(function(resolve) {
        console.debug('findOneByIdResolve', resolve);
      })
  })
  .catch(function(reject) {
    console.error('Error in add Test 2!');
  })