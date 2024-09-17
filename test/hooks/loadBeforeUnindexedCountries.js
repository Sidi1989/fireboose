import UnindexedCountry from './unindexedCountryModel.js';




const loadBeforeInModelTests = async function () {
  UnindexedCountry.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
  UnindexedCountry.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
  UnindexedCountry.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
  UnindexedCountry.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
  UnindexedCountry.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
  UnindexedCountry.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
  UnindexedCountry.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
  UnindexedCountry.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
  UnindexedCountry.create({name: 'Argentina', continent: 'America'}, 'country09');
  UnindexedCountry.create({name: 'Mexico', founder: 'Spain', languages: ['Spanish', 'English', 'Nahuatl']}, 'country10');
  UnindexedCountry.create({name: 'Cuba', founder: 'Spain', languages: ['Spanish', 'English']}, 'country11');
  UnindexedCountry.create({name: 'Martinique', founder: 'France', languages: ['English']}, 'country12');
  UnindexedCountry.create({name: 'Canada', founder: 'France', languages: ['French', 'English']}, 'country13');
  UnindexedCountry.create({name: 'Haiti', founder: 'France', languages: ['French', 'Spanish']}, 'country14');
};




export default loadBeforeInModelTests;