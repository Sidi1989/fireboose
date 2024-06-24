import UnindexedCountry from './unindexedCountryModel.js';




console.log('[INFO] Start loading DB');

UnindexedCountry.create({name: 'Atlantis', seas: ['Atlantic']}, 'deleteOneTest');
UnindexedCountry.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
UnindexedCountry.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
UnindexedCountry.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
UnindexedCountry.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
UnindexedCountry.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
UnindexedCountry.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
UnindexedCountry.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
UnindexedCountry.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
UnindexedCountry.create({name: 'Argentina', continent: 'America'}, 'country09');

console.log('[INFO] Finish loading DB');