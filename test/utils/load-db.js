import {Country} from './country.js';




Country.create({name: 'Atlantis', seas: ['Atlantic']}, 'deleteOneTest');
Country.create({name: 'Spain', continent: 'Europe', population: 48, seas: ['Atlantic', 'Mediterranean']}, 'country01');
Country.create({name: 'Italy', continent: 'Europe', seas: ['Mediterranean']}, 'country02');
Country.create({name: 'Morocco', continent: 'Africa', population: 38}, 'country03');
Country.create({name: 'Japan', continent: 'Asia', population: 125, rivers: ['Shinano', 'Tone', 'Ishikari']}, 'country04');
Country.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'country05');
Country.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'country06');
Country.create({name: 'France', continent: 'Europe', capital: 'Paris', population: 68}, 'country07');
Country.create({name: 'Germany', continent: 'Europe', capital: 'Berlin', population: 84}, 'country08');
Country.create({name: 'Argentina', continent: 'America'}, 'country09');