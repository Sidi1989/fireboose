import UnindexedCountry from '../hooks/unindexedCountryModel.js';




// Test (without Mocha)
console.log('Properties of the instance:')

const inspectCountry = new UnindexedCountry(
  {name:'inspectCountry', continent: 'Pangea'}, 'inspectTestId'
);

inspectCountry.inspect();