import Query from '../../../query/index.js';




/**
 * @description Check the composite indexes needed for the Model, so it won't
 * be created when some of those indexes are not previously set in Firestore.
 * It will only trigger when (autoIndex == true).
 */
const ensureIndexes = function () {
  const indexes = this.schema.indexes;
  
  for (let index of indexes) {
    // Original query generation
    var query = new Query();
    
    // Progressive building of the query with the information 
    // for each composite index. E.g.:
    //  {
    //    continent: '==', 
    //    population: '>',
    //  }
    for (let [propName, propValue] of Object.entries(index)) {

      if (propValue == '<' || propValue == '<=' || propValue == '>=' || propValue == '>') {
        query = query.where(propName, propValue, '');
      } else if (propValue == 'asc' || propValue == 'desc') {
        query = query.orderBy(propName, propValue);
      } else if (propValue == 'array-contains') {
        query = query.where(propName, propValue, '');
      } else if (propValue == 'array-contains-any') {
        query = query.where(propName, propValue, []);
      }
    }
    
    this.findMany(query)
      .then(function (resolve) {
        console.debug('[ensureIndexes()]: Does not require a new Index', resolve)
      })
      .catch(function (reject) {
        console.error('[ensureIndexes()] Does require a new Index', reject)
      })
  }
}




export default ensureIndexes;