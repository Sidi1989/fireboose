import fireboose from '../src/index.js';
import firebooseConnectionSettings from '../runtime/config/firebase-config.json' assert { type: "json" };




fireboose.connect(firebooseConnectionSettings);

const Perro = fireboose.model('Perro', 'perros');

// Test
const kira = new Perro({name:'kira'}, 'test3id');
const pancho = new Perro({name:'pancho'}, 'test3id2');

kira.inspect();
pancho.save();