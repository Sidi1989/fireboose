import IndexedCountry from './indexedCountryModel.js';




const loadBeforeIndexedCountries = async function () {
  IndexedCountry.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
  IndexedCountry.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
  IndexedCountry.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
  IndexedCountry.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
  IndexedCountry.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
  IndexedCountry.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
  IndexedCountry.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
  IndexedCountry.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
  IndexedCountry.create({name: 'Argentina', continent: 'America'}, 'country09');
  IndexedCountry.create({name: 'Mexico', founder: 'Spain', languages: ['Spanish', 'English', 'Nahuatl']}, 'country10');
  IndexedCountry.create({name: 'Cuba', founder: 'Spain', languages: ['Spanish', 'English']}, 'country11');
  IndexedCountry.create({name: 'Martinique', founder: 'France', languages: ['English']}, 'country12');
  IndexedCountry.create({name: 'Canada', founder: 'France', languages: ['French', 'English']}, 'country13');
  IndexedCountry.create({name: 'Haiti', founder: 'France', languages: ['French', 'Spanish']}, 'country14');
  IndexedCountry.create({name: 'Castille', isExtinct: true, dynasties: [1029, 931, 1157, 1504, 1367]}, 'country15');
  IndexedCountry.create({name: 'Aragon', isExtinct: true, dynasties: [802, 943, 1164, 1035, 1412]}, 'country16');
};




export default loadBeforeIndexedCountries;