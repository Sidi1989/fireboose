import { 
  collection, getDocs, 
  query as q,
  where, orderBy, limit, startAfter
} from 'firebase/firestore';




/**
 * @description
 * Retrieve multiple Firestore documents from a collectiom, according to
 * a previously defined query
 * @param {Query} query
 * @returns Array (of Firestore docs)
 * @example
 */
const findMany = async function (query) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  var queryOperations = [];
  // For the .where() method
  if (query.conditions && query.conditions.where && query.conditions.where.length > 0) {
    var whereConditions = query.conditions.where;
    whereConditions.forEach( function (condition) {
      var whereOperation = where(condition.property, condition.operator, condition.value);
      queryOperations.push(whereOperation);
    });
  }
  // For the .orderBy() method
  if (query.conditions && query.conditions.orderBy && query.conditions.orderBy.length > 0) {
    var orderByConditions = query.conditions.orderBy;
    orderByConditions.forEach( function (condition) {
      var orderByOperation = orderBy(condition.property, condition.direction? condition.direction : 'asc');
      queryOperations.push(orderByOperation);
    });
  }
  // For the .limit() method
  if (query.conditions && query.conditions.limit) {
    var limitOperation = limit(query.conditions.limit);
    queryOperations.push(limitOperation);
  }
  // For the .skip() method
  if (query.conditions && query.conditions.skip) {
    var skipOperation = startAfter(query.conditions.skip);
    queryOperations.push(skipOperation);
  }

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be passed into the query function as if each of
  // the elements of the array was an argument of the function:
  const queryDocs = q(collectionRef, ...queryOperations);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  return docs;
};




export default findMany;