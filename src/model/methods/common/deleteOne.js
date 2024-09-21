/**
 * @description
 * Delete a document from its collection, 
 * identified as the result of a query
 * @param {Query} q
 * @returns {Promise<String|Null>} docId
 */
const deleteOne = function (q) {
  if (!q) {
    throw new Error('Not enough params for [deleteOne]')
  }

  // As the method is set to keep only the first result, 
  // a new queryOperation (limit) must be added:
  const limitedQ = q.limit(1);
  var docId =
      this.deleteMany(limitedQ)
        .then(function (resolve) {
          if(resolve.length > 0) {
            return resolve[0];
          } else {
            return null;
          }
        })

  return docId;
};




export default deleteOne;