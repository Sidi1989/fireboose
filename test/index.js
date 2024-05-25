import {Country} from './utils/load-db.js';

Country.create({name: 'Spain', capital: 'Madrid'}, 'deleteOneTestId');

Country.create({name: 'France', capital: 'Paris'}, 'findManyTestId1');
Country.create({name: 'Germany', capital: 'Berlin'}, 'findManyTestId2');

Country.create({name: 'Spain', seas: ['Atlantic', 'Mediterranean'], continent: 'Europe'}, 'findByTestId1');
Country.create({name: 'Italy', seas: ['Mediterranean'], continent: 'Europe'}, 'findByTestId3');
Country.create({name: 'Denmark', seas: ['Atlantic', 'Baltic']}, 'findByTestId2');
Country.create({name: 'Greece', seas: ['Mediterranean', 'Aegean']}, 'findByTestId4');
Country.create({name: 'Morocco', continent: 'Africa'}, 'findByTestId5');
Country.create({name: 'Japan', continent: 'Asia', rivers: ['Shinano', 'Tone', 'Ishikari']}, 'findByTestId6');