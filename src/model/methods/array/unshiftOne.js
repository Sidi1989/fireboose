/**
 * @description
 * Update a document (identified as the result of a query) 
 * by adding, to one of its {Array} properties,
 * a new element that doesn’t exist there already, 
 * appending it at the beginning of the array.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona']
 * };
 *  
 * await Country.unshiftOne(query, cities, 'Valencia');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Valencia', 'Madrid', 'Barcelona']
 * // };
 */
const unshiftOne = function (q, arrayProp, element) {
  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [unshiftOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.unshiftMany(limitedQ, arrayProp, element)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default unshiftOne;