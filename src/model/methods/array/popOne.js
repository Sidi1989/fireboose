/**
 * @description
 * Update a document (identified as the result of a query) 
 * by removing, from one of its {Array} properties,
 * its last element.
 * @param {Query} q
 * @param {String} arrayProp E.g: 'cities'
 * @returns {Promise<String|Null>} docId
 * @example
 * const country01 = {
 *   id: 'country01',
 *   name: 'Spain',
 *   cities: ['Madrid, 'Barcelona', 'Valencia']
 * };
 * 
 * await Country.popOne(query, cities);
 * 
 * console.log(country01)
 * // {
 * //   id: 'country01',
 * //   cities: ['Madrid', 'Barcelona']
 * // };
 */
const popOne = function (q, arrayProp) {
  if (!q || !arrayProp) {
    throw new Error('Not enough params for [popOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.popMany(limitedQ, arrayProp)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default popOne;