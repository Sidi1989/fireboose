import fireboose from '../../src/index.js';
import firebooseConnectionSettings from '../../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Pet = fireboose.model('Pet', 'pets');

// Test
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