/**
 * @description
 * Delete a specific field from a document, 
 * identified as the result of a query
 * @param {Query} q
 * @param {String} field E.g: 'rivers'
 * @returns {Promise<String|Null>} docId
 * @example
 * const newCountry = await Country.create(
 *     {name: 'Spain', capital: 'Madrid', rivers: ['Ebro', 'Tajo', 'Duero']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.unsetOne(
 *    query,
 *    'rivers'
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'Spain', capital: 'Madrid'}
 */
const unsetOne = function (q, field) {
  if (!q || !field) {
    throw new Error('Not enough params for [unsetOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.unsetMany(limitedQ, field)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default unsetOne;