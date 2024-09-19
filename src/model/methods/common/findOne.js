/**
 * @description
 * Retrieve one Firestore document from a collection, according to
 * a previously defined query
 * @param {Query} q
 * @returns {Promise<FirestoreDoc|Null>}
 */
const findOne = function (q) {
  if (!q) {
    throw new Error('Not enough params for [findOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var doc =
      this.findMany(limitedQ)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return doc;
};




export default findOne;