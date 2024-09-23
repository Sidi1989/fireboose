/**
 * @description
 * Update a document (identified as the result of a query) 
 * by sorting one of its {Array} properties.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * About the elements in the array:
 *    there can only be {Number},
 *    but neither {String} nor {Object}
 * @param {String} order 'asc' | 'desc'
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   coasts: [1090, 1200, 910]
 * };
 *  
 * await Country.sortOne(query, 'coasts', 'asc');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   coasts: [910, 1090, 1200]
 * // };
 */
const sortOne = function (q, arrayProp, order) {
  if (!q || !arrayProp || !order) {
    throw new Error('Not enough params for [sortOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.sortMany(limitedQ, arrayProp, order)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default sortOne;