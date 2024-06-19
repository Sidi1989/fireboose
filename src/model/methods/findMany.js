import { 
  collection, getDocs, 
  query,
  where, orderBy, limit, startAfter
} from 'firebase/firestore';




/**
 * @description
 * Retrieve multiple Firestore documents from a collection, according to
 * a previously defined query
 * @param {Query} q
 * @returns Array (of Firestore docs)
 * @example
 */
const findMany = async function (q) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  var queryOperations = [];
  // For the .where() method
  if (q.conditions && q.conditions.where && q.conditions.where.length > 0) {
    var whereConditions = q.conditions.where;
    whereConditions.forEach( function (condition) {
      var whereOperation = where(condition.property, condition.operator, condition.value);
      queryOperations.push(whereOperation);
    });
  }
  // For the .orderBy() method
  if (q.conditions && q.conditions.orderBy && q.conditions.orderBy.length > 0) {
    var orderByConditions = q.conditions.orderBy;
    orderByConditions.forEach( function (condition) {
      var orderByOperation = orderBy(condition.property, condition.direction? condition.direction : 'asc');
      queryOperations.push(orderByOperation);
    });
  }
  // For the .limit() method
  if (q.conditions && q.conditions.limit) {
    var limitOperation = limit(q.conditions.limit);
    queryOperations.push(limitOperation);
  }
  // For the .skip() method
  if (q.conditions && q.conditions.skip) {
    var skipOperation = startAfter(q.conditions.skip);
    queryOperations.push(skipOperation);
  }

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be passed into the query function as if each of
  // the elements of the array was an argument of the function:
  const queryDocs = query(collectionRef, ...queryOperations);

  const docs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docs.push(docSnap.data())
  });
  return docs;
};




export default findMany;