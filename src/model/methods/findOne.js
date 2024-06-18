import { 
  collection, getDocs, 
  query as q,
  where,
} from 'firebase/firestore';




/**
 * @description
 * Retrieve one Firestore document from a collection, according to
 * a previously defined query
 * @param {Query} query
 * @returns Firestore doc || null
 * @example
 * 
 * As it retrieves only one element, the query only operates through .where(),
 * without any orderBy, skip or limit operations
 */
const findOne = async function (query) {
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
  
  // Once every queryOperation is included in the array, this array of
  // queryOperations must be passed into the query function as if each of
  // the elements of the array was an argument of the function:
  const queryDocs = q(collectionRef, ...queryOperations);

  const docs = [];
  var querySnap = await getDocs(queryDocs);
  querySnap.forEach((doc) => docs.push(doc.data()));
  
  // It only returns the first coincidence:
  if (docs.length > 0) {
    return docs[0];
  } else {
    return null
  }
};




export default findOne;