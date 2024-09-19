/**
 * @description
 * Overwrite a document, identified as the result of a query,
 * with the info passed as the argument
 * @param {Query} q
 * @param {Object} docInfo E.g: {name: 'Spain', capital: 'Madrid'}
 * About 'nested objects':
 * 
 * If the info to update is contained in a nested object like this:
 *  {
 *    name: 'Spain', 
 *    capital: { 
 *      city: 'Madrid', 
 *      river: 'Jarama'
 *    }
 *  }
 * 
 * And the update (docInfo) is represented like this:
 *  {
 *    capital: {
 *      river: 'Manzanares'
 *    }
 *  }
 * 
 * "flatten" will transform the object in a 'firebase dot notation' like this:
 *  {'capital.river': 'Manzanares'}
 * 
 * @returns {Promise<String|Null>} docId
 * @example
 * const newCountry = await Country.create(
 *    {name: 'Italy', capital: 'Rome'}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.updateOne(
 *    query,
 *    {name: 'Roman Empire'}
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Roman Empire', capital: 'Rome'}
 */
const updateOne = function (q, docInfo) {
  if (!q || !docInfo) {
    throw new Error('Not enough params for [updateOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.updateMany(limitedQ, docInfo)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default updateOne;