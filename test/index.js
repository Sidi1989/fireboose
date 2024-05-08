import fireboose from '../src';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json';




fireboose.connect(firebooseConnectionSettings);

// const Trial = fireboose.model('Trial', 'trials')

// const expectedName = 'Trial';
// const actualName = Trial.name;
// if (expectedName == actualName) {
//   console.debug('[Success] Test of name value')
// } else {
//   console.debug('[Failure] Test of name value')
// }

console.debug(fireboose);