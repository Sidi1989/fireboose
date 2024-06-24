import Query from '../../src/query/index.js';
import IndexedCountry from '../hooks/indexedCountryModel.js';




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