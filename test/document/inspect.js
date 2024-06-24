import {UnindexedCountry} from '../utils/db.js';




// Test (without Mocha)
const inspectCountry = new UnindexedCountry(
  {name:'inspectCountry', continent: 'Pangea'}, 'inspectTestId'
);

inspectCountry.inspect();