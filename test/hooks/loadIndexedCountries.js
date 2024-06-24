import IndexedCountry from './indexedCountryModel.js';




console.log('[INFO] Start loading DB');

IndexedCountry.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
IndexedCountry.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
IndexedCountry.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
IndexedCountry.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
IndexedCountry.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
IndexedCountry.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
IndexedCountry.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
IndexedCountry.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
IndexedCountry.create({name: 'Argentina', continent: 'America'}, 'country09');

console.log('[INFO] Finish loading DB');