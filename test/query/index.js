import Query from '../../src/query/index.js';
import {IndexedCountry} from '../utils/db.js';




const newQuery = new Query()
  .where('continent', '==', 'Europe')
  // .where('population', '>=', 50)
  // .where('population', '<', 50)
  // .orderBy('population', 'desc')
  // .orderBy('name', 'desc')
  // .skip(1)
  // .limit(6)

const indexedCountries = await IndexedCountry.findMany(newQuery);
console.log(indexedCountries)