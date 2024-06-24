import { 
  collection, getDocs, 
  query,
} from 'firebase/firestore';




/**
 * @description
 * Retrieve one Firestore document from a collection, according to
 * a previously defined query
 * @param {Query} q
 * @returns Firestore doc || null
 * @example
 */
const findOne = async function (q) {
  const db = this.db;
  const collectionName = this.collection;
  const collectionRef = collection(db, collectionName);

  if (!q) {
    throw new Error('Not enough params for [findOne]')
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
  
  // It only returns the first coincidence:
  if (docs.length > 0) {
    return docs[0];
  } else {
    return null
  }
};




export default findOne;