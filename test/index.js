import fireboose from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Pet = fireboose.model('Pet', 'pets');
const createPet = async function (info) {
  const id = info.name;
  info.id = id
  await this.insertOne(id, info)

  return info;
}
Pet.createPet = createPet;


// Test 1
const expectedName = 'Pet';
const actualName = Pet.name;
if (expectedName == actualName) {
  console.debug('[Success] Test of name value')
} else {
  console.debug('[Failure] Test of name value')
}

if (fireboose.db) {
  console.debug('[Success] Test of db value')
} else {
  console.debug('[Failure] Test of db value')
}


// Test 2
Pet.createPet({name: 'jero'})
  .then(function(resolve) {
    console.debug('insertOneResolve', resolve);
    return resolve;
  })
  .then(function(resolve) {
    Pet.findOneById(resolve.id)
      .then(function(resolve) {
        console.debug('findOneByIdResolve', resolve);
      })
  })
  .catch(function(reject) {
    console.error('Error in Test 2!');
    console.error(reject);
  })

