import Query from '../../query/index.js';




/**
 * @description Check the composite indexes needed for the Model, so it won't
 * be created when some of them are not previously created in Firestore.
 * It will only trigger when (autoIndex == true).
 */
const ensureIndexes = function () {
  const indexes = this.schema.indexes
  
  for (let index of indexes) {
    // Original query generation
    var query = new Query();
    
    // Progressively the query is built using the information 
    // for the compound index
    for (let key in index) {
      query = query.orderBy(key, index.key);
    }
    
    this.findMany(query)
      .then(function (resolve) {
        console.debug('ensureIndexes() Success:', resolve)
      })
      .catch(function (reject) {
        console.error('ensureIndexes() Error:', reject)
      })
  }
}




export default ensureIndexes;