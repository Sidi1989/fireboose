import Query from '../src/query/index.js';
import {Country} from './utils/country-with-index.js';




const newQuery = new Query()
  .where('continent', '==', 'Europe')
  // .where('population', '>=', 50)
  // .where('population', '<', 50)
  // .orderBy('population', 'desc')
  // .orderBy('name', 'desc')
  // .skip(1)
  // .limit(6)

const countries = await Country.findMany(newQuery);
console.log(countries)