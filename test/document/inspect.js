import UnindexedCountry from '../hooks/unindexedCountryModel.js';




// Test (without Mocha)
const inspectCountry = new UnindexedCountry(
  {name:'inspectCountry', continent: 'Pangea'}, 'inspectTestId'
);

inspectCountry.inspect();