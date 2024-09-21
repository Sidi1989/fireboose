/**
 * @description
 * Rename a specific field from a document 
 * (identified as the result of a query).
 * @param {Query} q
 * @param {String} oldKey E.g: 'countries'
 * @param {String} newKey E.g: 'nations'
 * @returns {Promise<String|Null>} docId
 * @example
 * const newCountry = await Country.create(
 *    {name: 'USA', colonies: ['Virginia', 'Maryland', 'Delaware']}, 
 *    'newCountryId'
 * );
 * 
 * const updatedCountry = await Country.renameOne(
 *    query,
 *    'colonies',
 *    'states'
 * );
 * 
 * console.log(await Country.findOneById('newCountryId'))
 * // {name: 'USA', states: ['Virginia', 'Maryland', 'Delaware']}
 */
const renameOne = function (q, oldKey, newKey) {
  if (!q || !oldKey || !newKey) {
    throw new Error('Not enough params for [renameOne]')
  }
  
  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.renameMany(limitedQ, oldKey, newKey)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default renameOne;