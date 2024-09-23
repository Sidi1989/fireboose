/**
 * @description
 * Update a document (identified as the result of a query) 
 * by removing, from one of its {Array} properties,
 * those elements whose value is coincident with the one 
 * passed as the argument.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @param {Mixed} element 27 || 'Madrid' || true || {name: 'Madrid', river: 'Manzanares'}
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona', 'Bilbao']
 * };
 *  
 * await Country.pullOne(query, cities, 'Bilbao');
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona']
 * // };
 */
const pullOne = function (q, arrayProp, element) {
  if (!q || !arrayProp || !element) {
    throw new Error('Not enough params for [pullOne]')
  }
  
  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.pullMany(limitedQ, arrayProp, element)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default pullOne;