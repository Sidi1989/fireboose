import fireboose from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Pet = fireboose.model('Pet', 'pets');

// Test
Pet.create({name: 'kira'}, 'test2id')
  .then(function(resolve) {
    console.debug('insertOneResolve', resolve);
    return resolve;
  })
  .then(function(resolve) {
    Pet.findOneById(resolve)
      .then(function(resolve) {
        console.debug('findOneByIdResolve', resolve);
      })
  })
  .catch(function(reject) {
    console.error('Error in Test 2!');
    console.error(reject);
  })