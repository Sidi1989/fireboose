import { 
  collection, 
  getDocs, query,
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

  if (!q) {
    throw new Error('Not enough params for [findMany]')
  }

  // Once every queryOperation is included in the array, this array of
  // queryOperations must be retrieved and passed into the query function 
  // as if each of its elements were an argument of the function:
  const queryOperations = q.getQueryOperations();
  const queryDocs = query(collectionRef, ...queryOperations);

  const docs = [];
  var querySnap = await getDocs(queryDocs);

  querySnap.forEach(function(docSnap) {
    docs.push(docSnap.data())
  });

  return docs;
};




export default findMany;