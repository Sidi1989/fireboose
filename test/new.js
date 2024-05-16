import fireboose from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Perro = fireboose.model('Perro', 'perros');

// Test
const kira = new Perro({name:'kira'}, 'test3id');

const expectedName = 'kira'
if (expectedName != kira.name) {
  console.error('Name test failed')
}
const expectedId = 'test3id'
if (expectedId != kira.__id) {
  console.error('Id test failed')
}

// kira.inspect();
kira.save()
  .then(function () {})
  .catch(function (reject) {
    console.debug(reject)
    console.error('Save test failed')
  })